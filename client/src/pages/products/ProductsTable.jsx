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
const ProductsTable = ({ data, handleSelect }) => {
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
        <Column dataField="name" caption="Ürün" />
        <Column dataField="price" caption="Fiyat" dataType="number" />
        <Column dataField="status" caption="Durum" width={125}>
          <Lookup
            dataSource={productStatusOptions}
            valueExpr="value"
            displayExpr="text"
          />
        </Column>
        <Column dataField="desciprtion" caption="Açıklama" />
      </DataGrid>
    </div>
  );
};

export default ProductsTable;
