import React, { useState, useEffect } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";
import { productStatusOptions } from "../../common/constants";

const ProductForm = ({ handleUpdate, formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const validationRules = {
    name: [{ type: "required", message: "Hizmet Adını Giriniz" }],
    price: [{ type: "required", message: "Fiyat  Giriniz" }],
    status: [{ type: "required", message: "Durum  Seçiniz" }],
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
          colCount={3}
        >
          <Item
            dataField="name"
            editorType="dxTextBox"
            editorOptions={{ maxLength: 10 }}
            validationRules={validationRules.name}
          >
            <Label text="Ürün" />
          </Item>
          <Item
            dataField="price"
            editorType="dxTextBox"
            editorOptions={{ maxLength: 10 }}
            validationRules={validationRules.price}
          >
            <Label text="Fiyat" />
          </Item>
          <Item
            dataField="status"
            editorType="dxSelectBox"
            editorOptions={{
              items: productStatusOptions,
              searchEnabled: true,
              displayExpr: "text",
              valueExpr: "value",
            }}
            validationRules={validationRules.status}
          >
            <Label text="Durum" />
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
export default ProductForm;
