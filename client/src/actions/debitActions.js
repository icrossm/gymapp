import notify from "devextreme/ui/notify";
import moment from "moment";

export const getDebits = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let docRef = firebase
      .firestore()
      .collection("customers")
      .where("expensePaid", "==", false);
    const startDate = moment(info.startDate).format("YYYY.MM.DD");
    const endDate = moment(info.endDate).format("YYYY.MM.DD");
    if (info.customer) {
      docRef = docRef.where("name", "==", info.customer);
    }
    try {
      let debits = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          let remainingPrice =
            parseFloat(row.totalExpense ? row.totalExpense : 0) -
            parseFloat(row.totalPaid ? row.totalPaid : 0);
          Object.assign(row, {
            ...row,
            id: doc.id,
            remainingPrice: remainingPrice,
          });
          debits.push(row);
        });
      });
      return debits;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
