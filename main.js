const myLibrary = [];

function Book(title, author, pages, read) {
  self.title = title;
  self.author = author;
  self.pages = pages;
  self.read = read;
}

Book.prototype.info = function () {
  return `${self.title} by ${self.author}, ${self.pages} pages, ${read ? "Read" : "Not read yet"}`;
};

function addBookToLibrary() {
  const title = prompt("Title: ");
  const author = prompt("Author: ");
  const pages = prompt("Pages: ");
  let read = prompt("Read: ");
  read = read.toLowerCase();
  read = read === "y";
  const book = Book(title, author, pages, read);
  myLibrary.push(book);
}
