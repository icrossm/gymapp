import React, { useState } from "react";

import { Button } from "devextreme-react/button";

import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { updateProduct } from "../../actions/productsActions";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import cuid from "cuid";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

const ProductsDashboard = ({ products, updateProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: 1,
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
    await updateProduct(data);
    hideInfo();
    setFormData({});
  };
  const handleSelected = (data) => {
    setFormData(data);
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  if (!isLoaded(products)) {
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
            <ProductForm handleUpdate={handleSaveData} formData={formData} />
          </ScrollView>
        </Popup>
        <ProductsTable
          key={cuid()}
          data={products}
          handleSelect={handleSelected}
        />
      </div>
    </div>
  );
};

const actions = {
  updateProduct,
};

const mapState = (state, ownProps) => {
  let products = [];
  if (
    state.firestore.ordered.products &&
    state.firestore.ordered.products.length > 0
  ) {
    products = state.firestore.ordered.products;
  }

  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    products: products,
    auth: auth,
  };
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "products",
      storeAs: "products",
    },
  ])
)(ProductsDashboard);
