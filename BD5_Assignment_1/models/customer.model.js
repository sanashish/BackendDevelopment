let { DataTypes, sequelize } = require("../lib");

let customer = sequelize.define("customer", {
  customerId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { customer };
