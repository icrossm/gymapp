import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import notify from "devextreme/ui/notify";
import moment from "moment";

export const updateCustomer = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("customers");
    const birth = moment(info.birth).format("YYYY.MM.DD");
    const date = moment(info.date).format("YYYY.MM.DD");
    Object.assign(info, { ...info, birth: birth, date: date });
    try {
      if (!info.id) {
        const x = await docRef.where("name", "==", info.name).get();
        if (x && x.docs && x.docs.length > 0) {
          dispatch(closeModal());
          return notify("Üye Mevcut Kaydedilemedi", "error", 6000);
        }
        await docRef.add(info);
      } else {
        await docRef.doc(info.id).set(info);
      }
      notify("Kaydedildi", "success", 6000);
    } catch (error) {
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
