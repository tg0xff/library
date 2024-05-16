function Book(title, author, pages, read) {
  self.title = title;
  self.author = author;
  self.pages = pages;
  self.read = read;
}

Book.prototype.info = function () {
  return `${self.title} by ${self.author}, ${self.pages} pages, ${read ? "Read" : "Not read yet"}`;
};
