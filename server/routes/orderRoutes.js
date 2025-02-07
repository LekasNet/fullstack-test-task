const express = require("express");
const {
    getOrders,
    getOrdersByStatus,
    getOrderById,
    getOrdersWithPagination,
    createOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Получить все заказы (только для администратора)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список всех заказов
 *       401:
 *         description: Нет доступа (неавторизованный)
 *       403:
 *         description: Доступ запрещен (только для админа)
 *   post:
 *     summary: Создать заказ (только для авторизованных пользователей)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               delivery_date:
 *                 type: string
 *                 format: date
 *               delivery_company_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, shipped, delivered, cancelled]
 *     responses:
 *       201:
 *         description: Заказ успешно создан
 *       401:
 *         description: Нет доступа
 */
router.get("/", authMiddleware, adminMiddleware, getOrders);
router.post("/", authMiddleware, createOrder);

/**
 * @swagger
 * /api/orders/paginated:
 *   get:
 *     summary: Получить заказы с пагинацией (только для администратора)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы (по умолчанию 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество записей на странице (по умолчанию 10)
 *     responses:
 *       200:
 *         description: Список заказов с пагинацией
 *       401:
 *         description: Нет доступа
 *       403:
 *         description: Доступ запрещен (только для админа)
 */
router.get("/paginated", authMiddleware, adminMiddleware, getOrdersWithPagination);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Получить заказ по ID (только для авторизованных пользователей)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о заказе
 *       401:
 *         description: Нет доступа
 *       404:
 *         description: Заказ не найден
 *   put:
 *     summary: Обновить заказ (только для владельца заказа или администратора)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               delivery_date:
 *                 type: string
 *                 format: date
 *               delivery_company_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Заказ обновлен
 *       401:
 *         description: Нет доступа
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Заказ не найден
 *   delete:
 *     summary: Удалить заказ (только для администратора)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заказ удален
 *       401:
 *         description: Нет доступа
 *       403:
 *         description: Доступ запрещен
 *       404:
 *         description: Заказ не найден
 */
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

/**
 * @swagger
 * /api/orders/status/{status}:
 *   get:
 *     summary: Получить заказы по статусу (только для авторизованных пользователей)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Заказы по статусу
 *       401:
 *         description: Нет доступа
 */
router.get("/status/:status", authMiddleware, getOrdersByStatus);

module.exports = router;
