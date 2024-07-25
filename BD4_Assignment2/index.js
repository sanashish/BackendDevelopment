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
  res.status(200).json({ message: "BD4_Assignment2" });
});

// YOUR ENPOINTS GO HERE
// Exercise 1: Get All Games
async function getAllGames() {
  let query = "SELECT * FROM games";
  let response = await db.all(query, []);
  return { games: response };
}
app.get("/games", async (req, res) => {
  try {
    let results = await getAllGames();
    if (results.games.length === 0) {
      return res.status(404).json({ message: "No Games found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Game by ID
async function getGameById(id) {
  let query = "SELECT * FROM games WHERE id = ?";
  let response = await db.get(query, [id]);
  return { game: response };
}
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getGameById(id);
    if (results.game.length === 0) {
      return res.status(404).json({ message: "No Game found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Games by Genre
async function getGamesByGenre(genre) {
  let query = "SELECT * FROM games WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { games: response };
}
app.get("/games/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    let results = await getGamesByGenre(genre);
    if (results.games.length === 0) {
      return res
        .status(404)
        .json({ message: "No Games found with Genre " + genre });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Games by Platform
async function getGamesByPlatform(platform) {
  let query = "SELECT * FROM games WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { games: response };
}
app.get("/games/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await getGamesByPlatform(platform);
    if (results.games.length === 0) {
      return res
        .status(404)
        .json({ message: "No Games found with platform " + platform });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Games Sorted by Rating
async function getGamesByRating() {
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { games: response };
}
app.get("/games/sort-by-rating", async (req, res) => {
  try {
    let results = await getGamesByRating();
    if (results.games.length === 0) {
      return res.status(404).json({ message: "No Games found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Get All Players
async function getAllPlayers() {
  let query = "SELECT * FROM players";
  let response = await db.all(query, []);
  return { players: response };
}
app.get("/players", async (req, res) => {
  try {
    let results = await getAllPlayers();
    if (results.players.length === 0) {
      return res.status(404).json({ message: "No Players found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Get Player by ID
async function getPlayerById(id) {
  let query = "SELECT * FROM players WHERE id = ?";
  let response = await db.get(query, [id]);
  return { player: response };
}
app.get("/players/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getPlayerById(id);
    if (results.player.length === 0) {
      return res.status(404).json({ message: "No Player found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get Players by Platform
async function getPlayersByPlatform(platform) {
  let query = "SELECT * FROM players WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { players: response };
}
app.get("/players/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await getPlayersByPlatform(platform);
    if (results.players.length === 0) {
      return res
        .status(404)
        .json({ message: "No Players found with platform " + platform });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get Players Sorted by Rating
async function getPlayersByRating() {
  let query = "SELECT * FROM players ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { players: response };
}
app.get("/players/sort-by-rating", async (req, res) => {
  try {
    let results = await getPlayersByRating();
    if (results.players.length === 0) {
      return res.status(404).json({ message: "No Players found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 10: Get All Tournaments
async function getAllTournaments() {
  let query = "SELECT * FROM tournaments";
  let response = await db.all(query, []);
  return { tournaments: response };
}
app.get("/tournaments", async (req, res) => {
  try {
    let results = await getAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: "No Tournaments found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 11: Get Tournament by ID
async function getTournamentById(id) {
  let query = "SELECT * FROM tournaments WHERE id = ?";
  let response = await db.get(query, [id]);
  return { tournament: response };
}
app.get("/tournaments/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getTournamentById(id);
    if (results.tournament.length === 0) {
      return res.status(404).json({ message: "No Tournament found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 12: Get Tournaments by Game ID
async function getTournamentByGameId(id) {
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  let response = await db.get(query, [id]);
  return { tournaments: response };
}
app.get("/tournaments/game/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getTournamentByGameId(id);
    if (results.tournaments.length === 0) {
      return res
        .status(404)
        .json({ message: "No Tournament found for Game ID " + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 13: Get Tournaments Sorted by Prize Pool
async function getTournamentSortedByPrizePool() {
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = await db.all(query, []);
  return { tournaments: response };
}
app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    let results = await getTournamentSortedByPrizePool();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: "No Tournaments found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
