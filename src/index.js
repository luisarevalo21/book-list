// imports and firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
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
// let myLibrary = [];

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

overlay.addEventListener("click", toggleModal);

//auth
const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then(res => {
      signedInUser = new User(res.user);
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
    .catch(err => console.log("error when signing out", err));
};

//checks if the user has signed in or signed out
onAuthStateChanged(auth, async user => {
  // console.log("uiser", user);
  console.log("auth changed", user);

  clearDom();
  // bookLibrary.renderBooks();
  // signedInUser = new User(user);
  if (user) {
    let bookLibrary;

    // getUsersBooks();
    signedInUser = new User(user);

    const books = await signedInUser.getBooks();

    console.log("books", books);
    bookLibrary = new BookLibrary(books);
    bookLibrary.renderBooks();
    // bookLibrary = new BookLibrary(signedInUser.getBooks());

    // console.log("book library", books);
    // bookLibrary.renderBooks();
    // const bookLibrary = signedInUser.getBooks();
    // bookLibrary.renderBooks();
    signOutBtn.style.display = "block";
    signBtn.style.display = "none";
    const str = user.email.split("@");
    userEmail.innerHTML = str[0];
    // accountBtn.style.display = "block";
  } else {
    signedInUser = null;
    const books = getBooksFromLocal();
    console.log("books form local", books);
    // displayBooks();
    signBtn.style.display = "block";
    signOutBtn.style.display = "none";
    accountBtn.style.display = "none";
    bookLibrary = new BookLibrary(books);
    bookLibrary.renderBooks();
  }
});

const showUserModal = () => {
  if (userModal.classList.contains("modal-active")) {
    userModal.classList.remove("modal-active");
    overlay.classList.remove("active-overlay");
  } else {
    overlay.classList.add("active-overlay");
    userModal.classList.add("modal-active");
  }
};

signOutBtn.style.display = "none";
signBtn.addEventListener("click", userSignIn);
signOutBtn.addEventListener("click", userSignOut);
accountBtn.addEventListener("click", showUserModal);
// accountBtn.addEventListener("click", showUserModal);

// addBtn.addEventListener("click", ShowModal);
// overlay.addEventListener("click", toggleModal);

// bookSubmission.addEventListener("submit", handleSubmit);
function toggleModal() {
  console.log("toggle modal clicked");
  if (modal.classList.contains("modal-active")) {
    overlay.classList.remove("active-overlay");
    modal.classList.remove("modal-active");
    return;
  } else if (userModal.classList.contains("modal-active")) {
    userModal.classList.remove("modal-active");
    overlay.classList.remove("active-overlay");
  } else {
    overlay.classList.add("active-overlay");
    modal.classList.add("modal-active");
  }

  // overlay.classList.remove("active-overlay");
  // modal.classList.remove("modal-active");
  // userModal.classList.remove("modal-active");
}
// function ShowModal() {
//   overlay.classList.add("active-overlay");
//   modal.classList.add("modal-active");
// }

function getBooksFromLocal() {
  if (localStorage.getItem("books")) {
    return JSON.parse(localStorage.getItem("books"));
    // myLibrary.push(...localBooks);
  } else {
    setBooksToLocal([]);
    return [];
    // setBooksToLocal();
  }
}

function setBooksToLocal(bookLibrary) {
  localStorage.setItem("books", JSON.stringify(bookLibrary));
}

function clearBooksFromLocal() {
  localStorage.setItem("books", []);
  displayBooks();
}

function handleSubmit(e) {
  e.preventDefault();

  if (title.value !== "" && author.value !== "" && pages.value > 0) {
    const book = new Book(title.value, author.value, pages.value, read);
    bookSubmission.reset();

    if (duplicateBook(book)) {
      //duplidate found display error
      duplicateFound.style.display = "block";
      return;
    }

    if (signedInUser) {
      addDoc(colRef, { ...book }).then(res => {
        toggleModal();
        displayBooks();
      });
    } else {
      bookLibrary.addBook(book);
      bookLibrary.renderBooks();
      toggleModal();
    }
  }
}

// function displayBooks() {
//   ("displayu books called");
//   let str = "";

//   "my libray", myLibrary;
//   if (myLibrary.length === 0) {
//     ("isnide if");
//     noBooks.style.display = "block";
//   }
//   for (let book of myLibrary) {
//     noBooks.style.display = "none";

//     const notRead = book.read ? "Read" : "Not Read";
//     const readStyle = notRead === "Read" ? null : "not-read";
//     "not read", readStyle;

//     str += `<div class="book-item">
//     <p>"${book.title}"</p>
//     <p>${book.author}</p>
//     <p>${book.pages} pages</p>
//     <div class="btn-containers">
//       <button class="btn submit ${readStyle}"  id=read-btn data-btn-id=${book.id}>${notRead}</button>
//       <button class="btn remove" id=delete-btn data-btn-id=${book.id} >Remove</button>
//     </div>
//   </div>`;
//   }
//   "books", books;

//   books.innerHTML = str;

//   const readBtns = document.querySelectorAll("#read-btn");

//   readBtns.forEach(btn => {
//     btn.addEventListener("click", () => handleRead(btn.dataset.btnId));
//   });

//   const deleteBtns = document.querySelectorAll("#delete-btn");
//   deleteBtns.forEach(btn => {
//     btn.addEventListener("click", () => deleteBook(btn.dataset.btnId));
//   });
// }

// function handleRead(id) {
//   const val = document.querySelector(`[data-btn-id="${id}"]`);
//   val.innerHTML = val.textContent === "Read" ? "Not Read" : "Read";
//   val.classList.toggle("not-read");

//   const readStatus = val.innerHTML === "Read" ? true : false;
//   if (signedInUser) {
//     updateReadStatus(id, readStatus);
//   } else {
//     myLibrary.forEach(book => {
//       if (book.id === id) {
//         book.read = readStatus;
//       }
//     });
//     setBooksToLocal();
//   }
// }

// function deleteBook(id) {
//   const docRef = doc(db, "books", id);
//   myLibrary = myLibrary.filter(book => {
//     return book.id !== id;
//   });

//   if (signedInUser) {
//     deleteDoc(docRef).then(res => {
//       displayBooks();
//       return;
//     });
//   }
//   if (localStorage.getItem("books")) {
//     localStorage.setItem("books", JSON.stringify(myLibrary));
//   }

//   if (myLibrary.length === 0) {
//     noBooks.style.display = "block";
//     displayBooks();
//   } else displayBooks();
// }

// function updateReadStatus(id, readStatus) {
//   const docRef = doc(db, "books", id);

//   "doc red", readStatus;
//   updateDoc(docRef, {
//     read: readStatus,
//   }).then(res => {
//     // displayBooks();
//   });
// }

function todaysDate() {
  const thisYear = new Date();
  year.textContent = thisYear.getFullYear();
}

// function clearDom() {
//   books.innerHTML = "";
// }

todaysDate();

// book should allow to add books,
//delete books
//update the book from read to not read
//

const addBookBtn = document.getElementById("add-btn");
const submitBookBtn = document.getElementById("book-submission");

addBookBtn.addEventListener("click", handleAdd);
submitBookBtn.addEventListener("submit", handleSubmit);

function clearDom() {
  books.innerHTML = "";
}

function handleAdd() {
  console.log("handle add called", this);
  overlay.classList.add("active-overlay");
  modal.classList.add("modal-active");
}

class Book {
  constructor(title, author, pages, read, id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

class BookLibrary {
  constructor(books = []) {
    this.library = books;
  }

  renderBooks() {
    clearDom();

    const bookLibrary = this.library;

    // if (getBooksFromLocal().length > 0) {
    //   console.log("get books from local called", getBooksFromLocal());
    //   this.library = getBooksFromLocal();
    // }
    const bookHtml = document.getElementById("books");
    // console.log("this.libray", this.library);

    // console.log("render books aclled");
    let str = "";
    if (bookLibrary.length === 0) {
      noBooks.style.display = "block";
      return;
    }

    if (bookLibrary.length > 0) {
      noBooks.style.display = "none";
      // setBooksToLocal(this.library);
    }
    for (let book of bookLibrary) {
      const readStatus = book.read ? "" : "not-read";

      str += `<div class="book-item">
    <p>"${book.title}"</p>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
    <div class="btn-containers">
      <button class="btn submit ${readStatus}"  id=read-btn data-btn-id=${book.id}>${
        book.read ? "Read" : "Not Read"
      }</button>
      <button class="btn remove" id="delete-btn" data-btn-id=${book.id} >Remove</button>
    </div>
  </div>`;
    }
    bookHtml.innerHTML = str;
    const removeBtns = document.querySelectorAll("#delete-btn");
    // loop through all the delete btsn and add the function

    removeBtns.forEach(btn => {
      btn.addEventListener("click", () => this.deleteBook(btn.dataset.btnId));
    });
    const readBtns = document.querySelectorAll("#read-btn");
    readBtns.forEach(btn => {
      btn.addEventListener("click", () => this.toggleRead(btn.dataset.btnId));
    });
  }

  addBook(book) {
    console.log("add book caled", book);
    this.library.push({ ...book });
    setBooksToLocal(this.library);
    console.log("this library", this.library);
    // this.renderBooks();
  }

  deleteBook(id) {
    console.log("delete book called", id);
    this.library = this.library.filter(book => {
      return book.id !== id;
    });
    if (this.library.length === 0) {
      noBooks.style.display = "block";
    }
    console.log("signin user", signedInUser);
    if (signedInUser) {
      signedInUser.deleteBook(id);
    } else {
      setBooksToLocal(this.library);
    }
    this.renderBooks();
  }
  toggleRead(id) {
    console.log("toggle read called");
    let bookToUpdate = null;
    this.library = this.library.map(book => {
      if (book.id === id) {
        bookToUpdate = book;
        return {
          ...book,
          read: !book.read,
        };
      }
      return book;
    });

    if (signedInUser) {
      const docRef = doc(db, "books", id);
      updateDoc(docRef, {
        read: !bookToUpdate.read,
      }).then(res => {
        this.renderBooks();
      });
    } else {
      console.log("this library", this.library);
      setBooksToLocal(this.library);
      this.renderBooks();
    }
    // console.log("id", id);
    // this.read = !this.read;
  }
}

class User {
  constructor(user) {
    this.user = user;
    // this.bookLibrary = new BookLibrary();
  }
  async getBooks() {
    const docs = await getDocs(colRef);

    const books = [];
    docs.forEach(doc => {
      if (doc.data().userId === this.user.uid) {
        books.push(convertDocToBook(doc));
      }
    });
    console.log("books", books);
    return books;

    // console.log("this user", this.user);
    // console.log("signed in user", signedInUser);
    // console.log("gt books called");
    // getDocs(colRef).then(snapshot => {
    //   snapshot.docs.forEach(doc => {
    //     // console.log("doc", doc.data());
    //     if (doc.data().userId === this.user.uid) {
    //       books.push(convertDocToBook(doc));
    //     }
    //   });
    // });

    //   if (doc.data().userId === signedInUser.uid) {
    //     console.log("doc", doc);
    //     convertDocToBook(doc);
    //     this.bookLibrary.push(convertDocToBook(doc));
    //   }
    // });
    // return books;
  }
  async deleteBook(id) {
    console.log("id", id);
    const docRef = doc(db, "books", id);
    console.log("doc ref", docRef);
    await deleteDoc(docRef);
  }
}

const booksFromLocal = getBooksFromLocal();
console.log("book from local", booksFromLocal);
let bookLibrary = new BookLibrary(booksFromLocal);
bookLibrary.renderBooks();
// const book = new Book("harry potter", "Jk rowling", 1000);

const convertDocToBook = doc => {
  const { title, author, pages, read } = doc.data();
  const id = doc.id;
  return new Book(title, author, pages, read, id);
};

// todo
