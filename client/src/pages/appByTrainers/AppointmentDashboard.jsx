import React, { useState } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import LoadingComponent from "../../common/LoadingComponent";
import FilterForm from "./FilterForm";
import notify from "devextreme/ui/notify";
import Scheduler, { Resource } from "devextreme-react/scheduler";
import {
  getGroups,
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  addAnalysisForAppointment,deleteAppointmentAnalysis
} from "../../actions/appointmentsActions";
import Appointment from "./Appointment.js";
import cuid from "cuid";
import moment from "moment";

const currentDate = new Date();
const views = [
  {
    type: "day",
    intervalCount: 7,
    maxAppointmentsPerCell: 1,
    cellDuration: 60,
  },
];
const draggingGroupName = "appointmentsGroup";

const AppointmentDashboard = ({
  trainers,
  getGroups,
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  addAnalysisForAppointment,deleteAppointmentAnalysis
}) => {
  const [formData, setFormData] = useState({
    trainer: "",
    startDate: new Date(),
    endDate: new Date() + 7,
  });
  const [groupData, setGroupData] = useState([]);
  const [calendarValues, setCalendarValues] = useState({
    start: 8,
    end: 23,
  });
  const [appointmentData, setAppointmentData] = useState([]);

  const handleGetData = async () => {
    const groups = await getGroups(formData);
    const appointments = await getAppointments(formData);
    const trainer = trainers.filter((t) => t.id === formData.trainer)[0];
    // const { startTime, endTime } = trainer;
    // let start = startTime ? parseInt(startTime.substring(0, 2)) : 9;
    // let end = endTime ? parseInt(endTime.substring(0, 2)) : 23;

    // setCalendarValues({
    //   start: start,
    //   end: end,
    // });
    setGroupData(groups);
    setAppointmentData(appointments);
  };

  if (!isLoaded(trainers)) {
    return <LoadingComponent />;
  }

  const hanldeOnOptionChanged = async (e) => {
    const x = e.component.getStartViewDate();
    const y = e.component.getEndViewDate();
    const data = {
      trainer: formData.trainer,
      startDate: x,
      endDate: y,
    };
    if (
      moment(formData.startDate).format("YYYY/MM/DD") !=
      moment(x).format("YYYY/MM/DD")
    ) {
      console.log("startDate", new Date(formData.startDate), x);
      const appointments = await getAppointments(data);
      setAppointmentData(appointments);
      setFormData({
        ...formData,
        startDate: x,
        endDate: y,
      });
    }
  };

  const handleAddAppointment = async (e) => {
    const { appointmentData } = e;

    Object.assign(appointmentData, {
      ...appointmentData,
      trainer: formData.trainer,
    });
    await addAppointment(appointmentData);
    await addAnalysisForAppointment(appointmentData);
  };
  const handleUpdateAppointment = async (e) => {
    console.log("eeeeeeee", e);
    const { appointmentData } = e;
    Object.assign(appointmentData, {
      ...appointmentData,
      trainer: formData.trainer,
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
          text: "Grup",
        },
        editorType: "dxSelectBox",
        dataField: "group",
        editorOptions: {
          items: groupData,
          displayExpr: "name",
          valueExpr: "id",
          onValueChanged: function (args) {
            let groupId = args.value;
            let group = groupData.filter((g) => g.id === groupId)[0];
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
          text: "Açıklama",
        },
        name: "description",
        editorType: "dxTextBox",
      },
    ]);
  };

  return (
    <div>
      <FilterForm
        formData={formData}
        handleFilter={handleGetData}
        trainerOptions={trainers}
      />
      {formData.trainer && (
        <div>
          <Scheduler
            views={views}
            dataSource={appointmentData}
            defaultCurrentView="day"
            //  defaultCurrentDate={formData.startDate}
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
            // onOptionChanged={hanldeOnOptionChanged}
          >
            <Resource
              dataSource={appointmentData}
              fieldExpr="appointments"
              useColorAsDefault={true}
            />
          </Scheduler>
        </div>
      )}
    </div>
  );
};

const actions = {
  getGroups,
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  addAnalysisForAppointment,deleteAppointmentAnalysis
};

const mapState = (state, ownProps) => {
  let trainers = [];
  if (
    state.firestore.ordered.trainers &&
    state.firestore.ordered.trainers.length > 0
  ) {
    trainers = state.firestore.ordered.trainers;
  }
  let auth = [];
  if (state.firebase.auth) {
    auth = state.firebase.auth;
  }
  return {
    trainers: trainers,
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
  ])
)(AppointmentDashboard);
