let express = require("express");
let { sequelize } = require("./lib");
let { book } = require("./models/book.model");
let { author } = require("./models/author.model");
let app = express();

app.use(express.json());

// books
let booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

// authors
let authorsData = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(booksData);
    await author.bulkCreate(authorsData);
    res.status(200).json({ message: "Database seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Create New Author
async function addNewAuthor(newAuthor) {
  let result = await author.create(newAuthor);
  return { newAuthor: result };
}
app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);
    if (response.newAuthor === null) {
      return res.status(404).json({ message: "Author not created." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Author by ID
async function updateAuthorById(newAuthorData, id) {
  let result = await author.findOne({ where: { id: id } });
  if (!result) {
    return { message: "Auhtor not found." };
  }
  result.set(newAuthorData);
  let updatedAuthor = await result.save();
  return {
    message: "Author updated successfully",
    updatedAuthor,
  };
}
app.post("/authors/update/:id", async (req, res) => {
  try {
    let newAuthorData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateAuthorById(newAuthorData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Author not updated." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000.");
});
