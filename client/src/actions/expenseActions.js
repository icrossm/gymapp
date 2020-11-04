import notify from "devextreme/ui/notify";
import moment from "moment";

export const updateExpense = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("customerExpenses");
    let date = moment(info.date).format("YYYY.MM.DD");
    let docRefCustomer = firebase.firestore().collection("customers");
    docRefCustomer = docRefCustomer.doc(info.customer);
    Object.assign(info, { ...info, date: date });
    try {
      if (!info.id) {
        await docRefCustomer.get().then((query) => {
          const thing = query;
          const data = query.data();
          let expensePaid = false;
          let prevTotal = data.totalExpense ? data.totalExpense : 0;
          let nextTotal =
            parseFloat(info.amount) * parseFloat(info.price) + prevTotal;
          if (nextTotal <= data.totalPaid) {
            expensePaid = true;
          }
          thing.ref.update({
            totalExpense: nextTotal,
            expensePaid: expensePaid,
          });
        });
        await docRef.add(info);
      } else {
        let prevTotalExpense = 0;
        await docRef
          .doc(info.id)
          .get()
          .then(async (query) => {
            const thingExp = query;
            const dataExp = query.data();
            const prevPriceExp = dataExp.price;
            const prevAmountExp = dataExp.amount;
            prevTotalExpense =
              parseFloat(prevPriceExp) * parseFloat(prevAmountExp);
            thingExp.ref.update({
              product: info.product,
              price: info.price,
              amount: info.amount,
            });
          });

        await docRefCustomer.get().then((query) => {
          const thing = query;
          const data = query.data();
          console.log("data", data);
          let expensePaid = false;
          let prevTotal = data.totalExpense ? data.totalExpense : 0;
          console.log("prevTotal", prevTotalExpense, prevTotal);
          let nextTotal =
            parseFloat(info.amount) * parseFloat(info.price) +
            prevTotal -
            prevTotalExpense;

          if (data.nextTotal <= data.expensePaid) {
            expensePaid = true;
          }
          thing.ref.update({
            totalExpense: nextTotal,
            expensePaid: expensePaid,
          });
        });
      }
      notify("Kaydedildi", "success", 6000);
    } catch (error) {
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};

export const getExpense = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let docRef = firebase.firestore().collection("customerExpenses");
    const startDate = moment(info.startDate).format("YYYY.MM.DD");
    const endDate = moment(info.endDate).format("YYYY.MM.DD");
    if (info.customer) {
      docRef = docRef.where("customer", "==", info.customer);
    }
    if (info.product) {
      docRef = docRef.where("product", "==", info.product);
    }
    if (info.startDate) {
      docRef = docRef.where("date", ">=", startDate);
    }
    if (info.endDate) {
      docRef = docRef.where("date", "<=", endDate);
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
