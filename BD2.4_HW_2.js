let express = require("express");
let app = express();
let PORT = 3000;

let books = [
  { title: "Moby Jonas", author: "Herman Melville", publication_year: 2023 },
  { title: "1984", author: "George Orwell", publication_year: 1984 },
  {
    title: "A Tale of Two Cities",
    author: "Charles Jonas",
    publication_year: 2000,
  },
];
let employees = [
  { name: "John", salary: 75000 },
  { name: "Doe", salary: 30000 },
  { name: "Jane", salary: 50000 },
];
let products = [
  { name: "Product A", price: 15 },
  { name: "Product B", price: 25 },
  { name: "Product C", price: 10 },
];
let movies = [
  { title: "Movie A", rating: 9.0 },
  { title: "Movie C", rating: 7.0 },
  { title: "Movie B", rating: 8.5 },
];

// Endpoint 1: Sort Books by Year in ascending order
function sortBooksByYear(book1, book2) {
  return book1.publication_year - book2.publication_year;
}
app.get("/books/sort-by-year", (req, res) => {
  let booksCopy = books.slice();
  booksCopy.sort(sortBooksByYear);
  res.json(booksCopy);
});

// Endpoint 2: Sort Employees by Salary in Descending Order
function sortEmployeesBySalary(employee1, employee2) {
  return employee2.salary - employee1.salary;
}
app.get("/employees/sort-by-salary", (req, res) => {
  let employeesCopy = employees.slice();
  employeesCopy.sort(sortEmployeesBySalary);
  res.json(employeesCopy);
});

// Endpoint 3: Sort Products by Price in Ascending Order
function sortProductsByPrice(product1, product2) {
  return product1.price - product2.price;
}
app.get("/products/sort-by-price", (req, res) => {
  let productsCopy = products.slice();
  productsCopy.sort(sortProductsByPrice);
  res.json(productsCopy);
});

// Endpoint 4: Sort Movies by Rating in Descending Order
function sortMoviesByRating(movie1, movie2) {
  return movie2.rating - movie1.rating;
}
function upToDecimal1(movie) {
  movie.rating = movie.rating.toFixed(1);
  return movie;
}
app.get("/movies/sort-by-rating", (req, res) => {
  let moviesCopy = movies.slice();
  moviesCopy.sort(sortMoviesByRating);
  moviesCopy = moviesCopy.filter((movie) => upToDecimal1(movie));
  res.json(moviesCopy);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
