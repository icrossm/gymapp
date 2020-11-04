import React from "react";
import Query from "devextreme/data/query";

export default function Appointment(model) {
  const { appointmentData } = model.data;
  return (
    <div className="showtime-preview">
      <div> {appointmentData.name}</div>
    </div>
  );
}
