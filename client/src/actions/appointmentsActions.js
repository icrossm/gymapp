import notify from "devextreme/ui/notify";
import moment from "moment";
import "moment/locale/tr";

const year = moment().format("YYYY");
export const getGroups = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let docRef = firebase
      .firestore()
      .collection("groups")
      .where("status", "==", 1)
      .where("trainer", "==", info.trainer);

    let docRefAppointments = firebase
      .firestore()
      .collection("appointments")
      .where("trainer", "==", info.trainer);

    try {
      let groups = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          groups.push(row);
        });
      });
      return groups;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const getAppointments = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    var startTimeStamp = firebase.firestore.Timestamp.fromDate(
      new Date(info.startDate)
    );
    var endTimeStamp = firebase.firestore.Timestamp.fromDate(
      new Date(info.endDate)
    );
    let docRef = firebase
      .firestore()
      .collection("appointments")
      .doc(year)
      .collection("appointments")
      // .where("startDate", ">", startTimeStamp)
      // .where("startDate", "<", endTimeStamp)
      .where("trainer", "==", info.trainer);

    try {
      let data = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          let startDate = row.startDate.toDate();
          let endDate = row.endDate.toDate();
          Object.assign(row, {
            ...row,
            id: doc.id,
            startDate: startDate,
            endDate: endDate,
          });
          data.push(row);
        });
      });
      return data;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
export const getAllAppointments = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    var startTimeStamp = firebase.firestore.Timestamp.fromDate(
      new Date(info.startDate)
    );
    var endTimeStamp = firebase.firestore.Timestamp.fromDate(
      new Date(info.endDate)
    );
    let docRef = firebase
      .firestore()
      .collection("appointments")
      .doc(year)
      .collection("appointments");
    try {
      let data = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          let startDate = row.startDate.toDate();
          let endDate = row.endDate.toDate();
          Object.assign(row, {
            ...row,
            id: doc.id,
            startDate: startDate,
            endDate: endDate,
          });
          data.push(row);
        });
      });
      return data;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
export const getAppointmentsByGroup = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    var startTimeStamp = firebase.firestore.Timestamp.fromDate(
      new Date(info.startDate)
    );
    var endTimeStamp = firebase.firestore.Timestamp.fromDate(
      new Date(info.endDate)
    );
    let docRef = firebase
      .firestore()
      .collection("appointments")
      .doc(year)
      .collection("appointments")
      //  .where("startDate", ">", startTimeStamp)
      //  .where("startDate", "<", endTimeStamp)
      .where("group", "==", info.group);

    try {
      let data = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          let startDate = row.startDate.toDate();
          let endDate = row.endDate.toDate();
          Object.assign(row, {
            ...row,
            id: doc.id,
            startDate: startDate,
            endDate: endDate,
          });
          data.push(row);
        });
      });
      return data;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
