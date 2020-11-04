import React, { useState } from "react";

import { Button } from "devextreme-react/button";

import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import CustomerForm from "./CustomerForm";
import { updateCustomer } from "../../actions/customerActions";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import CustomerTable from "./CustomerTable";
import cuid from "cuid";

const CustomerDashboard = ({ customers, updateCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    gender: "",
    date: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    purpose: "",
    blood: "",
    address: "",
    frequenctOfActivity: "",
    jobType: "",
    medical: "",
    history: "",
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
    await updateCustomer(data);
    hideInfo();
    setFormData({});
  };
  const handleSelected = (data) => {
    setFormData(data);
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  if (!isLoaded(customers)) {
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
            <CustomerForm handleUpdate={handleSaveData} formData={formData} />
          </ScrollView>
        </Popup>
        <CustomerTable
          key={cuid()}
          data={customers}
          handleSelect={handleSelected}
        />
      </div>
    </div>
  );
};

const actions = {
  updateCustomer,
};

const mapState = (state, ownProps) => {
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
    customers: customers,
    auth: auth,
  };
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "customers",
      storeAs: "customers",
    },
  ])
)(CustomerDashboard);
