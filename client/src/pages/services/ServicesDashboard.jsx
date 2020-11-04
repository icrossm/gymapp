import React, { useState } from "react";

import { Button } from "devextreme-react/button";

import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { updateService } from "../../actions/servicesActions";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import cuid from "cuid";
import ServicesForm from "./ServicesForm";
import ServicesTable from "./ServicesTable";

const ServicesDasboard = ({ services, updateService }) => {
  const [formData, setFormData] = useState({
    name: "",
    desciption: "",
  });
  const [newRecordOptions, setNewRecorOptions] = useState({
    popupVisible: false,
  });
  const hideInfo = () => {
    setNewRecorOptions({
      popupVisible: false,
    });

    setFormData({});
  };
  const handleNewRecord = () => {
    setFormData({});
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  const handleSaveData = async (data) => {
    console.log("data", data);
    console.log("data", formData);
    await updateService(data);
    hideInfo();
    setFormData({});
  };
  const handleSelected = (data) => {
    setFormData(data);
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  if (!isLoaded(services)) {
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
            <ServicesForm handleUpdate={handleSaveData} formData={formData} />
          </ScrollView>
        </Popup>
        <ServicesTable
          key={cuid()}
          data={services}
          handleSelect={handleSelected}
        />
      </div>
    </div>
  );
};

const actions = {
  updateService,
};

const mapState = (state, ownProps) => {
  let services = [];
  if (
    state.firestore.ordered.services &&
    state.firestore.ordered.services.length > 0
  ) {
    services = state.firestore.ordered.services;
  }

  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    services: services,
    auth: auth,
  };
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "services",
      storeAs: "services",
    },
  ])
)(ServicesDasboard);
