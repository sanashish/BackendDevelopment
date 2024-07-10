let express = require("express");
let app = express();
let PORT = 3000;

//Endpoint 1: Create an endpoint that returns a welcome message.
function getWelcomeMessage() {
  return "Welcome to our service!";
}
app.get("/welcome", (req, res) => {
  res.send(getWelcomeMessage());
});

//Endpoint 2: Create an endpoint that takes a username as a query parameter and returns a greeting message.
function getGreetingMessage(username) {
  return "Hello, " + username + "!";
}
app.get("/greet", (req, res) => {
  let username = req.query.username;
  res.send(getGreetingMessage(username));
});

//Endpoint 3: Create an endpoint that takes a password as a query parameter and returns if it is strong (length > 15) or weak.
function checkPasswordStrength(password) {
  return password.length > 15 ? "Password is strong" : "Password is weak";
}
app.get("/check-password", (req, res) => {
  let password = req.query.password;
  res.send(checkPasswordStrength(password));
});

//Endpoint 4: Create an endpoint that takes two numbers as query parameters and returns their sum.
function getSum(num1, num2) {
  return num1 + num2;
}
app.get("/sum", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  res.send(getSum(num1, num2).toString());
});

//Endpoint 5: Create an endpoint that takes a username and a boolean isSubscribed indicating subscription status, and returns a message if the user is subscribed or not.
function getSubscriptionStatus(username, isSubscribed) {
  if (isSubscribed.toLowerCase() === "true") {
    return username + " is subscribed";
  } else {
    return username + " is not subscribed";
  }
}
app.get("/subscription-status", (req, res) => {
  let username = req.query.username;
  let isSubscribed = req.query.isSubscribed;
  res.send(getSubscriptionStatus(username, isSubscribed));
});

//Endpoint 6: Create an endpoint that takes a product price and a discount percentage, and returns the final price after discount.
function getDiscountedPrice(price, discount) {
  return price - (price * discount) / 100;
}
app.get("/discounted-price", (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  res.send(getDiscountedPrice(price, discount).toString());
});

//Endpoint 7: Create an endpoint that takes a user's age, gender, and name, and returns a personalized greeting message.
function getPersonalizedGreeting(age, gender, name) {
  return "Hello, " + name + "! You are a " + age + " year old " + gender + ".";
}
app.get("/personalized-greeting", (req, res) => {
  let age = parseFloat(req.query.age);
  let gender = req.query.gender;
  let name = req.query.name;
  res.send(getPersonalizedGreeting(age, gender, name));
});

//Endpoint 8: Create an endpoint that takes a product price, discount percentage, and tax rate, and returns the final price after applying discount and tax.
function getFinalPrice(price, discount, tax) {
  let discountedprice = price - (price * discount) / 100;
  let taxAmount = (discountedprice * tax) / 100;
  return discountedprice + taxAmount;
}
app.get("/final-price", (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);
  res.send(getFinalPrice(price, discount, tax).toString());
});

//Endpoint 9: Create an endpoint that takes three fitness activity durations (running, cycling, swimming) and returns the total exercise time.
function getTotalExerciseTime(running, cycling, swimming) {
  return running + cycling + swimming;
}
app.get("/total-exercise-time", (req, res) => {
  let runnning = parseFloat(req.query.running);
  let cycling = parseFloat(req.query.cycling);
  let swimming = parseFloat(req.query.swimming);
  res.send(getTotalExerciseTime(runnning, cycling, swimming).toString());
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
