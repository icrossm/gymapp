import { closeModal } from "../modals/modalActions";
import notify from "devextreme/ui/notify";
import moment from "moment";

export const updateTrainer = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("trainers");
    const startDate = moment(info.startDate).format("YYYY.MM.DD");
    // let startTime = moment(info.startTime).format("hh:mm");
    // let endTime = moment(info.endTime).format("hh:mm");
    // if (info.startTime.length <= 6) {
    //   startTime = info.startTime;
    // }
    // if (info.endTime.length <= 6) {
    //   endTime = info.endTime;
    // }
    // console.log("start", info.startTime, info.endTime);
    // Object.assign(info, {
    //   ...info,
    //   startDate: startDate,
    //   startTime: startTime,
    //   endTime: endTime,
    // });
    try {
      if (!info.id) {
        const x = await docRef.where("name", "==", info.name).get();
        if (x && x.docs && x.docs.length > 0) {
          dispatch(closeModal());
          return notify("Eğitmen Mevcut Kaydedilemedi", "error", 6000);
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
