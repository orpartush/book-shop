'use strict';

const KEY = 'books'
const BOOKS_IN_PAGE = 5;

var gBooks = _createBooks();
var gCurrPage = 1


function storeBooks(books) {
  books.forEach(book => saveToStorage(book.name, book));
}

function removeBook(bookId) {
  var idx = gBooks.findIndex(book => book.id === bookId);
  gBooks.splice(idx, 1);
  saveToStorage(KEY, gBooks);
}

function addBook(name, price, img) {
  var newBook = _createBook(name, price, img);
  gBooks.push(newBook);
  saveToStorage(KEY, gBooks);
}

function updateBook(bookId, bookPrice) {
  var currBook = getBook(bookId);
  currBook.price = bookPrice;
  saveToStorage(KEY, gBooks);
}

function getBook(bookId) {
  var currBook = gBooks.find(book => book.id === bookId);
  return currBook;
}

function updateBookRate(bookId, operator) {
  var currBook = getBook(bookId);
  if (operator === '-') {
    if (currBook.rate === 0) return;
    currBook.rate -= 1
  } else {
    if (currBook.rate === 10) return;
    currBook.rate += 1
  }
  saveToStorage(KEY, gBooks);
  return currBook;
}

function sortByName() {
  return gBooks.sort((bookA, bookB) => {
    var nameA = bookA.name.toUpperCase();
    var nameB = bookB.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

function sortByPrice() {
  return gBooks.sort((bookA, bookB) => bookB.price - bookA.price);
}

function getBooksForDisplay() {
  var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
  var to = from + BOOKS_IN_PAGE;
  return gBooks.slice(from, to);
}

function changePage(diff) {
  gCurrPage += diff;
  var lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);
  if (gCurrPage > lastPage) gCurrPage = 1;
  else if (gCurrPage < 1) gCurrPage = lastPage;
}

function _createBooks() {
  var books = loadFromStorage(KEY);
  saveToStorage(KEY, books);
  if (books) return books;
  return [
    _createBook('Game of Thrones', 555, 'img/game-of-thrones.jpg'),
    _createBook(`You Don't Know JS`, 9000, 'img/ydkjs.jpg'),
    _createBook('Clean Code', 400, 'img/clean-code.jpg'),
    _createBook('Kofiko', 200, 'img/kofiko.jpg'),
    _createBook('The Green Price', 100, 'img/the-green-prince.jpg'),
    _createBook('The Fault in Our Stars', 400, 'img/the-fault-in-our-stars.jpg'),
  ];
}

function _createBook(name, price, img) {
  return {
    id: parseInt(Math.random() * 1000),
    name,
    price,
    img,
    rate: 0
  }
}