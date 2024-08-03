let { DataTypes, sequelize } = require("../lib");
let { book } = require("./book.model");
let { author } = require("./author.model");

let bookAuthor = sequelize.define("bookAuthor", {
  bookId: {
    type: DataTypes.STRING,
    references: {
      model: book,
      key: "id",
    },
  },
  authorId: {
    type: DataTypes.STRING,
    references: {
      model: author,
      key: "id",
    },
  },
});

book.belongsToMany(author, { through: bookAuthor });
author.belongsToMany(book, { through: bookAuthor });

module.exports = { bookAuthor };
