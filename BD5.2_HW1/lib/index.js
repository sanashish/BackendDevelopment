let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5.2_HW1/post.sqlite",
});

module.exports = {
  DataTypes: sq.DataTypes,
  sequelize,
};
