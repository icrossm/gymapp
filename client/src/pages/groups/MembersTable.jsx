import React from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Lookup,
} from "devextreme-react/data-grid";

const MembersTable = ({ data, customerOptions }) => {
  let dataGrid = null;
  if (!data) {
    dataGrid = {
      name: "",
    };
  }
  return (
    <div>
      <DataGrid
        ref={(ref) => (dataGrid = ref)}
        dataSource={data}
        showBorders={true}
        showRowLines={true}
        showColumnLines={true}
        width={800}
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        allowColumnReordering={true}
      >
        <Paging enabled={false} />
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <Column dataField="customer" caption="Üye" width={125}>
          <Lookup
            dataSource={customerOptions}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
      </DataGrid>
    </div>
  );
};

MembersTable.propTypes = {};

export default MembersTable;
