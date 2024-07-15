let express = require("express");
let app = express();
let PORT = 3000;

// Sample data
let users = [
  {
    id: 1,
    username: "ankit",
    fullName: "Ankit Kumar",
    email: "ankit@gmail.com",
  },
  {
    id: 2,
    username: "dhananjit",
    fullName: "Dhananjit Singh",
    email: "dhananjit.singh@gmail.com",
  },
];
let creditCards = [
  { number: "1234567890123456", holder: "John Doe", expiry: "12/24" },
  { number: "9876543210987654", holder: "Jane Smith", expiry: "06/23" },
];
let books = [
  { isbn: "9783161484100", title: "Example Book", author: "John Author" },
  { isbn: "9781234567897", title: "Another Book", author: "Jane Writer" },
];
let people = [
  { ssn: "123-45-6789", name: "John Doe", birthDate: "1990-01-01" },
  { ssn: "987-65-4321", name: "Jane Smith", birthDate: "1985-05-05" },
];

// Exercise 1: Check username availability
function checkUsernameAvailability(ele, username) {
  return ele.username.toLowerCase() === username.toLowerCase();
}
app.get("/username/find/:username", (req, res) => {
  let username = req.params.username;
  let result = users.find((ele) => checkUsernameAvailability(ele, username));
  if (result) {
    res.json({ result: "Username is not available" });
  } else {
    res.json({ result: "Username is available" });
  }
});

// Exercise 2: Find Credit Card Number
function findCreditCard(ele, cardNumber) {
  return ele.number === cardNumber;
}
app.get("/credit-cards/find", (req, res) => {
  let cardNumber = req.query.cardNumber;
  let result = creditCards.find((ele) => findCreditCard(ele, cardNumber));
  res.json({ creditCard: result });
});

// Exercise 3: Find Email Address
function findUserByEmail(ele, email) {
  return ele.email === email;
}
app.get("/emails/find", (req, res) => {
  let email = req.query.email;
  let result = users.find((ele) => findUserByEmail(ele, email));
  res.json({ user: result });
});

// Exercise 4: Find ISBN Number (for books)
function findBookByISBN(ele, isbn) {
  return ele.isbn === isbn;
}
app.get("/books/find", (req, res) => {
  let isbn = req.query.isbn;
  let result = books.find((ele) => findBookByISBN(ele, isbn));
  res.json({ book: result });
});

// Exercise 5: Find Social Security Number (SSN)
function findSsn(ele, ssn) {
  return ele.ssn === ssn;
}
app.get("/ssn/find", (req, res) => {
  let ssn = req.query.ssn;
  let result = people.find((ele) => findSsn(ele, ssn));
  res.json({ person: result });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
