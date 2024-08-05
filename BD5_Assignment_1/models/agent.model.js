let { DataTypes, sequelize } = require("../lib");

let agent = sequelize.define("agent", {
  agentId: DataTypes.INTEGER,
  name: DataTypes.TEXT,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { agent };
