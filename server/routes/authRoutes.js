const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: Пользователь зарегистрирован
 */
router.post("/register", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
], register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход, возврат JWT токена
 */
router.post("/login", login);

module.exports = router;
