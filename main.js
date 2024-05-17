const myLibrary = [];
const body = document.querySelector("body");
const dialog = body.querySelector("#book-dialog");
const form = dialog.querySelector("form");
const tableContainer = body.querySelector(".table-container");

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
      if (form.reportValidity()) {
        addBookToLibrary();
        form.reset();
        dialog.close();
        displayBooks();
      }
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
  const table = tableContainer.querySelector("#books");
  const prevTable = tableContainer.querySelector("#books > tbody");
  if (prevTable) {
    tableContainer.removeChild(prevTable);
  }

  const tbody = document.createElement("tbody");
  for (const book of myLibrary) {
    const tbodyRow = document.createElement("tr");
    const bookData = Object.keys(book);
    for (const datum of bookData) {
      const td = document.createElement("td");
      if (datum === "read") {
        td.textContent = book[datum] === "on" ? "Yes" : "No";
      } else {
        td.textContent = book[datum];
      }
      tbodyRow.appendChild(td);
    }
    tbody.appendChild(tbodyRow);
  }
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}
