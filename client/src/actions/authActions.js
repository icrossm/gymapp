import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import { toastr } from "react-redux-toastr";

export const login = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      return {
        isOk: true,
        data: creds,
      };
    } catch (error) {
      return {
        isOk: false,
        message: "Authentication failed",
      };
    }
  };
};

export const updatePassword = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset("account"));
      toastr.success("Başarılı", "Şifreniz değiştirildi.");
    } catch (error) {
      throw new SubmissionError({
        _error: "Bir sıkıntı oluştu. Tekrar deneyiniz",
      });
    }
  };
};

export const forgatPassword = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      const auth = firebase.auth();
      var emailAddress = creds.email;

      await auth.sendPasswordResetEmail(emailAddress);
      dispatch(closeModal());
      toastr.success("Başarılı", "Şifre sıfırlama maili gönderilmiştir.");
    } catch (error) {
      throw new SubmissionError({
        _error: "Bir sıkıntı oluştu. Tekrar deneyiniz",
      });
    }
  };
};
