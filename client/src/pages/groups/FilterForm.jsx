import React, { useState } from "react";
import Form, { Item, ButtonItem, Label } from "devextreme-react/form";
import { productStatusOptions, groupStatusOptions } from "../../common/constants";

const FilterForm = ({
  handleFilter,
  customerOptions,
  trainerOptions,
  serviceOptions,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    trainer: "",
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
          <Item dataField="name" editorType="dxTextBox">
            <Label text="Grup Adı" />
          </Item>
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
          <Item
            dataField="service"
            editorType="dxSelectBox"
            editorOptions={{
              items: serviceOptions,
              searchEnabled: true,
              displayExpr: "name",
              valueExpr: "id",
            }}
          >
            <Label text="Hizmet" />
          </Item>
          <Item dataField="startDate" editorType="dxDateBox">
            <Label text="Tarih" />
          </Item>
          <Item dataField="endDate" editorType="dxDateBox">
            <Label text="Tarih" />
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
            >
              <Label text="Durum" />
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
