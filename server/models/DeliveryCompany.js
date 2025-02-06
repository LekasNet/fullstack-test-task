const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DeliveryCompany = sequelize.define("DeliveryCompany", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: "delivery_companies",
    timestamps: false
});

module.exports = DeliveryCompany;
