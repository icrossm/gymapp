import React from "react";
import "./customerDebit.scss";
import DebitDashboard from "./DebitDashboard";

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Üye Borç Görüntüleme</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <DebitDashboard />
      </div>
    </div>
  </React.Fragment>
);