export const addAppointment = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("appointments")
      .doc(year)
      .collection("appointments");
    try {
      await docRef.add(info);
      notify("Kaydedildi", "success", 6000);
    } catch (error) {
      console.log("err0r", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const addAnalysisForAppointment = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc("all");
    const docRefTrainer = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc(info.trainer);
    const docRefGroup = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc(info.group);
    try {
      const month = moment(info.moment).month();
      console.log("month", month);
      await docRef.get().then((query) => {
        if (query.exists) {
          const thing = query;
          const data = thing.data();
          let prevVal = data[month];
          let nextVal = parseInt(prevVal ? prevVal : 0) + 1;
          thing.ref.update({ [month]: nextVal });
        } else {
          docRef.set({ [month]: 1 });
        }
      });
      await docRefTrainer.get().then((query) => {
        if (query.exists) {
          const thing = query;
          const data = thing.data();
          let prevVal = data[month];
          let nextVal = parseInt(prevVal ? prevVal : 0) + 1;
          thing.ref.update({ [month]: nextVal });
        } else {
          docRefTrainer.set({ [month]: 1 });
        }
      });
      await docRefGroup.get().then((query) => {
        if (query.exists) {
          const thing = query;
          const data = thing.data();
          let prevVal = data[month];
          let nextVal = parseInt(prevVal ? prevVal : 0) + 1;
          thing.ref.update({ [month]: nextVal });
        } else {
          docRefGroup.set({ [month]: 1 });
        }
      });
    } catch (error) {
      console.log("err0r", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const updateAppointment = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("appointments")
      .doc(year)
      .collection("appointments");
    try {
      await docRef.doc(info.id).set(info);
      notify("Kaydedildi", "success", 6000);
    } catch (error) {
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const deleteAppointment = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("appointments")
      .doc(year)
      .collection("appointments")
      .doc(info.id);
    try {
      await docRef.delete();
      notify("Silindi", "success", 6000);
    } catch (error) {
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const deleteAppointmentAnalysis = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc("all");
    const docRefTrainer = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc(info.trainer);
    const docRefGroup = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc(info.group);
    try {
      const month = moment(info.moment).month();
      console.log("month", month);
      await docRef.get().then((query) => {
        console.log("Buraua geldik mi ? ", query);
        if (query.exists) {
          const thing = query;
          const data = thing.data();
          let prevVal = data[month];
          let nextVal = parseInt(prevVal ? prevVal : 0) - 1;
          thing.ref.update({ [month]: nextVal });
        } else {
          docRef.set({ [month]: 0 });
        }
      });
      await docRefTrainer.get().then((query) => {
        if (query.exists) {
          const thing = query;
          const data = thing.data();
          let prevVal = data[month];
          let nextVal = parseInt(prevVal ? prevVal : 0) - 1;
          thing.ref.update({ [month]: nextVal });
        } else {
          docRefTrainer.set({ [month]: 0 });
        }
      });
      await docRefGroup.get().then((query) => {
        if (query.exists) {
          const thing = query;
          const data = thing.data();
          let prevVal = data[month];
          let nextVal = parseInt(prevVal ? prevVal : 0) - 1;
          thing.ref.update({ [month]: nextVal });
        } else {
          docRefGroup.set({ [month]: 0 });
        }
      });
    } catch (error) {
      console.log("err0r", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const getAllAppointmentsAnalysis = () => {
  const months = moment.months();
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments")
      .doc("all");
    try {
      const dbData = await docRef.get();
      let analysis = [];
      if (dbData) {
        let appData = dbData.data();
        if (appData) {
          months.map((m) => {
            let mno = moment().month(m).format("MM");
            let row = {
              month: mno,
              count: appData[parseInt(mno)],
            };
            analysis.push(row);
          });
        }
      }
      console.log("analys", analysis);
      return analysis;
    } catch (error) {
      console.log("err0r", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const getAnalysisByTrainers = (trainers) => {
  const months = moment.months();
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments");
    try {
      let groupData = [];
      let analysis = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let row = {};
          row = doc.data();
          Object.assign(row, {...row, id: doc.id})
          groupData.push(row);
        });
      });

      if (groupData) {
        months.map((m) => {
          let mno = moment().month(m).format("MM");
          let row = {
            month: mno,
          };
          groupData.map((t) => {
            Object.assign(row, { ...row, [t.id]: t[parseInt(mno)] });
          });
          analysis.push(row);
        });
      }
      return analysis;
    } catch (error) {
      console.log("err0r", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const getAnalysisByGroup = (trainers) => {
  const months = moment.months();
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase
      .firestore()
      .collection("analysis")
      .doc(year)
      .collection("appointments");
    try {
      let groupData = [];
      let analysis = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let row = {};
          row = doc.data();
          Object.assign(row, {...row, id: doc.id})
          groupData.push(row);
        });
      });

      if (groupData) {
        months.map((m) => {
          let mno = moment().month(m).format("MM");
          let row = {
            month: mno,
          };
          groupData.map((t) => {
            Object.assign(row, { ...row, [t.id]: t[parseInt(mno)] });
          });
          analysis.push(row);
        });
      }
      return analysis;
    } catch (error) {
      console.log("err0r", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
