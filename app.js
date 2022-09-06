var firebaseConfig = {
  apiKey: "AIzaSyAOndxQtNZCSZM64N8HmHnuDN2HxByIe7Y",
  authDomain: "todo-4bf1a.firebaseapp.com",
  projectId: "todo-4bf1a",
  storageBucket: "todo-4bf1a.appspot.com",
  messagingSenderId: "238679071413",
  appId: "1:238679071413:web:a736c267f798801de6bcfc",
};

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const db = firestore.collection("fomData");

let submitButton = document.getElementById("submit");

db.onSnapshot((snapshot) => {
  let items = [];
  snapshot.docs.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  console.log(items);
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  let country = document.getElementById("country").value;

  firestore
    .collection("fomData")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const fn = doc.data().fname;
        if (firstName === fn) {
          console.log("Already Exists");
        }
      });
    });

  db.doc()
    .set({
      fname: firstName,
      lname: lastName,
      country: country,
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

  //alert
  alert("Your Form Has Been Submitted Successfully");
});
