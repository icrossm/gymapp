import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import notify from "devextreme/ui/notify";
import moment from "moment";

export const updateGroup = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("groups");
    const isDate =
      Object.prototype.toString.call(info.startDate) === "[object Date]";
    let startDate = info.startDate;
    if (isDate) {
      startDate = moment(info.startDate).format("YYYY/MM/DD");
    }
    Object.assign(info, { ...info, startDate: startDate });
    try {
      console.log("id", info.id);
      if (!info.id) {
        const x = await docRef.where("name", "==", info.name).get();
        if (x && x.docs && x.docs.length > 0) {
          dispatch(closeModal());
          return notify("Grup Mevcut Kaydedilemedi", "error", 6000);
        }
        await docRef.add(info);
      } else {
        await docRef.doc(info.id).set(info);
      }
      notify("Kaydedildi", "success", 6000);
    } catch (error) {
      console.log("error,", error);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const getGroups = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let docRef = firebase.firestore().collection("groups");
    const startDate = moment(info.startDate).format("YYYY.MM.DD");
    const endDate = moment(info.endDate).format("YYYY.MM.DD");
    let customer = [{ customer: info.customer }];
    if (info.customer) {
      docRef = docRef.where("members.customer", "array-contains-any", customer);
    }
    if (info.trainer) {
      docRef = docRef.where("trainer", "==", info.trainer);
    }
    if (info.name) {
      docRef = docRef.where("name", "==", info.name);
    }
    if (info.startDate) {
      docRef = docRef.where("date", ">=", startDate);
    }
    if (info.endDate) {
      docRef = docRef.where("date", "<=", endDate);
    }
    if (info.status) {
      docRef = docRef.where("status", "<=", info.status);
    }
    try {
      let expenses = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          Object.assign(row, { ...row, id: doc.id });
          expenses.push(row);
        });
      });
      return expenses;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const deleteGroup = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("groups").doc(info.id);
    try {
      await docRef.delete();
      notify("Silindi", "success", 6000);
    } catch (error) {
      notify("Bir sıkıntı oluştu", "error", 6000);
    }
  };
};
