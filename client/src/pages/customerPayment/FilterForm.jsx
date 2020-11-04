import React, { useState } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";

const FilterForm = ({ handleFilter, customerOptions }) => {
  const [formData, setFormData] = useState({
    customer: "",
    startDate: "",
    endDate: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Form formData={formData} id="form" labelLocation="left" colCount={2}>
          <Item
            dataField="customer"
            editorType="dxSelectBox"
            editorOptions={{
              items: customerOptions,
              searchEnabled: true,
              displayExpr: "name",
              valueExpr: "id",
            }}
          >
            <Label text="Üye" />
          </Item>
          <Item dataField="startDate" editorType="dxDateBox">
            <Label text="Tarih" />
          </Item>
          <Item dataField="endDate" editorType="dxDateBox">
            <Label text="Tarih" />
          </Item>
          <ButtonItem
            horizontalAlignment="left"
            buttonOptions={buttonOptions}
          />
        </Form>
      </form>
    </div>
  );
};

const buttonOptions = {
  text: "Getir",
  type: "default",
  useSubmitBehavior: true,
};
export default FilterForm;
