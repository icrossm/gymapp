import React from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";
import { trainerStatusOptions } from "../../common/constants";

const TrainerForm = ({ handleUpdate, formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const validationRules = {
    name: [{ type: "required", message: "Eğitmen Adını Giriniz" }],
    color: [{ type: "required", message: "Renk Seçiniz" }],
    status: [{ type: "required", message: "Durum Seçiniz" }],
    // startDate: [{ type: "required", message: "Başlama Tarihi Seçiniz" }],
    // startTime: [{ type: "required", message: "Başlama Saati" }],
    endTime: [{ type: "required", message: "Bitiş Saati" }],
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
          colCount={2}
        >
          <Item
            dataField="name"
            editorType="dxTextBox"
            editorOptions={{ maxLength: 10 }}
            validationRules={validationRules.name}
          >
            <Label text="Eğitmen" />
          </Item>
          <Item
            dataField="status"
            editorType="dxSelectBox"
            editorOptions={{
              items: trainerStatusOptions,
              searchEnabled: true,
              displayExpr: "text",
              valueExpr: "value",
            }}
            validationRules={validationRules.status}
          >
            <Label text="Durum" />
          </Item>
          <Item dataField="startDate" editorType="dxDateBox">
            <Label text="İşe Başlama Tarihi" />
          </Item>
          {/* <Item
            dataField="startTime"
            editorType="dxDateBox"
            editorOptions={{ type: "time" }}
          >
            <Label text="Çalışma Başlama Saati" />
          </Item>
          <Item
            dataField="endTime"
            editorType="dxDateBox"
            editorOptions={{ type: "time" }}
          >
            <Label text="Çalışma Bitiş Saati" />
          </Item> */}

          {/* <Item
            dataField="color"
            editorType="dxColorBox"
            validationRules={validationRules.color}
          >
            <Label text="Renk" />
          </Item> */}
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
export default TrainerForm;
