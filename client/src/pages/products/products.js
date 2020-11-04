import React from "react";
import "./products.scss";
import ProductsDashboard from "./ProductsDashboard";

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Ürünler</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <ProductsDashboard />
      </div>
    </div>
  </React.Fragment>
);
