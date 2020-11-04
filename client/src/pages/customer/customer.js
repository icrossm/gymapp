import React from "react";
import "./customer.scss";
import CustomerDashboard from "./CustomerDashboard";

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Üyeler</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <CustomerDashboard />
      </div>
    </div>
  </React.Fragment>
);
