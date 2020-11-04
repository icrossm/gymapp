import React from "react";
import "./customerPayment.scss";
import PaymentDashboard from "./PaymentDashboard";

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Üye Ödemeleri</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <PaymentDashboard />
      </div>
    </div>
  </React.Fragment>
);
