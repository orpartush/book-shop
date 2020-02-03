'use strict';

var gIsUpdateFormHidden = true;

function onInit() {
  storeBooks(gBooks);
  renderBooks();
}

function renderBooks() {
  var strHtml = `
    <tr>
      <th>id</th>
      <th class="title-btn" onclick="onBookTitle()">Title</th>
      <th class="price-btn" onclick="onBookPrice()">Price</th>
      <th class="actions-title" colspan="3">Actions</th>
    </tr>
  `;

  var books = getBooksForDisplay();
  books.map(book => {
    strHtml += `
      <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><button class="btn read-btn" onclick="onReadClick(${book.id})">Read</button></td>
        <td><button class="btn update-btn" onclick="onToggleUpdateForm(${book.id})">Update</button></td>
        <td><button class="btn delete-btn" onclick="onRemoveBook(${book.id})">Delete</button></td>
      </tr>
    `;

    var elBooks = document.querySelector('.books');
    elBooks.innerHTML = strHtml;
  });
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function onToggleAddBook(elAddBook) {
  var elAddBookForm = document.querySelector('.add-book-form');
  if (elAddBook.innerText !== 'Cancel') {
    elAddBookForm.hidden = false;
    elAddBook.innerText = 'Cancel';
    return;
  }
  elAddBook.innerText = 'Add new book';
  elAddBookForm.hidden = true;
}

function onAddBook() {
  var elBookName = document.querySelector('.new-book-name');
  var elBookPrice = document.querySelector('.new-book-price');
  var elBookImg = document.querySelector('.new-book-img');
  if (elBookName.value === '' || elBookPrice.value === '') return
  if (!elBookImg.value) elBookImg.value = '../img/no-img.png';
  addBook(elBookName.value, elBookPrice.value, elBookImg.value);
  elBookName.value = '';
  elBookPrice.value = '';
  elBookImg.value = '';
  renderBooks();
}

function onToggleUpdateForm(bookId) {
  var elUpdateForm = document.querySelector('.update-price-container');
  gIsUpdateFormHidden = !gIsUpdateFormHidden;
  elUpdateForm.hidden = !elUpdateForm.hidden;
  var elUpdateBtn = document.querySelector('.hidden-update-btn');
  elUpdateBtn.dataset.id = bookId;
}

function onUpdateBook(elBtn) {
  var elUpdatePrice = document.querySelector('.update-price');
  var bookPrice = elUpdatePrice.value;
  if (!bookPrice) return
  var bookId = +elBtn.dataset.id;
  updateBook(bookId, bookPrice);
  renderBooks();
  elUpdatePrice.value = '';
  elBtn.dataset.id = '';
}

function onReadClick(bookId) {
  var book = getBook(bookId);
  var strHtml = `
    <div class="close-details-container">
      <button class="btn close-details-btn" onclick="onCloseDetails()">✘</button>
    </div>
    <p class="book-title">${book.name}</p>
    <img src="${book.img}" alt="book cover" class="book-img" width="182" height="277">  
    <p class="details">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Laudantium modi tenetur hic repellendus ullam ratione nobis natus nostrum nisi, 
      aliquam odit aperiam fugiat amet maxime iure? Voluptatem deserunt perspiciatis rem?
    </p>
    <div class="rate-container">
      <button class="btn decrease" onclick="onDecreaseClick(${bookId})">➖</button>
      <span class="rate-level">⭐${book.rate}⭐</span>
      <button class="btn increase" onclick="onIncreaseClick(${bookId})">➕</button>
    </div>
  `;

  var elBookModal = document.querySelector('.book-details');
  elBookModal.innerHTML = strHtml;
  elBookModal.hidden = false;
  renderBooks();
}

function onCloseDetails() {
  var elBookModal = document.querySelector('.book-details');
  elBookModal.hidden = true;
}

function onDecreaseClick(bookId) {
  var book = updateBookRate(bookId, '-');
  if (!book) return;
  var elRateLvl = document.querySelector('.rate-level');
  elRateLvl.innerText = `⭐${book.rate}⭐`;
}

function onIncreaseClick(bookId) {
  var book = updateBookRate(bookId, '+');
  if (!book) return;
  var elRateLvl = document.querySelector('.rate-level');
  elRateLvl.innerText = `⭐${book.rate}⭐`;
}

function onBookTitle() {
  sortByName();
  renderBooks();
}

function onBookPrice() {
  sortByPrice();
  renderBooks();
}

function onChangePage(diff) {
  changePage(diff)
  renderBooks();
}