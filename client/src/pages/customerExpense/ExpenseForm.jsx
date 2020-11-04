import React, { useState, useEffect } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";
import { productStatusOptions } from "../../common/constants";

const ExpenseForm = ({
  handleUpdate,
  formData,
  customerOptions,
  productOptions,
  setFormData,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const validationRules = {
    customer: [{ type: "required", message: "Üye Seçiniz" }],
    price: [{ type: "required", message: "Fiyat  Giriniz" }],
    product: [{ type: "required", message: "Ürün  Seçiniz" }],
    amount: [{ type: "required", message: "Miktar  Girini<" }],
    date: [{ type: "required", message: "Tarih  Girini<" }],
  };

  const validateForm = (e) => {
    e.component.validate();
  };
  const formDataChange = (e) => {
    const { dataField, value } = e;
    if (dataField === "product") {
      let price = 0;
      let selected = productOptions.filter((t) => {
        return t.id === value;
      })[0];
      if (selected) {
        price = selected.price;
        setFormData({
          ...formData,
          price: price,
        });
      }
    }
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
          onFieldDataChanged={formDataChange.bind(this)}
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
            dataField="product"
            editorType="dxSelectBox"
            editorOptions={{
              items: productOptions,
              searchEnabled: true,
              displayExpr: "name",
              valueExpr: "id",
            }}
            validationRules={validationRules.product}
          >
            <Label text="Ürün" />
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
            dataField="amount"
            editorType="dxNumberBox"
            editorOptions={{ maxLength: 10 }}
            validationRules={validationRules.amount}
          >
            <Label text="Miktar" />
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
export default ExpenseForm;
