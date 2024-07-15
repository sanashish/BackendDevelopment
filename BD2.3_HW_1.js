let express = require("express");
let app = express();
let PORT = 3000;

let employees = [
  { name: "Rahul Gupta", department: "HR", salary: 50000 },
  { name: "Sneha Sharma", department: "Finance", salary: 60000 },
  { name: "Priya Singh", department: "Marketing", salary: 55000 },
  { name: "Amit Kumar", department: "IT", salary: 65000 },
];
let bikes = [
  { make: "Hero", model: "Splendor", mileage: 80 },
  { make: "Bajaj", model: "Pulsar", mileage: 60 },
  { make: "TVS", model: "Apache", mileage: 70 },
];
let songs = [
  { title: "Tum Hi Ho", genre: "Romantic", rating: 4 },
  { title: "Senorita", genre: "Pop", rating: 5 },
  { title: "Dil Chahta Hai", genre: "Bollywood", rating: 3 },
];
let tasks = [
  { taskId: 1, taskName: "Prepare Presentation", status: "pending" },
  { taskId: 2, taskName: "Attend Meeting", status: "in-progress" },
  { taskId: 3, taskName: "Submit Report", status: "completed" },
];

// Endpoint 1: Write an Express code snippet to filter employees by department.
function filterByDepartment(employee, department) {
  return employee.department === department;
}
app.get("/employees/department/:department", (req, res) => {
  let department = req.params.department;
  let result = employees.filter((employee) =>
    filterByDepartment(employee, department),
  );
  res.json(result);
});

// Endpoint 2: Write an Express code snippet to filter bikes by mileage greater than a specified value.
function filterByMileage(bike, minMileage) {
  return bike.mileage > minMileage;
}
app.get("/bikes/mileage/:minMileage", (req, res) => {
  let minMileage = parseInt(req.params.minMileage);
  let result = bikes.filter((bike) => filterByMileage(bike, minMileage));
  res.json(result);
});

// Endpoint 3: Write an Express code snippet to filter bikes by a specific make.
function filterByMake(bike, make) {
  return bike.make.toLowerCase() === make.toLowerCase();
}
app.get("/bikes/make/:make", (req, res) => {
  let make = req.params.make;
  let result = bikes.filter((bike) => filterByMake(bike, make));
  res.json(result);
});

// Endpoint 4: Write an Express code snippet to filter songs by rating higher than a specified value.
function filterByRating(song, minRating) {
  return song.rating > minRating;
}
app.get("/songs/rating/:minRating", (req, res) => {
  let minRating = parseInt(req.params.minRating);
  let result = songs.filter((song) => filterByRating(song, minRating));
  res.json(result);
});

// Endpoint 5: Write an Express code snippet to filter songs by a specific genre.
function filterByGenre(song, genre) {
  return song.genre.toLowerCase() === genre.toLowerCase();
}
app.get("/songs/genre/:genre", (req, res) => {
  let genre = req.params.genre;
  let result = songs.filter((song) => filterByGenre(song, genre));
  res.json(result);
});

// Endpoint 6: Write an Express code snippet to filter tasks by a specific status.
function filterByStatus(task, status) {
  return task.status.toLowerCase() === status.toLowerCase();
}
app.get("/tasks/status/:status", (req, res) => {
  let status = req.params.status;
  let result = tasks.filter((task) => filterByStatus(task, status));
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
