const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "Read" : "Not read yet"}`;
};

function addBookToLibrary() {
  const title = prompt("Title: ");
  const author = prompt("Author: ");
  const pages = prompt("Pages: ");
  let read = prompt("Read: ");
  read = read.toLowerCase();
  read = read === "y";
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  const body = document.querySelector("body");
  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const theadRow = document.createElement("tr");
  const tableColumns = ["Title", "Author", "# of pages", "Read"];
  for (const column of tableColumns) {
    const th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.textContent = column;
    theadRow.appendChild(th);
  }
  thead.appendChild(theadRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const book of myLibrary) {
    const tbodyRow = document.createElement("tr");
    const bookData = Object.values(book);
    for (const datum of bookData) {
      const td = document.createElement("td");
      td.textContent = datum;
      tbodyRow.appendChild(td);
    }
    tbody.appendChild(tbodyRow);
  }
  table.appendChild(tbody);
  body.appendChild(table);
}
