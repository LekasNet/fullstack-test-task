const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const DeliveryCompany = require("./DeliveryCompany");

const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    amount: { type: DataTypes.NUMERIC(10, 2), allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    delivery_date: { type: DataTypes.DATE },
    delivery_company_id: { type: DataTypes.INTEGER, references: { model: DeliveryCompany, key: "id" } },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
}, {
    tableName: "orders",
    timestamps: false
});

// Устанавливаем связи
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

DeliveryCompany.hasMany(Order, { foreignKey: "delivery_company_id" });
Order.belongsTo(DeliveryCompany, { foreignKey: "delivery_company_id" });

module.exports = Order;
