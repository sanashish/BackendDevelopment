let { DataTypes, sequelize } = require("../lib");

let track = sequelize.define("track", {
  name: DataTypes.TEXT,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
  release_year: DataTypes.INTEGER,
});

module.exports = { track };
