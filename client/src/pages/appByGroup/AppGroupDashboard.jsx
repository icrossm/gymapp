import React, { useState } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import cuid from "cuid";
import FilterForm from "./FilterForm";
import { getAppointmentsByGroup } from "../../actions/appointmentsActions";
import AppTable from "./AppTable";
import notify from "devextreme/ui/notify";

const AppGroupDashboard = ({ groups, trainers, getAppointmentsByGroup }) => {
  const [appDAta, setAppData] = useState([]);

  const handleGetData = async (data) => {
    if (!data.group) {
      return notify("Grup seçiniz", "error", 6000);
    }
    const apps = await getAppointmentsByGroup(data);
    setAppData(apps);
  };
  if (!isLoaded(groups) || !isLoaded(trainers)) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <FilterForm
        handleFilter={handleGetData}
        trainerOptions={trainers}
        groupOptions={groups}
      />
      <AppTable
        key={cuid()}
        data={appDAta}
        trainerOptions={trainers}
        groupOptions={groups}
      />
    </div>
  );
};

const actions = { getAppointmentsByGroup };

const mapState = (state, ownProps) => {
  let groups = [];
  if (
    state.firestore.ordered.groups &&
    state.firestore.ordered.groups.length > 0
  ) {
    groups = state.firestore.ordered.groups;
  }
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
    groups: groups,
    trainers: trainers,
    auth: auth,
  };
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "groups",
      storeAs: "groups",
      where: ["status", "==", 1],
    },
    {
      collection: "trainers",
      storeAs: "trainers",
    },
  ])
)(AppGroupDashboard);
