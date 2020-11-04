import React, { useState } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import {
  getAllAppointmentsAnalysis,
  getAnalysisByTrainers,getAnalysisByGroup
} from "../../actions/appointmentsActions";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import AllAppChart from "./AllAppChart";
import { Button } from "devextreme-react/button";
import LoadingComponent from "../../common/LoadingComponent";
import ByTrianersChart from "./ByTrianersChart";
import ByGroupsChart from "./ByGroupsChart";

const AnalysisDashboard = ({
  getAllAppointmentsAnalysis,getAnalysisByGroup,
  getAnalysisByTrainers,
  groups,
  trainers,
}) => {
  const [allApps, setAllApps] = useState([]);
  const [byTrainers, setByTrainers] = useState([]);
  const [byGroups, setByGroups] = useState([]);

  const handleGetAll = async () => {
    const data = await getAllAppointmentsAnalysis();
    setAllApps(data);
  };

  const handleGetByTrainers = async () => {
    const data = await getAnalysisByTrainers(trainers);
    setByTrainers(data);
  };
  const handleGetByGroups = async () => {
    const data = await getAnalysisByGroup(trainers);
    setByGroups(data);
  };
  if (!isLoaded(groups) || !isLoaded(trainers)) {
    return <LoadingComponent />;
  }

  const renderAll = () => {
    return (
      <div>
        <div className="margin-new-button">
          <Button
            width={120}
            text="Görüntüle"
            type="default"
            stylingMode="contained"
            onClick={handleGetAll}
          />
        </div>
        <AllAppChart data={allApps} />
      </div>
    );
  };


  const renderByTrainers = () => {
    return (
      <div>
        <div className="margin-new-button">
          <Button
            width={120}
            text="Görüntüle"
            type="default"
            stylingMode="contained"
            onClick={handleGetByTrainers}
          />
        </div>
        <ByTrianersChart data={byTrainers} trainers={trainers}/>
      </div>
    );
  };


  const renderByGroups = () => {
    return (
      <div>
        <div className="margin-new-button">
          <Button
            width={120}
            text="Görüntüle"
            type="default"
            stylingMode="contained"
            onClick={handleGetByGroups}
          />
        </div>
        <ByGroupsChart data={byGroups} groups={groups}/>
      </div>
    );
  };
  return (
    <div className="form-container">
      <TabPanel>
        <Item title="Tüm randevular" render={renderAll} />
        <Item
          title="Eğitmene Göre"
          render={renderByTrainers}
        />
        <Item title="Gruplara Göre" render={renderByGroups} />
      </TabPanel>
    </div>
  );
};

const actions = { getAllAppointmentsAnalysis, getAnalysisByTrainers,getAnalysisByGroup };

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
)(AnalysisDashboard);
