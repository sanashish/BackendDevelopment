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
  res.status(200).json({ message: "BD4.3_HW2" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Fetch All Recipes by Cuisine
async function filterByCuisine(cuisine) {
  let query = "SELECT * FROM recipes WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { recipes: response };
}
app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let result = await filterByCuisine(cuisine);
    if (result.recipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for cuisine " + cuisine });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch All Recipes by Main Ingredient
async function filterByMainIngredient(main_ingredient) {
  let query = "SELECT * FROM recipes WHERE main_ingredient = ?";
  let response = await db.all(query, [main_ingredient]);
  return { recipes: response };
}
app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  let main_ingredient = req.params.main_ingredient;
  try {
    let result = await filterByMainIngredient(main_ingredient);
    if (result.recipes.length === 0) {
      return res.status(404).json({
        message: "No recipes found for Main Ingredient " + main_ingredient,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch All Recipes by Preparation Time
async function filterByPreparationTime(preparation_time) {
  let query = "SELECT * FROM recipes WHERE preparation_time <= ?";
  let response = await db.all(query, [preparation_time]);
  return { recipes: response };
}
app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  let preparation_time = req.params.preparation_time;
  try {
    let result = await filterByPreparationTime(preparation_time);
    if (result.recipes.length === 0) {
      return res.status(404).json({
        message: "No recipes found with Prepration Time " + preparation_time,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch All Recipes by Difficulty
async function filterByDifficulty(difficulty) {
  let query = "SELECT * FROM recipes WHERE difficulty = ?";
  let response = await db.all(query, [difficulty]);
  return { recipes: response };
}
app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  let difficulty = req.params.difficulty;
  try {
    let result = await filterByDifficulty(difficulty);
    if (result.recipes.length === 0) {
      return res.status(404).json({
        message: "No recipes found with Difficulty " + difficulty,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Fetch All Recipes by Vegetarian Status
async function filterByVegetarian(vegetarian) {
  let query = "SELECT * FROM recipes WHERE vegetarian = ?";
  let response = await db.all(query, [vegetarian]);
  return { recipes: response };
}
app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  let vegetarian = req.params.vegetarian;
  try {
    let result = await filterByVegetarian(vegetarian);
    if (result.recipes.length === 0) {
      return res.status(404).json({
        message: "No recipes found with Vegetarian " + vegetarian,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
