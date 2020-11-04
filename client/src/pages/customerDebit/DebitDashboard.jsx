import React, { useState } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import cuid from "cuid";
import FilterForm from "./FilterForm";
import DebitTable from "./DebitTable";
import { getDebits } from "../../actions/debitActions";

const DebitDashboard = ({ customers, getDebits }) => {
  const [debitData, setDebitData] = useState([]);

  const handleSelected = (data) => {
    // setFormData(data);
  };
  const handleGetData = async (data) => {
    const debits = await getDebits(data);
    setDebitData(debits);
  };
  if (!isLoaded(customers)) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <FilterForm handleFilter={handleGetData} customerOptions={customers} />
      <DebitTable
        key={cuid()}
        data={debitData}
        customerOptions={customers}
        handleSelect={handleSelected}
      />
    </div>
  );
};

const actions = { getDebits };

const mapState = (state, ownProps) => {
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
    customers: customers,
    auth: auth,
  };
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "customers",
      storeAs: "customers",
    },
  ])
)(DebitDashboard);
