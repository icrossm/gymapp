import React, { useState, useEffect } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";
import { productStatusOptions } from "../../common/constants";

const PaymentForm = ({
  handleUpdate,
  formData,
  customerOptions,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const validationRules = {
    customer: [{ type: "required", message: "Üye Seçiniz" }],
    price: [{ type: "required", message: "Fiyat  Giriniz" }],
    date: [{ type: "required", message: "Tarih  Girini<" }],
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
            dataField="customer"
            editorType="dxSelectBox"
            editorOptions={{
              items: customerOptions,
              searchEnabled: true,
              displayExpr: "name",
              valueExpr: "id",
            }}
            validationRules={validationRules.customer}
          >
            <Label text="Üye" />
          </Item>
          <Item
            dataField="price"
            editorType="dxNumberBox"
            editorOptions={{ maxLength: 10 }}
            validationRules={validationRules.price}
          >
            <Label text="Fiyat" />
          </Item>
          <Item
            dataField="date"
            editorType="dxDateBox"
            validationRules={validationRules.date}
          >
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
  text: "Kaydet",
  type: "default",
  useSubmitBehavior: true,
};
export default PaymentForm;
