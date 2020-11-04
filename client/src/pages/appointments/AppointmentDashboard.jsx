import React, { useState, useEffect } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import Scheduler, { Resource } from "devextreme-react/scheduler";
import {
  getGroups,
  addAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  addAnalysisForAppointment,
  deleteAppointmentAnalysis,
} from "../../actions/appointmentsActions";
import Appointment from "./Appointment.js";
import moment from "moment";
import cuid from "cuid";

const currentDate = new Date();
const views = [
  {
    type: "day",
    intervalCount: 7,
    cellDuration: 60,
  },
];
const draggingGroupName = "appointmentsGroup";

const AppointmentDashboard = ({
  trainers,
  groups,
  addAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  addAnalysisForAppointment,
  deleteAppointmentAnalysis,
}) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date() + 7,
  });
  const [calendarValues, setCalendarValues] = useState({
    start: 8,
    end: 23,
  });
  const [appointmentData, setAppointmentData] = useState([]);

  const handleGetData = async () => {
    const appointments = await getAllAppointments(formData);
    console.log("appointments", appointments);
    setAppointmentData(appointments);
  };

  if (!isLoaded(trainers) || !isLoaded(groups)) {
    return <LoadingComponent />;
  }
  // const hanldeOnOptionChanged = async (e) => {
  //   const x = e.component.getStartViewDate();
  //   const y = e.component.getEndViewDate();
  //   const data = {
  //     trainer: formData.trainer,
  //     startDate: x,
  //     endDate: y,
  //   };
  //   if (
  //     moment(formData.startDate).format("YYYY/MM/DD") !=
  //     moment(x).format("YYYY/MM/DD")
  //   ) {
  //     console.log("startDate", new Date(formData.startDate), x);
  //     const appointments = await getAllAppointments(data);
  //     setAppointmentData(appointments);
  //     setFormData({
  //       ...formData,
  //       startDate: x,
  //       endDate: y,
  //     });
  //   }
  // };
  const handleAddAppointment = async (e) => {
    const { appointmentData } = e;

    Object.assign(appointmentData, {
      ...appointmentData,
    });
    await addAppointment(appointmentData);
    await addAnalysisForAppointment(appointmentData);
  };
  const handleUpdateAppointment = async (e) => {
    const { appointmentData } = e;
    Object.assign(appointmentData, {
      ...appointmentData,
    });
    await updateAppointment(appointmentData);
  };

  const handleDeleteAppointment = async (e) => {
    const { appointmentData } = e;
    await deleteAppointment(appointmentData);
    await deleteAppointmentAnalysis(appointmentData);
  };

  const onAppointmentFormOpening = (data) => {
    let startDate = data.appointmentData.startDate;
    let form = data.form;

    form.option("items", [
      {
        label: {
          text: "Eğitmen",
        },
        editorType: "dxSelectBox",
        dataField: "trainer",
        editorOptions: {
          items: trainers,
          displayExpr: "name",
          valueExpr: "id",
          onValueChanged: function (args) {
            let trainerId = args.value;
            let trainer = trainers.filter((g) => g.id === trainerId)[0];
            if (trainer && trainer.name) {
              form
                .getEditor("tname")
                .option("value", trainer.name ? trainer.name : "");
            }
          },
        },
      },
      {
        label: {
          text: "Grup",
        },
        editorType: "dxSelectBox",
        dataField: "group",
        editorOptions: {
          items: groups,
          displayExpr: "name",
          valueExpr: "id",
          onValueChanged: function (args) {
            let groupId = args.value;
            let group = groups.filter((g) => g.id === groupId)[0];
            if (group && group.name) {
              form
                .getEditor("name")
                .option("value", group.name ? group.name : "");
            }
          },
        },
      },
      {
        dataField: "startDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
        },
      },
      {
        name: "endDate",
        dataField: "endDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
        },
      },
      {
        label: {
          text: "Grup Adı",
        },
        editorType: "dxTextBox",
        dataField: "name",
        editorOptions: {
          readOnly: true,
        },
      },
      {
        label: {
          text: "Eğitmen Adı",
        },
        editorType: "dxTextBox",
        dataField: "tname",
        editorOptions: {
          readOnly: true,
        },
      },
      {
        label: {
          text: "Açıklama",
        },
        name: "description",
        editorType: "dxTextBox",
      },
    ]);
  };

  return (
    <div>
      <div className="margin-new-button">
        <Button
          width={120}
          text="Getir"
          type="default"
          stylingMode="contained"
          onClick={handleGetData}
        />
      </div>
      <div>
        {appointmentData && appointmentData.length > 0 && (
          <Scheduler
            key={cuid()}
            views={views}
            dataSource={appointmentData}
            defaultCurrentView="day"
            defaultCurrentDate={formData.startDate}
            startDayHour={calendarValues.start}
            endDayHour={calendarValues.end}
            cellDuration={30}
            height={800}
            editing={true}
            appointmentComponent={Appointment}
            onAppointmentAdded={handleAddAppointment}
            onAppointmentUpdated={handleUpdateAppointment}
            onAppointmentDeleted={handleDeleteAppointment}
            onAppointmentFormOpening={onAppointmentFormOpening}
            showAllDayPanel={false}
            // onOptionChanged={hanldeOnOptionChanged}
          >
            <Resource
              dataSource={appointmentData}
              fieldExpr="appointments"
              useColorAsDefault={true}
            />
          </Scheduler>
        )}
      </div>
    </div>
  );
};

const actions = {
  getGroups,
  addAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  addAnalysisForAppointment,
  deleteAppointmentAnalysis,
};

const mapState = (state, ownProps) => {
  let trainers = [];
  if (
    state.firestore.ordered.trainers &&
    state.firestore.ordered.trainers.length > 0
  ) {
    trainers = state.firestore.ordered.trainers;
  }
  let groups = [];
  if (
    state.firestore.ordered.groups &&
    state.firestore.ordered.groups.length > 0
  ) {
    groups = state.firestore.ordered.groups;
  }
  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    trainers: trainers,
    groups: groups,
    auth: auth,
  };
};
export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => [
    {
      collection: "trainers",
      storeAs: "trainers",
    },
    {
      collection: "groups",
      storeAs: "groups",
      where: ["status", "==", 1],
    },
  ])
)(AppointmentDashboard);
