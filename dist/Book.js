// let myLibrary = [
//   // { title: "harry potter", author: "Jk rowling", pages: 2000, id: 1 },
//   // { title: "harry potter", author: "Jk rowling", pages: 2020, id: 2 },
// ];

// const books = document.getElementById("books");
// const addBtn = document.getElementById("add-btn");
// const overlay = document.getElementById("overlay");
// const modal = document.getElementById("modal");

// const bookSubmission = document.getElementById("book-submission");
// const title = document.getElementById("title");
// const author = document.getElementById("author");
// const pages = document.getElementById("pages");

// const noBooks = document.getElementById("no-books");
// const todaysYear = document.getElementById("year");
// const userModal = document.getElementById("usermodal");

// //add books on click and form submission
// //get authro title and tpage numebrs
// //also addm check box
// //upon submission add books to grid
// // display in grid;
// addBtn.addEventListener("click", ShowModal);
// overlay.addEventListener("click", toggleModal);

// bookSubmission.addEventListener("submit", handleSubmit);
// function toggleModal() {
//   overlay.classList.remove("active-overlay");
//   modal.classList.remove("modal-active");
//   userModal.classList.remove("modal-active");
// }
// function ShowModal() {
//   overlay.classList.add("active-overlay");
//   modal.classList.add("modal-active");
// }

// function getBooksFromLocal() {
//   if (localStorage.getItem("books")) {
//     const localBooks = JSON.parse(localStorage.getItem("books"));

//     myLibrary.push(...localBooks);
//   }
// }

// function setBooksToLocal() {
//   localStorage.setItem("books", JSON.stringify(myLibrary));
//   // myLibrary
// }

// function handleSubmit(e) {
//   e.preventDefault();

//   // console.log("title", title);
//   if (title.value !== "" && author.value !== "" && pages.value > 0) {
//     const book = {
//       title: title.value,
//       author: author.value,
//       pages: pages.value,
//       id: crypto.randomUUID(),
//     };
//     myLibrary.push(book);

//     toggleModal();
//     displayBooks();
//     setBooksToLocal();
//   }
//   // console.log(myLibrary);
// }

// function Book() {}

// function addBookToLibrary() {}

// // function OnSuccess(googleUser) {
// //   console.log("succes called");
// //   var profile = googleUser.getBasicProfile();
// //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
// //   console.log("Name: " + profile.getName());
// //   console.log("Image URL: " + profile.getImageUrl());
// //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
// // }

// //use this render function as a refernce to add dlete function to all the buttons
// // function render() {
// //   let orderHtml = "";

// //   const total = cart.reduce((acc, curVal) => acc + Number(curVal.price), 0);
// //   orderHtml = cart
// //     .map(
// //       item =>
// //         `<li>
// //   <div class="item-list">
// //     <div class="item-list-name">
// //       <p>${item.name}</p>
// //       <button class="item-list-btn" id="remove-btn" data-item-id =${item.id}>remove</button>
// //     </div>
// //     <p>$${item.price}</p>
// //   </div>
// // </li>`
// //     )
// //     .join(" ");

// //   orderList.innerHTML = orderHtml;
// //   orderTotal.textContent = `$${total}`;

// //   const removeBtn = document.querySelectorAll("#remove-btn");
// //   removeBtn.forEach(item => {
// //     item.addEventListener("click", () => deleteItem(item.dataset.itemId));
// //   });
// // }

// //to od add a togle button for teh read
// //change the color the button

// function displayBooks() {
//   let str = "";
//   // console.log("display books", myLibrary);

//   noBooks.style.display = "none";

//   if (myLibrary.length === 0) {
//     noBooks.style.display = "block";
//   }
//   for (let book of myLibrary) {
//     // console.log("book", book.id);
//     str += `<div class="book-item">
//     <p>"${book.title}"</p>
//     <p>${book.author}</p>
//     <p>${book.pages} pages</p>
//     <div class="btn-containers">
//       <button class="btn submit"  id=read-btn data-btn-id=${book.id}>Read</button>
//       <button class="btn remove" id=delete-btn data-btn-id=${book.id} >Remove</button>
//     </div>
//   </div>`;
//   }

//   books.innerHTML = str;

//   const readBtns = document.querySelectorAll("#read-btn");

//   readBtns.forEach(btn => {
//     // console.log("btn", btn);
//     btn.addEventListener("click", () => handleRead(btn.dataset.btnId));
//   });

//   const deleteBtns = document.querySelectorAll("#delete-btn");
//   deleteBtns.forEach(btn => {
//     btn.addEventListener("click", () => deleteBook(btn.dataset.btnId));
//   });
// }

// function handleClick() {
//   // console.log("clciked");
// }
// function handleRead(id) {
//   // console.log("read clicked", id);

//   const val = document.querySelector(`[data-btn-id="${id}"]`);
//   val.innerHTML = val.textContent === "Read" ? "Not Read" : "Read";
//   val.classList.toggle("not-read");

//   // document.getElementById(`read-btn-${id}`). =  ;
// }

// function deleteBook(id) {
//   // console.log("id", id);
//   myLibrary = myLibrary.filter(book => {
//     return book.id !== id;
//   });
//   // console.log("my libarry", myLibrary);

//   if (localStorage.getItem("books")) {
//     localStorage.setItem("books", JSON.stringify(myLibrary));
//   }

//   if (myLibrary.length === 0) {
//     noBooks.style.display = "block";
//     displayBooks();
//   } else displayBooks();
// }

// function todaysDate() {
//   const thisYear = new Date();
//   year.textContent = thisYear.getFullYear();
// }

// getBooksFromLocal();
// displayBooks();
// todaysDate();
