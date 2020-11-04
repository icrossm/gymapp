import React, { useState } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";

const FilterForm = ({ handleFilter, trainerOptions,formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Form formData={formData} id="form" labelLocation="left" colCount={1}>
          <Item
            dataField="trainer"
            editorType="dxSelectBox"
            editorOptions={{
              items: trainerOptions,
              searchEnabled: true,
              displayExpr: "name",
              valueExpr: "id",
            }}
          >
            <Label text="Eğitmen" />
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
