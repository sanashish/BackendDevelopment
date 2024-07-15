let express = require("express");
let app = express();
let PORT = 3000;

let cartItems = [
  { item: "Book", price: 30 },
  { item: "Pen", price: 5 },
  { item: "Notebook", price: 50 },
  { item: "Bag", price: 125 },
];
let students = [
  { name: "John", grade: "A" },
  { name: "Jane", grade: "A" },
  { name: "Jack", grade: "B" },
  { name: "Jill", grade: "C" },
];
let temperatures = [0, 20, 30, 100];
let student_scores = [
  { name: "John", score: 85 },
  { name: "Jane", score: 90 },
  { name: "Jack", score: 70 },
  { name: "Jill", score: 60 },
];
let sentence = "The quick brown fox jumps over the lazy dog";

// Exercise 1: Calculate Total Price of Items in a Cart
function calculateTotalPrice(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price;
  }
  return total;
}
app.get("/cart/total", (req, res) => {
  let totalPrice = calculateTotalPrice(cartItems);
  res.json({ totalPrice });
});

// Exercise 2: Filter Students by Grade
function filterStudentsByGrade(students, grade) {
  let result = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].grade.toLowerCase() === grade.toLowerCase()) {
      result.push(students[i]);
    }
  }
  return result;
}
app.get("/students/filter", (req, res) => {
  let grade = req.query.grade;
  let result = filterStudentsByGrade(students, grade);
  res.json({ students: result });
});

// Exercise 3: Convert Temperatures from Celsius to Fahrenheit
function convertCelsiusToFahrenheit(temperatures) {
  let result = [];
  for (let i = 0; i < temperatures.length; i++) {
    result.push((temperatures[i] * 9) / 5 + 32);
  }
  return result;
}
app.get("/temperatures/convert", (req, res) => {
  let result = convertCelsiusToFahrenheit(temperatures);
  res.json({ convertedTemperatures: result });
});

// Exercise 4: Calculate Average Score of Students
function calculateAverageScore(student_scores) {
  let avgScore = 0;
  for (let i = 0; i < student_scores.length; i++) {
    avgScore += student_scores[i].score;
  }
  return avgScore / student_scores.length;
}
app.get("/students/average-score", (req, res) => {
  let result = calculateAverageScore(student_scores);
  res.json({ averageScore: result });
});

// Exercise 5: Count Words in a Sentence
function countWords(sentence) {
  let words = 1;
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === " ") {
      words++;
    }
  }
  return words;
}
app.get("/sentence/count-words", (req, res) => {
  let wordCount = countWords(sentence);
  res.json({ wordCount });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
