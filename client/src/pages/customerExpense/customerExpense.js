import React from "react";
import "./customerExpense.scss";
import ExpenseDashboard from "./ExpenseDashboard";

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Üye Harcamaları</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <ExpenseDashboard />
      </div>
    </div>
  </React.Fragment>
);
