// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDu3jCsEVZSnCVqfRqYUnL5EepPblq7J6Q",
//   authDomain: "book-list-firebase-425a5.firebaseapp.com",
//   projectId: "book-list-firebase-425a5",
//   storageBucket: "book-list-firebase-425a5.appspot.com",
//   messagingSenderId: "868683313297",
//   appId: "1:868683313297:web:9f7a1933174ded20cecf30",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();

// //used to fetch from firebase
// const db = getFirestore();
// const colRef = collection(db, "books");

// getDocs(colRef).then(snapshot => {
//   console.log(snapshot.docs);
// });

// // const signBtn = document.getElementById("sign-btn");
// // const signOutBtn = document.getElementById("signout-btn");
// // const message = document.getElementById("message");
// // const username = document.getElementById("username");
// // const userEmail = document.getElementById("userEmail");
// // const accountBtn = document.getElementById("account-btn");
// // const userModal = document.getElementById("usermodal");

// // const userSignIn = async () => {
// //   signInWithPopup(auth, provider)
// //     .then(res => {
// //       const user = res.user;
// //       console.log(user);
// //     })
// //     .catch(err => {
// //       console.log(err);
// //     });
// // };

// // const userSignOut = async () => {
// //   signOut(auth, provider)
// //     .then(res => {
// //       alert("you have signed out succesfully");
// //     })
// //     .catch(err => console.log(err));
// // };

// // const showUserModal = () => {
// //   overlay.classList.add("active-overlay");
// //   userModal.classList.add("modal-active");
// // };
// // //checks if the user has signed in or signed out
// // onAuthStateChanged(auth, user => {
// //   if (user) {
// //     console.log("user", user);
// //     signOutBtn.style.display = "block";
// //     signBtn.style.display = "none";
// //     // username.innerHTML = user.displayName;
// //     const str = user.email.split("@");
// //     userEmail.innerHTML = str[0];
// //     accountBtn.style.display = "block";
// //   } else {
// //     signBtn.style.display = "block";
// //     signOutBtn.style.display = "none";
// //     accountBtn.style.display = "none";
// //   }
// // });

// // signOutBtn.style.display = "none";
// // signBtn.addEventListener("click", userSignIn);
// // signOutBtn.addEventListener("click", userSignOut);
// // accountBtn.addEventListener("click", showUserModal);
// // accountBtn.addEventListener("click", showUserModal);
