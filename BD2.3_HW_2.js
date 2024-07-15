let express = require("express");
let app = express();
let PORT = 3000;

let products = [
  { name: "Product A", inStock: true },
  { name: "Product B", inStock: false },
  { name: "Product C", inStock: true },
  { name: "Product D", inStock: false },
];
let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 17 },
  { name: "Dave", age: 16 },
];
let productPrices = [
  { name: "Product A", price: 50 },
  { name: "Product B", price: 150 },
  { name: "Product C", price: 200 },
  { name: "Product D", price: 90 },
];
let articles = [
  { title: "Article A", wordCount: 400 },
  { title: "Article B", wordCount: 600 },
  { title: "Article C", wordCount: 700 },
  { title: "Article D", wordCount: 300 },
];
let movies = [
  { title: "Movie A", rating: 8.5 },
  { title: "Movie B", rating: 7.0 },
  { title: "Movie C", rating: 9.0 },
  { title: "Movie D", rating: 6.5 },
];
let employees = [
  { name: "Employee A", experience: 3 },
  { name: "Employee B", experience: 6 },
  { name: "Employee C", experience: 10 },
  { name: "Employee D", experience: 2 },
];

// Endpoint 1: Filter In-Stock Products
function filterInStockProducts(product) {
  return product.inStock;
}
app.get("/in-stock-products", (req, res) => {
  let result = products.filter((product) => filterInStockProducts(product));
  res.json(result);
});

// Endpoint 2: Filter Adults from User List
function filterAdults(user) {
  return user.age >= 18;
}
app.get("/adult-users", (req, res) => {
  let result = users.filter((user) => filterAdults(user));
  res.json(result);
});

// Endpoint 3: Filter Expensive Products
function fiterExpensiveProducts(productPrice, price) {
  return productPrice.price > price;
}
app.get("/expensive-products", (req, res) => {
  let price = parseFloat(req.query.price);
  let result = productPrices.filter((productPrice) =>
    fiterExpensiveProducts(productPrice, price),
  );
  res.json(result);
});

// Endpoint 4: Filter Articles by Word Count
function filterArticles(article, minWords) {
  return article.wordCount > minWords;
}
app.get("/long-articles", (req, res) => {
  let minWords = parseInt(req.query.minWords);
  let result = articles.filter((article) => filterArticles(article, minWords));
  res.json(result);
});

//Endpoint 5: Filter Movies by Rating
function filterHighRatedMovies(movie, rating) {
  movie.rating = movie.rating.toFixed(1);
  return movie.rating > rating;
}
app.get("/high-rated-movies", (req, res) => {
  let rating = parseFloat(req.query.rating);
  let result = movies.filter((movie) => filterHighRatedMovies(movie, rating));
  res.json(result);
});

//Endpoint 6: Filter Employees by Experience
function filterExperiencedEmployees(employee, years) {
  return employee.experience > years;
}
app.get("/experienced-employees", (req, res) => {
  let years = parseFloat(req.query.years);
  let result = employees.filter((employee) =>
    filterExperiencedEmployees(employee, years),
  );
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
