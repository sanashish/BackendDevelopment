let express = require("express");
let { sequelize } = require("./lib");
let { track } = require("./models/track.model");
const { Database } = require("sqlite3");

let app = express();

let trackData = [
  {
    id: 1,
    name: "Raabta",
    artist: "Arijit Singh",
    album: "Agent Vinod",
    genre: "Romantic",
    duration: 4,
    release_year: 2012,
  },
  {
    id: 2,
    name: "Naina Da Kya Kasoor",
    artist: "Amit Trivedi",
    album: "Andhadhun",
    genre: "Pop",
    duration: 3,
    release_year: 2018,
  },
  {
    id: 3,
    name: "Ghoomar",
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    genre: "Traditional",
    duration: 3,
    release_year: 2018,
  },
  {
    id: 4,
    name: "Bekhayali",
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    genre: "Rock",
    duration: 6,
    release_year: 2019,
  },
  {
    id: 5,
    name: "Hawa Banke",
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    genre: "Romantic",
    duration: 3,
    release_year: 2019,
  },
  {
    id: 6,
    name: "Ghungroo",
    artist: "Arijit Singh",
    album: "War",
    genre: "Dance",
    duration: 5,
    release_year: 2019,
  },
  {
    id: 7,
    name: "Makhna",
    artist: "Tanishk Bagchi",
    album: "Drive",
    genre: "Hip-Hop",
    duration: 3,
    release_year: 2019,
  },
  {
    id: 8,
    name: "Tera Ban Jaunga",
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    genre: "Romantic",
    duration: 3,
    release_year: 2019,
  },
  {
    id: 9,
    name: "First Class",
    artist: "Arijit Singh",
    album: "Kalank",
    genre: "Dance",
    duration: 4,
    release_year: 2019,
  },
  {
    id: 10,
    name: "Kalank Title Track",
    artist: "Arijit Singh",
    album: "Kalank",
    genre: "Romantic",
    duration: 5,
    release_year: 2019,
  },
];

// Database Seeding API
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(trackData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all tracks
async function fetchAllTracks() {
  let tracks = await track.findAll();
  return { tracks };
}
app.get("/tracks", async (req, res) => {
  try {
    let results = await fetchAllTracks();
    if (results.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch track details by ID
async function fetchTrackById(id) {
  let trackData = await track.findOne({ where: { id: id } });
  return { track: trackData };
}
app.get("/tracks/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchTrackById(id);
    if (result.track === null) {
      return res.status(404).json({ message: "No track found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all tracks by an artist
async function fetchTracksByArtist(artist) {
  let trackData = await track.findAll({ where: { artist: artist } });
  return { tracks: trackData };
}
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let results = await fetchTracksByArtist(artist);
    if (results.tracks.length === 0) {
      return res
        .status(404)
        .json({ message: "No track found by artist " + artist });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the tracks by their release year6
async function sortTracksByReleaseYear(order) {
  let sortedTrack = await track.findAll({ order: [["release_year", order]] });
  return { tracks: sortedTrack };
}
app.get("/tracks/sort/release_year", async (req, res) => {
  try {
    let order = req.query.order;
    let results = await sortTracksByReleaseYear(order);
    if (results.tracks.length === 0) {
      return res.status(404).json({ message: "No track found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
