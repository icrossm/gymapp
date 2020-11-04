import React, { useState } from "react";

import { Button } from "devextreme-react/button";

import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { updateExpense, getExpense } from "../../actions/expenseActions";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import cuid from "cuid";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import FilterForm from "./FilterForm";

const ExpenseDashboard = ({
  products,
  customers,
  updateExpense,
  getExpense,
}) => {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    price: "",
    amount: "1",
  });
  const [expenseData, setExpenseData] = useState([]);
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
    if (data && !data.price) {
      let selected = products.filter((p) => p.id === data.product)[0];
      let price = 0;
      if (selected) {
        price = selected.price;
      }
      Object.assign(data, { ...data, price: price });
    }
    await updateExpense(data);
    hideInfo();
    setFormData({});
  };
  const handleSelected = (data) => {
    setFormData(data);
    setNewRecorOptions({
      popupVisible: true,
    });
  };
  const handleGetExpense = async (data) => {
    const expenses = await getExpense(data);
    setExpenseData(expenses);
  };
  if (!isLoaded(products) || !isLoaded(customers)) {
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
            <ExpenseForm
              handleUpdate={handleSaveData}
              formData={formData}
              setFormData={setFormData}
              customerOptions={customers}
              productOptions={products}
            />
          </ScrollView>
        </Popup>
        <FilterForm
          handleFilter={handleGetExpense}
          customerOptions={customers}
          productOptions={products}
        />
        <ExpenseTable
          key={cuid()}
          data={expenseData}
          productOptions={products}
          customerOptions={customers}
          handleSelect={handleSelected}
        />
      </div>
    </div>
  );
};

const actions = {
  updateExpense,
  getExpense,
};

const mapState = (state, ownProps) => {
  let products = [];
  if (
    state.firestore.ordered.products &&
    state.firestore.ordered.products.length > 0
  ) {
    products = state.firestore.ordered.products;
  }
  let customers = [];
  if (
    state.firestore.ordered.customers &&
    state.firestore.ordered.customers.length > 0
  ) {
    customers = state.firestore.ordered.customers;
  }

  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    products: products,
    customers: customers,
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
    {
      collection: "customers",
      storeAs: "customers",
    },
  ])
)(ExpenseDashboard);
