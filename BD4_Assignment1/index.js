const express = require("express");
let cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4_Assignment1" });
});

// YOUR ENPOINTS GO HERE
// Exercise 1: Get All Restaurants
async function getAllRestaurants() {
  let query = "SELECT * FROM restaurants";
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get("/restaurants", async (req, res) => {
  try {
    let results = await getAllRestaurants();
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: "Restaurants not found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Restaurant by ID
async function getRestaurantById(id) {
  let query = "SELECT * FROM restaurants WHERE id = ?";
  let response = await db.get(query, [id]);
  return { restaurant: response };
}
app.get("/restaurants/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getRestaurantById(id);
    if (results.restaurant.length === 0) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Restaurants by Cuisine
async function getRestaurantsByCuisine(cuisine) {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let results = await getRestaurantsByCuisine(cuisine);
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: "Restaurant not found for cuisine " + cuisine });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Restaurants by Filter
async function getRestaurantByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}
app.get("/restaurants/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let results = await getRestaurantByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury,
    );
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: "No Restaurnt found for the given filter." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Restaurants Sorted by Rating
async function getRestaurantsSortedByRating() {
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
    let results = await getRestaurantsSortedByRating();
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: "No Restaurnt found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Get All Dishes
async function getAllDishes() {
  let query = "SELECT * FROM dishes";
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get("/dishes", async (req, res) => {
  try {
    let results = await getAllDishes();
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: "Dishes not found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Get Dish by ID
async function getDishById(id) {
  let query = "SELECT * FROM dishes WHERE id = ?";
  let response = await db.get(query, [id]);
  return { dish: response };
}
app.get("/dishes/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getDishById(id);
    if (results.dish.length === 0) {
      return res.status(404).json({ message: "Dish not found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get Dishes by Filter
async function getDishByFilter(isVeg) {
  let query = "SELECT * FROM dishes WHERE isVeg = ?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}
app.get("/dishes/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let results = await getDishByFilter(isVeg);
    if (results.dishes.length === 0) {
      return res
        .status(404)
        .json({ message: "No Dishes found for the given filter." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get Dishes Sorted by Price
async function getDishesBySortedPrice() {
  let query = "SELECT * FROM dishes ORDER BY price";
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get("/dishes/sort-by-price", async (req, res) => {
  try {
    let results = await getDishesBySortedPrice();
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: "No Dishes found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
