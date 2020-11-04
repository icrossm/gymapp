import React from "react";
import "./groups.scss";
import GroupDashboard from "./GroupDashboard"

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Üye Grupları</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <GroupDashboard />
      </div>
    </div>
  </React.Fragment>
);
