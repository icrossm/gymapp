import React from "react";

import DataGrid, {
  Column,
  FilterRow,
  Paging,
  HeaderFilter,
  SearchPanel,
  Lookup,
} from "devextreme-react/data-grid";
import {
  trainerStatusOptions,
  productStatusOptions,
} from "../../common/constants";
const ExpenseTable = ({
  data,
  handleSelect,
  customerOptions,
  productOptions,
}) => {
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
        <Column dataField="id" caption="Referans" width={70} visible={false} />
        <Column dataField="customer" caption="Üye" width={125}>
          <Lookup
            dataSource={customerOptions}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>{" "}
        <Column dataField="product" caption="Ürün" width={125}>
          <Lookup
            dataSource={productOptions}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="price" caption="Fiyat" dataType="number" />
        <Column dataField="amount" caption="Miktar" dataType="number" />
        <Column dataField="date" caption="Tarih" dataType="date" />
      </DataGrid>
    </div>
  );
};

export default ExpenseTable;
