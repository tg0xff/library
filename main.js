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
      if (form.reportValidity()) {
        addBookToLibrary();
        form.reset();
        dialog.close();
        displayBooks();
      }
      break;
    default:
      if (e.target.classList.contains("remove-book")) {
        const tableRow = e.target.parentNode.parentNode;
        const bookIndex = tableRow.getAttribute("data-book-index");
        tableRow.parentNode.removeChild(tableRow);
        myLibrary.splice(bookIndex, 1);
      } else if (e.target.classList.contains("book-change-read")) {
        const tableRow = e.target.parentNode.parentNode;
        const bookIndex = tableRow.getAttribute("data-book-index");
        myLibrary[bookIndex].read =
          myLibrary[bookIndex].read === "Yes" ? "No" : "Yes";
        const readStatus = e.target.parentNode.querySelector("span");
        readStatus.textContent =
          readStatus.textContent === "Yes" ? "No" : "Yes";
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
    form.elements["book_read"].value === "on" ? "Yes" : "No",
  );
  myLibrary.push(book);
}

function displayBooks() {
  const table = body.querySelector("#books");
  const prevData = table.querySelector("tbody");
  if (prevData) {
    table.removeChild(prevData);
  }

  const tbody = document.createElement("tbody");
  for (let i = 0; i < myLibrary.length; i++) {
    const tbodyRow = document.createElement("tr");
    tbodyRow.setAttribute("data-book-index", i);
    const book = myLibrary[i];
    const bookData = Object.values(book);
    for (let j = 0; j < bookData.length; j++) {
      const td = document.createElement("td");
      if (j === 3) {
        const span = document.createElement("span");
        span.textContent = bookData[j];
        td.appendChild(span);
        const buttonRead = document.createElement("button");
        buttonRead.setAttribute("type", "button");
        buttonRead.classList.add("book-change-read");
        buttonRead.textContent = "Change";
        td.appendChild(buttonRead);
      } else {
        td.textContent = bookData[j];
      }
      tbodyRow.appendChild(td);
    }

    const td = document.createElement("td");
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("remove-book");
    button.textContent = "−";
    td.appendChild(button);
    tbodyRow.appendChild(td);

    tbody.appendChild(tbodyRow);
  }
  table.appendChild(tbody);
}
