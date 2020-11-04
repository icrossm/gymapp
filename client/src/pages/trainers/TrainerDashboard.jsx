import React, { useState } from "react";

import { Button } from "devextreme-react/button";

import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { updateTrainer } from "../../actions/trainersActions";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import cuid from "cuid";
import TrainerForm from "./TrainerForm";
import TrainersTable from "./TainersTable";

const TrainerDashboard = ({ trainers, updateTrainer }) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    // startTime: "",
    // endTime: "",
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
    await updateTrainer(data);
    hideInfo();
    setFormData({});
  };
  const handleSelected = (data) => {
    setFormData(data);
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  if (!isLoaded(trainers)) {
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
            <TrainerForm handleUpdate={handleSaveData} formData={formData} />
          </ScrollView>
        </Popup>
        <TrainersTable
          key={cuid()}
          data={trainers}
          handleSelect={handleSelected}
        />
      </div>
    </div>
  );
};

const actions = {
  updateTrainer,
};

const mapState = (state, ownProps) => {
  let trainers = [];
  if (
    state.firestore.ordered.trainers &&
    state.firestore.ordered.trainers.length > 0
  ) {
    trainers = state.firestore.ordered.trainers;
  }
  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    trainers: trainers,
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
  ])
)(TrainerDashboard);
