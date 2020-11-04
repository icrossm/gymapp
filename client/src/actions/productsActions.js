import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import notify from "devextreme/ui/notify";

export const updateProduct = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("products");
    try {
      if (!info.id) {
        const x = await docRef.where("name", "==", info.name).get();
        if (x && x.docs && x.docs.length > 0) {
          dispatch(closeModal());
          return notify("Ürün Mevcut Kaydedilemedi", "error", 6000);
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
