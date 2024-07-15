let express = require("express");
let app = express();
let PORT = 3000;

let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true,
};

//Endpoind 1: Return the Person Object
app.get("/person", (req, res) => {
  res.json(person);
});

//Endpoind 2: Access the Full Name of the Person
function getFullName(person) {
  return person.firstName + " " + person.lastName;
}
app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

//Endpoind 3: Exercise 3: Access Just the First Name and Gender of the Person
function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}
app.get("/person/firstname-gender", (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});

//Endpoind 4: Increment the Age of the Person and Return the Updated Object
function getIncrementAge(person) {
  person.age += 1;
  return person;
}
app.get("/person/increment-age", (req, res) => {
  res.json(getIncrementAge(person));
});

//Endpoind 5: Return the Full Name and Membership Status of the Person
function getFullNameAndMembershipStatus(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}
app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembershipStatus = getFullNameAndMembershipStatus(person);
  res.json(fullNameAndMembershipStatus);
});

//Endpoind 6: Get Final Price After Discount for Members
function getFinalPrice(cartTotal, isMember) {
  let discount = 0.1;
  if (isMember === true) {
    cartTotal = cartTotal - cartTotal * discount;
  }
  return { finalPrice: cartTotal.toFixed(2) };
}
app.get("/person/final-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json(finalPrice);
});

//Endpoind 7: Get Shipping Cost Based on Cart Total and Membership Status
function getShippingCost(cartTotal, isMember) {
  let shippingCost;
  if (cartTotal > 500 && isMember) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  return { shippingCost: shippingCost.toFixed(2) };
}
app.get("/person/shipping-cost", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.json(getShippingCost(cartTotal, person.isMember));
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
