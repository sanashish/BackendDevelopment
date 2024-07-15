let express = require("express");
let app = express();
let PORT = 3000;

let book = {
  title: "The God of Small Things",
  author: "Arundhati Roy",
  publicationYear: 1997,
  genre: "Novel",
  isAvailable: true,
  stock: 5,
};

//Endpoint 1: Create an endpoint that returns the details of a book stored on the server.
app.get("/book", (req, res) => {
  res.json(book);
});

//Endpoint 2: Design an endpoint that provides the full title and author of the book.
function getFullTitleAndAuthor(book) {
  return book.title + " by " + book.author;
}
app.get("/book/fulltitle-author", (req, res) => {
  let fullTitleAndAuthor = getFullTitleAndAuthor(book);
  res.json({ fullTitleAndAuthor: fullTitleAndAuthor });
});

//Endpoint 3: Develop an endpoint to access the genre and availability status of the book.
function getGenreAndAvailability(book) {
  return {
    genre: book.genre,
    isAvailable: book.isAvailable,
  };
}
app.get("/book/genre-availability", (req, res) => {
  let genreAvailability = getGenreAndAvailability(book);
  res.json(genreAvailability);
});

//Endpoint 4: Create an endpoint to calculate and return the age of the book.
function calculateBookAge(book) {
  let year = 2024;
  return year - book.publicationYear;
}
app.get("/book/age", (req, res) => {
  let age = calculateBookAge(book);
  res.json({ age: age });
});

//Endpoint 5: Implement an endpoint to provide a summary of the book including its title, author, genre, and publication year.
function getBookSummary(book) {
  return (
    "Title: " +
    book.title +
    ", Author: " +
    book.author +
    ", Genre: " +
    book.genre +
    ", Published: " +
    book.publicationYear
  );
}
app.get("/book/summary", (req, res) => {
  let summary = getBookSummary(book);
  res.json({ summary: summary });
});

//ENdpoint 6: Develop an endpoint to check the stock status of the book and determine if an order is required.
function checkStockAndOrder(book) {
  let status;
  if (book.isAvailable && book.stock > 0) {
    status = "In Stock";
  } else {
    status = "Out of Stock";
  }
  return { status: status, stock: book.stock };
}
app.get("/book/stock-status", (req, res) => {
  let stockStatus = checkStockAndOrder(book);
  res.json(stockStatus);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
