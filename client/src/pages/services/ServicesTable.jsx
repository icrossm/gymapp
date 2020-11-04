import React from "react";

import DataGrid, {
  Column,
  FilterRow,
  Paging,
  HeaderFilter,SearchPanel
} from "devextreme-react/data-grid";
const ServicesTable = ({ data, handleSelect }) => {
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
        <Column dataField="name" caption="Hizmet" />
        <Column dataField="desciprtion" caption="Açıklama" />
      </DataGrid>
    </div>
  );
};

export default ServicesTable;
