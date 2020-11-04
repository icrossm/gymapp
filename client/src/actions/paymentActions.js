import notify from "devextreme/ui/notify";
import moment from "moment";

export const updatePayment = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const docRef = firebase.firestore().collection("customerPayment");
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
          let prevTotal = data.totalPaid ? data.totalPaid : 0;
          let nextTotal = parseFloat(info.price) + prevTotal;
          if (data.totalExpense >= nextTotal) {
            expensePaid = true;
          }
          thing.ref.update({
            totalPaid: nextTotal,
            expensePaid: expensePaid,
          });
        });
        await docRef.add(info);
      } else {
        let prevTotal = 0;
        await docRef
          .doc(info.id)
          .get()
          .then(async (query) => {
            const thingExp = query;
            const dataExp = query.data();
            prevTotal = dataExp.price;

            thingExp.ref.update({
              price: info.price,
              date: info.date,
            });
          });

        await docRefCustomer.get().then((query) => {
          const thing = query;
          const data = query.data();
          let expensePaid = false;
          console.log("data", data);
          let prevTotalPaid = data.totalPaid ? data.totalPaid : 0;
          let nextTotal = parseFloat(info.price) + prevTotalPaid - prevTotal;
          if (nextTotal >= data.totalExpense) {
            expensePaid = true;
          }
          thing.ref.update({
            totalPaid: nextTotal,
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

export const getPayment = (info) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let docRef = firebase.firestore().collection("customerPayment");
    const startDate = moment(info.startDate).format("YYYY.MM.DD");
    const endDate = moment(info.endDate).format("YYYY.MM.DD");
    if (info.customer) {
      docRef = docRef.where("customer", "==", info.customer);
    }
    if (info.startDate) {
      docRef = docRef.where("date", ">=", startDate);
    }
    if (info.endDate) {
      docRef = docRef.where("date", "<=", endDate);
    }
    try {
      let payments = [];
      await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          let row = {};
          row = doc.data();
          Object.assign(row, { ...row, id: doc.id });
          payments.push(row);
        });
      });
      return payments;
    } catch (error) {
      console.log("err", error);
      notify("Tekrar deneyiniz", "error", 6000);
      notify("Bir sıkıntı oluştu. Tekrar deneyiniz", error, "6000");
    }
  };
};
