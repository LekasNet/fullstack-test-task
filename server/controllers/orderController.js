const Order = require("../models/Order");
const User = require("../models/User");
const DeliveryCompany = require("../models/DeliveryCompany");
const sequelize = require("../config/database");

// Получение всех заказов с пользователями и компаниями доставки
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

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [User, DeliveryCompany],
        });

        if (!order) {
            return res.status(404).json({ error: "Заказ не найден" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении заказа" });
    }
};


// Фильтрация заказов по статусу
exports.getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const orders = await Order.findAll({
            where: { status },
            include: [User, DeliveryCompany],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при фильтрации заказов" });
    }
};

// Создание заказа
exports.createOrder = async (req, res) => {
    try {
        const { user_id, amount, delivery_date, delivery_company_id, status } = req.body;
        const order = await Order.create({ user_id, amount, delivery_date, delivery_company_id, status });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: "Ошибка при создании заказа" });
    }
};

// Обновление заказа
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, delivery_date, delivery_company_id, status } = req.body;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ error: "Заказ не найден" });

        await order.update({ amount, delivery_date, delivery_company_id, status });
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: "Ошибка при обновлении заказа" });
    }
};

// Удаление заказа
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ error: "Заказ не найден" });

        await order.destroy();
        res.json({ message: "Заказ удалён" });
    } catch (error) {
        res.status(400).json({ error: "Ошибка при удалении заказа" });
    }
};

// Получение заказов с пагинацией через SQL (limit и offset)
exports.getOrdersWithPagination = async (req, res) => {
    try {
        let { page, limit } = req.query;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * limit;

        const ordersQuery = `
              SELECT 
                o.id, o.amount, o.created_at, o.delivery_date, o.status,
                u.id AS user_id, u.name AS user_name, u.email AS user_email,
                d.id AS delivery_company_id, d.name AS delivery_company_name
              FROM orders o
              JOIN users u ON o.user_id = u.id
              LEFT JOIN delivery_companies d ON o.delivery_company_id = d.id
              ORDER BY o.created_at DESC
              LIMIT ${limit} OFFSET ${offset};
            `;

        const countQuery = `SELECT COUNT(*) AS total FROM orders;`;

        const [orders, metadata] = await sequelize.query(ordersQuery);
        const [countResult] = await sequelize.query(countQuery);
        const total = countResult[0].total;

        // Проверяем, есть ли ещё данные
        const lastRow = offset + orders.length >= total ? total : -1;

        res.json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            lastRow, // ✅ Передаём в ответ
            data: orders,
        });
    } catch (error) {
        console.error("Ошибка при получении заказов с пагинацией:", error);
        res.status(500).json({ error: "Ошибка при получении заказов" });
    }
};


