import React from "react";

import DataGrid, {
  Column,
  FilterRow,
  Paging,
  Lookup,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { Item, Label } from "devextreme-react/form";
import "devextreme-react/text-area";
import CustomerForm from "./CustomerForm";
import {
  genderOptions,
  purposeOptions,
  customerStatusOptions,
} from "../../common/constants";
const CustomerTable = ({ data, handleSelect }) => {
  const logEvent = async (eventName, e) => {
    if (eventName === "RowUpdated") {
      const { data } = e;
      console.log("data", data);
      //   handleUpdate(data);
    }
  };

  const onSelectionChanged = ({ selectedRowsData }) => {
    const data = selectedRowsData[0];
    handleSelect(data);
  };
  let dataGrid = null;
  return (
    <div>
      <DataGrid
        ref={(ref) => (dataGrid = ref)}
        dataSource={data}
        showBorders={true}
        showRowLines={true}
        showColumnLines={true}
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        allowColumnReordering={true}
        onRowUpdated={logEvent.bind(this, "RowUpdated")}
        onSelectionChanged={onSelectionChanged}
        selection={{ mode: "single" }}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <SearchPanel visible={true} width={240} placeholder="Ara..." />
        <Paging enabled={false} />
        <Column dataField="id" caption="Referanse" width={70} visible={false} />
        <Column dataField="name" caption="Ad" />
        <Column dataField="gender" caption="Cinsiyet" width={125}>
          <Lookup
            dataSource={genderOptions}
            valueExpr="value"
            displayExpr="text"
          />
        </Column>
        <Column dataField="status" caption="Durum" width={125}>
          <Lookup
            dataSource={customerStatusOptions}
            valueExpr="value"
            displayExpr="text"
          />
        </Column>
        <Column dataField="birth" dataType="date" caption="D.Tarihi" />
        <Column dataField="date" dataType="date" caption="K.Tarihi" />
        <Column dataField="weight" caption="Kilo" />
        <Column dataField="height" caption="Boy" />{" "}
        <Column dataField="purpose" caption="Amaç" width={125}>
          <Lookup
            dataSource={purposeOptions}
            valueExpr="value"
            displayExpr="text"
          />
        </Column>
        <Column dataField="phone" caption="Telefon" />
        <Column dataField="email" caption="Email" />
        <Column dataField="address" caption="Adres" />
        <Column dataField="blood" caption="Kan Grubu" />
      </DataGrid>
    </div>
  );
};

export default CustomerTable;
