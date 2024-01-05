// imports and firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu3jCsEVZSnCVqfRqYUnL5EepPblq7J6Q",
  authDomain: "book-list-firebase-425a5.firebaseapp.com",
  projectId: "book-list-firebase-425a5",
  storageBucket: "book-list-firebase-425a5.appspot.com",
  messagingSenderId: "868683313297",
  appId: "1:868683313297:web:9f7a1933174ded20cecf30",
};
let signedInUser = null;

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

// //used to fetch from firebase
const db = getFirestore();
const colRef = collection(db, "books");
let myLibrary = [];

function getUsersBooks() {
  "getting users books called", signedInUser;
  if (signedInUser) {
    getDocs(colRef)
      .then(snapshot => {
        let books = [];
        snapshot.docs.forEach(doc => {
          if (doc.data().userId === signedInUser.uid) {
            books.push({ ...doc.data(), id: doc.id });
          }
        });

        myLibrary.push(...books);
        displayBooks();
      })
      .catch(err => ("Error when fetching", err));
  } else {
    getBooksFromLocal();
  }
}

//connect js and html
const signBtn = document.getElementById("sign-btn");
const signOutBtn = document.getElementById("signout-btn");
const message = document.getElementById("message");
const username = document.getElementById("username");
const userEmail = document.getElementById("userEmail");
const accountBtn = document.getElementById("account-btn");
const userModal = document.getElementById("usermodal");
const books = document.getElementById("books");
const addBtn = document.getElementById("add-btn");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

const bookSubmission = document.getElementById("book-submission");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read").checked;

const noBooks = document.getElementById("no-books");

const todaysYear = document.getElementById("year");
const duplicateFound = document.getElementById("duplicate-found");

//auth
const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then(res => {
      signedInUser = res.user;
      // (user);
    })
    .catch(err => {
      err;
    });
};

const userSignOut = async () => {
  signOut(auth, provider)
    .then(res => {
      alert("you have signed out succesfully");
    })
    .catch(err => err);
};

//checks if the user has signed in or signed out
onAuthStateChanged(auth, user => {
  clearDom();

  signedInUser = user;
  if (user) {
    getUsersBooks();
    signedInUser = user;

    signOutBtn.style.display = "block";
    signBtn.style.display = "none";
    const str = user.email.split("@");
    userEmail.innerHTML = str[0];
    accountBtn.style.display = "block";
  } else {
    getBooksFromLocal();
    displayBooks();
    signBtn.style.display = "block";
    signOutBtn.style.display = "none";
    accountBtn.style.display = "none";
  }
});

const showUserModal = () => {
  overlay.classList.add("active-overlay");
  userModal.classList.add("modal-active");
};

signOutBtn.style.display = "none";
signBtn.addEventListener("click", userSignIn);
signOutBtn.addEventListener("click", userSignOut);
accountBtn.addEventListener("click", showUserModal);
accountBtn.addEventListener("click", showUserModal);

addBtn.addEventListener("click", ShowModal);
overlay.addEventListener("click", toggleModal);

bookSubmission.addEventListener("submit", handleSubmit);
function toggleModal() {
  overlay.classList.remove("active-overlay");
  modal.classList.remove("modal-active");
  userModal.classList.remove("modal-active");
}
function ShowModal() {
  overlay.classList.add("active-overlay");
  modal.classList.add("modal-active");
}

function getBooksFromLocal() {
  if (localStorage.getItem("books")) {
    const localBooks = JSON.parse(localStorage.getItem("books"));
    myLibrary.push(...localBooks);
  } else {
    myLibrary = [];
    setBooksToLocal();
  }
}

function setBooksToLocal() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function clearBooksFromLocal() {
  localStorage.setItem("books", []);
  displayBooks();
}

function duplicateBook(book) {
  if (!myLibrary.find(bookItem => bookItem.title === book.title)) {
    myLibrary.push(book);
    return false;
  }
  return true;
}

function handleSubmit(e) {
  e.preventDefault();

  "read", read;
  if (title.value !== "" && author.value !== "" && pages.value > 0) {
    const book = {
      title: title.value,
      author: author.value,
      pages: pages.value,
      id: crypto.randomUUID(),
      read: read,
      userId: signedInUser ? signedInUser.uid : null,
    };
    bookSubmission.reset();

    if (duplicateBook(book)) {
      //duplidate found display error
      duplicateFound.style.display = "block";
      return;
    }
    console.log("duplicate book aclled", duplicateBook(book));

    // myLibrary.push(book);
    if (signedInUser) {
      addDoc(colRef, { ...book }).then(res => {
        toggleModal();
        displayBooks();
      });
    } else {
      toggleModal();
      setBooksToLocal();
      displayBooks();
    }
  }
}

function displayBooks() {
  ("displayu books called");
  let str = "";

  "my libray", myLibrary;
  if (myLibrary.length === 0) {
    ("isnide if");
    noBooks.style.display = "block";
  }
  for (let book of myLibrary) {
    noBooks.style.display = "none";

    const notRead = book.read ? "Read" : "Not Read";
    const readStyle = notRead === "Read" ? null : "not-read";
    "not read", readStyle;

    str += `<div class="book-item">
    <p>"${book.title}"</p>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
    <div class="btn-containers">
      <button class="btn submit ${readStyle}"  id=read-btn data-btn-id=${book.id}>${notRead}</button>
      <button class="btn remove" id=delete-btn data-btn-id=${book.id} >Remove</button>
    </div>
  </div>`;
  }
  "books", books;

  books.innerHTML = str;

  const readBtns = document.querySelectorAll("#read-btn");

  readBtns.forEach(btn => {
    btn.addEventListener("click", () => handleRead(btn.dataset.btnId));
  });

  const deleteBtns = document.querySelectorAll("#delete-btn");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", () => deleteBook(btn.dataset.btnId));
  });
}

function handleRead(id) {
  const val = document.querySelector(`[data-btn-id="${id}"]`);
  val.innerHTML = val.textContent === "Read" ? "Not Read" : "Read";
  val.classList.toggle("not-read");

  const readStatus = val.innerHTML === "Read" ? true : false;
  if (signedInUser) {
    updateReadStatus(id, readStatus);
  } else {
    myLibrary.forEach(book => {
      if (book.id === id) {
        book.read = readStatus;
      }
    });
    setBooksToLocal();
  }
}

function deleteBook(id) {
  const docRef = doc(db, "books", id);
  myLibrary = myLibrary.filter(book => {
    return book.id !== id;
  });

  if (signedInUser) {
    deleteDoc(docRef).then(res => {
      displayBooks();
      return;
    });
  }
  if (localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify(myLibrary));
  }

  if (myLibrary.length === 0) {
    noBooks.style.display = "block";
    displayBooks();
  } else displayBooks();
}

function updateReadStatus(id, readStatus) {
  const docRef = doc(db, "books", id);

  "doc red", readStatus;
  updateDoc(docRef, {
    read: readStatus,
  }).then(res => {
    // displayBooks();
  });
}

function todaysDate() {
  const thisYear = new Date();
  year.textContent = thisYear.getFullYear();
}

function clearDom() {
  books.innerHTML = "";
}

todaysDate();

// todo
// adding a book need to remove modal from screen see why its doing that
//when signing in remove books from local storage and display books from firestore
