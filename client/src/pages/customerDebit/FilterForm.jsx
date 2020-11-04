import React, { useState } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";

const FilterForm = ({ handleFilter, customerOptions }) => {
  const [formData, setFormData] = useState({
    customer: "",
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
              valueExpr: "name",
            }}
          >
            <Label text="Üye" />
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
