import React, { useState, useEffect } from "react";
import Form, {
  Item,
  ButtonItem,
  Label,
  GroupItem,
} from "devextreme-react/form";
import {
  genderOptions,
  frequenctOfActivityOptions,
  jobTypeOptions,
  purposeOptions,
  customerStatusOptions,
} from "../../common/constants";

const CustomerForm = ({ handleUpdate, formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData)
    handleUpdate(formData);
  };

  const validationRules = {
    name: [{ type: "required", message: "Ad Giriniz" }],
    birth: [{ type: "required", message: "Doğum Tarihi Giriniz" }],
    date: [{ type: "required", message: "Başlama Tarihi Giriniz" }],
    gender: [{ type: "required", message: "Cinsiyer Seçiniz" }],
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
          {" "}
          <GroupItem name="general" caption="Genel Bilgiler" colCount={2}>
            <Item
              dataField="name"
              editorType="dxTextBox"
              validationRules={validationRules.name}
              editorOptions={{ maxLength: 50 }}
            >
              <Label text="Cari Adı" />
            </Item>
            <Item
              dataField="gender"
              editorType="dxSelectBox"
              editorOptions={{
                items: genderOptions,
                searchEnabled: true,
                displayExpr: "text",
                valueExpr: "value",
              }}
              validationRules={validationRules.type}
            >
              <Label text="Cinsiyet" />
            </Item>
            <Item
            dataField="status"
            editorType="dxSelectBox"
            editorOptions={{
              items: customerStatusOptions,
              searchEnabled: true,
              displayExpr: "text",
              valueExpr: "value",
            }}
            validationRules={validationRules.status}
          >
            <Label text="Durum" />
          </Item>
            <Item
              dataField="birth"
              editorType="dxDateBox"
              validationRules={validationRules.birth}
            >
              <Label text="Doğum Tarihi" />
            </Item>
            <Item
              dataField="date"
              editorType="dxDateBox"
              validationRules={validationRules.date}
            >
              <Label text="Doğum Tarihi" />
            </Item>
          </GroupItem>
          <GroupItem name="contact" caption="İletişim Bilgileri" colCount={3}>
            <Item
              dataField="email"
              editorType="dxTextBox"
              editorOptions={{ maxLength: 50 }}
            >
              <Label text="İlgili Kişi" />
            </Item>
            <Item
              dataField="phone"
              editorType="dxNumberBox"
              editorOptions={{ maxLength: 10 }}
            >
              <Label text="Telefon" />
            </Item>
            <Item
              dataField="address"
              editorType="dxTextBox"
              editorOptions={{ maxLength: 100 }}
            >
              <Label text="Eposta" />
            </Item>
          </GroupItem>
          <GroupItem caption="Sağlık Bilgileri " name="health" colCount={2}>
            <Item
              dataField="blood"
              editorType="dxTextBox"
              editorOptions={{ maxLength: 10 }}
            >
              <Label text="Kan Grubu" />
            </Item>
            <Item
              dataField="medical"
              editorType="dxTextArea"
              editorOptions={{ maxLength: 200 }}
            >
              <Label text="Sağlık Problemleri" />
            </Item>
          </GroupItem>
          <GroupItem caption="Spor Bilgileri " name="health" colCount={2}>
            <Item dataField="weight" editorType="dxTextBox">
              <Label text="Kilo" />
            </Item>
            <Item dataField="height" editorType="dxTextBox">
              <Label text="Boy" />
            </Item>
            <Item
              dataField="frequenctOfActivity"
              editorType="dxSelectBox"
              editorOptions={{
                items: frequenctOfActivityOptions,
                searchEnabled: true,
                displayExpr: "text",
                valueExpr: "value",
              }}
            >
              <Label text="Aktivite Sıklığı" />
            </Item>
            <Item
              dataField="jobType"
              editorType="dxSelectBox"
              editorOptions={{
                items: jobTypeOptions,
                searchEnabled: true,
                displayExpr: "text",
                valueExpr: "value",
              }}
            >
              <Label text="İşyerinde Aktivite" />
            </Item>
            <Item
              dataField="purpose"
              editorType="dxSelectBox"
              editorOptions={{
                items: purposeOptions,
                searchEnabled: true,
                displayExpr: "text",
                valueExpr: "value",
              }}
            >
              <Label text="Spor Amacı" />
            </Item>
            <Item dataField="description" editorType="dxTextBox">
              <Label text="Açıklama" />
            </Item>
          </GroupItem>
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
export default CustomerForm;
