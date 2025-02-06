const Order = require("../models/Order");
const User = require("../models/User");
const DeliveryCompany = require("../models/DeliveryCompany");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [User, DeliveryCompany],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении заказов" });
    }
};
