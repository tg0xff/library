const myLibrary = [];
const body = document.querySelector("body");
const dialog = body.querySelector("#book-dialog");
const form = dialog.querySelector("form");

body.addEventListener("click", main);

function main(e) {
  switch (e.target.getAttribute("id")) {
    case "new-book":
      dialog.showModal();
      break;
    case "x-button":
      form.reset();
      dialog.close();
      break;
    case "cancel-book":
      form.reset();
      dialog.close();
      break;
    case "add-book":
      e.preventDefault();
      addBookToLibrary();
      form.reset();
      dialog.close();
      displayBooks();
      break;
  }
}

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
  const book = new Book(
    form.elements["book_title"].value,
    form.elements["book_author"].value,
    form.elements["book_pages"].value,
    form.elements["book_read"].value,
  );
  myLibrary.push(book);
}

function displayBooks() {
  const prevTable = body.querySelector("#books");
  if (prevTable) {
    body.removeChild(prevTable);
  }
  const table = document.createElement("table");
  table.setAttribute("id", "books");

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
