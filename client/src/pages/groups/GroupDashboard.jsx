import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import GroupForm from "./GroupForm";
import { Button } from "devextreme-react/button";
import { updateGroup, getGroups } from "../../actions/groupActions";

import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import notify from "devextreme/ui/notify";
import FilterForm from "./FilterForm";
import GroupTable from "./GroupTable";
import cuid from "cuid";

const GroupDashboard = ({
  services,
  customers,
  trainers,
  updateGroup,
  getGroups,
}) => {
  const [formData, setFormData] = useState({
    trainer: "",
    service: "",
    startDate: "",
    perWeekDay: "",
    price: "",
    status: 1,
  });
  const [newRecordOptions, setNewRecorOptions] = useState({
    popupVisible: false,
  });
  const [membersTable, setMembersTable] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const handleNewRecord = () => {
    setFormData({});
    setNewRecorOptions({ popupVisible: true });
  };
  const handleGetData = async (data) => {
    const groups = await getGroups(data);
    setGroupsData(groups);
  };
  const hideInfo = () => {
    setNewRecorOptions({
      popupVisible: false,
    });

    setFormData({});
  };
  const handleSaveData = async (data) => {
    if (membersTable.length === 0) {
      notify("Grup için en az bir üye giriniz");
    }
    let members = [];
    membersTable.map((member) => {
      let row = { customer: member.customer };
      members.push(row);
    });
    console.log("data.id", data.id);
    let row = {
      name: data.name,
      members: members,
      trainer: data.trainer,
      service: data.service,
      startDate: data.startDate,
      perWeekDay: data.perWeekDay,
      price: data.price,
    };

    if (data.id) {
      Object.assign(row, { ...row, id: data.id });
    }

    await updateGroup(row);

    setNewRecorOptions({
      popupVisible: false,
    });
    setFormData({});
    setMembersTable([]);
  };
  const handleSelected = (data) => {
    console.log("data", data);
    const members = data.members ? data.members : [];
    setFormData(data);
    setMembersTable(members);
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  if (!isLoaded(services) || !isLoaded(customers) || !isLoaded(trainers)) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className="margin-new-button">
        <Button
          width={120}
          text="Yeni kayıt"
          type="default"
          stylingMode="contained"
          onClick={handleNewRecord}
        />
        <Popup
          visible={newRecordOptions.popupVisible}
          onHiding={hideInfo}
          dragEnabled={true}
          closeOnOutsideClick={true}
          showTitle={false}
          title="Yeni Kayıt"
        >
          <ScrollView width="100%" height="100%">
            <GroupForm
              handleUpdate={handleSaveData}
              formData={formData}
              setFormData={setFormData}
              customerOptions={customers}
              serviceOptions={services}
              trainerOptions={trainers}
              data={membersTable}
            />
          </ScrollView>
        </Popup>
        <FilterForm
          handleFilter={handleGetData}
          customerOptions={customers}
          trainerOptions={trainers}
          serviceOptions={services}
        />
        <GroupTable
          key={cuid()}
          data={groupsData}
          serviceOptions={services}
          customerOptions={customers}
          trainerOptions={trainers}
          handleSelect={handleSelected}
        />
      </div>
    </div>
  );
};

const actions = { updateGroup, getGroups };

const mapState = (state, ownProps) => {
  let trainers = [];
  if (
    state.firestore.ordered.trainers &&
    state.firestore.ordered.trainers.length > 0
  ) {
    trainers = state.firestore.ordered.trainers;
  }
  let services = [];
  if (
    state.firestore.ordered.services &&
    state.firestore.ordered.services.length > 0
  ) {
    services = state.firestore.ordered.services;
  }
  let customers = [];
  if (
    state.firestore.ordered.customers &&
    state.firestore.ordered.customers.length > 0
  ) {
    customers = state.firestore.ordered.customers;
  }

  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    trainers: trainers,
    customers: customers,
    services: services,
    auth: auth,
  };
};
export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "trainers",
      storeAs: "trainers",
    },
    {
      collection: "services",
      storeAs: "services",
    },
    {
      collection: "customers",
      storeAs: "customers",
    },
  ])
)(GroupDashboard);
