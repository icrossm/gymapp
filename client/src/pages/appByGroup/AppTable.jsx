import React from "react";

import DataGrid, {
  Column,
  FilterRow,
  Paging,
  HeaderFilter,
  SearchPanel,
  Lookup,
} from "devextreme-react/data-grid";
const AppTable = ({ data, handleSelect, groupOptions, trainerOptions }) => {
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
        <Column dataField="group" caption="Grup" width={125}>
          <Lookup dataSource={groupOptions} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="trainer" caption="Eğitmen" width={125}>
          <Lookup
            dataSource={trainerOptions}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="startDate" caption="Tarih" dataType="date" />
        <Column dataField="desciption" caption="Açıklama" />
      </DataGrid>
    </div>
  );
};

export default AppTable;
