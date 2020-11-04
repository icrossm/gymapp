import React, { useState, useEffect } from "react";
import Form, {
  Item,
  ButtonItem,
  Label,
  GroupItem,
} from "devextreme-react/form";
import MembersTable from "./MembersTable";
import { groupStatusOptions } from "../../common/constants";

const GroupForm = ({
  handleUpdate,
  formData,
  customerOptions,
  trainerOptions,
  serviceOptions,
  data,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    handleUpdate(formData);
  };

  const validationRules = {
    name: [{ type: "required", message: "Grup Adı Giriniz" }],
    trainer: [{ type: "required", message: "Eğitmen Seçiniz" }],
    service: [{ type: "required", message: "Hizmet Seçiniz" }],
    price: [{ type: "required", message: "Fiyat  Giriniz" }],
    startDate: [{ type: "required", message: "Tarih  Giriniz" }],
    status: [{ type: "required", message: "Durum Seçiniz" }],
    perWeekDay: [{ type: "required", message: "Gün Sayısı  Giriniz" }],
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
          <GroupItem caption="Genel Bilgiler" name="general" colCount={3}>
            <Item
              dataField="name"
              editorType="dxTextBox"
              editorOptions={{ maxLength: 10 }}
              validationRules={validationRules.name}
            >
              <Label text="Grup Adı" />
            </Item>
            {/* <Item
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
          </Item> */}
            <Item
              dataField="trainer"
              editorType="dxSelectBox"
              editorOptions={{
                items: trainerOptions,
                searchEnabled: true,
                displayExpr: "name",
                valueExpr: "id",
              }}
              validationRules={validationRules.trainer}
            >
              <Label text="Eğitmen" />
            </Item>
            <Item
              dataField="service"
              editorType="dxSelectBox"
              editorOptions={{
                items: serviceOptions,
                searchEnabled: true,
                displayExpr: "name",
                valueExpr: "id",
              }}
              validationRules={validationRules.service}
            >
              <Label text="Hizmet" />
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
              dataField="perWeekDay"
              editorType="dxNumberBox"
              validationRules={validationRules.perWeekDay}
            >
              <Label text="Haftada Kaç Gün?" />
            </Item>
            <Item
              dataField="startDate"
              editorType="dxDateBox"
              validationRules={validationRules.startDate}
            >
              <Label text="Başlangıç Tarihi" />
            </Item>
            <Item
              dataField="status"
              editorType="dxSelectBox"
              editorOptions={{
                items: groupStatusOptions,
                searchEnabled: true,
                displayExpr: "text",
                valueExpr: "value",
              }}
              validationRules={validationRules.status}
            >
              <Label text="Durum" />
            </Item>
          </GroupItem>
          <GroupItem caption="Üyeler" name="members">
            <MembersTable data={data} customerOptions={customerOptions} />
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
export default GroupForm;
