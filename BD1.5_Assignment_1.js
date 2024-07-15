let express = require("express");
let cors = require("cors");
let app = express();
app.use(cors());
let PORT = 3000;

//Server-side values
let taxRate = 5; //5%
let discountPercetage = 10; //10%
let loyaltyRate = 2; //2 points per 1$

// Endpoint 1: Calculate the total price of items in the cart
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal + newItemPrice;
  res.send(result.toString());
});

//Endpoint 2: Apply a discount based on membership status
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let finalPrice = 0;
  if (isMember.toLowerCase() === "true") {
    finalPrice = cartTotal - cartTotal * (discountPercetage / 100);
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

//Endpoint 3: Calculate tax on the cart total
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * (taxRate / 100);
  res.send(tax.toString());
});

//Endpoint 4: Estimate delivery time based on shipping method
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let noOfDays = 0;
  if (shippingMethod.toLowerCase() === "standard") {
    noOfDays = distance / 50;
  } else if (shippingMethod.toLowerCase() === "express") {
    noOfDays = distance / 100;
  }
  res.send(noOfDays.toString());
});

//Endpoint 5: Calculate the shipping cost based on weight and distance
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
