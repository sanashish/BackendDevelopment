const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW1 Template" });
});

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Books
async function getAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No Books found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Books by Author
async function getAllBooksByAuthor(author) {
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query, [author]);
  return { books: response };
}
app.get("/books/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let result = await getAllBooksByAuthor(author);
    if (result.books.length === 0) {
      return res
        .status(404)
        .json({ message: "No Books found with this Author." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.messaage });
  }
});

// Exercise 3: Fetch Books by Genre
async function getAllBooksByGenre(genre) {
  let query = "SELECT * FROM books WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { books: response };
}
app.get("/books/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getAllBooksByGenre(genre);
    if (result.books.length === 0) {
      return res
        .status(404)
        .json({ message: "No Books found with this Genre." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Books by Publication Year
async function getAllBooksByPublicationYear(year) {
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query, [year]);
  return { books: response };
}
app.get("/books/publication_year/:year", async (req, res) => {
  try {
    let year = parseInt(req.params.year);
    let result = await getAllBooksByPublicationYear(year);
    if (result.books.length === 0) {
      return res
        .status(404)
        .json({ message: "No Books found with this Publication Year." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
