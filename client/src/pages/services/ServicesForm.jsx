import React, { useState, useEffect } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";

const ServicesForm = ({ handleUpdate, formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const validationRules = {
    name: [{ type: "required", message: "Hizmet Adını Giriniz" }],
  };

  const validateForm = (e) => {
    e.component.validate();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Form
          formData={formData}
          onContentReady={validateForm}
          id="form"
          labelLocation="left"
        >
          <Item
            dataField="name"
            editorType="dxTextBox"
            editorOptions={{ maxLength: 10 }}
            validationRules={validationRules.name}
          >
            <Label text="Hizmet" />
          </Item>
          <Item
            dataField="description"
            editorOptions={{ maxLength: 100 }}
            editorType="dxTextBox"
          >
            <Label text="Açıklama" />
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
  text: "Kaydet",
  type: "default",
  useSubmitBehavior: true,
};
export default ServicesForm;
