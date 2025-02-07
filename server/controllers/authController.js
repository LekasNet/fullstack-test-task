const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// Регистрация
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, birth_date, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email уже используется" });
        }

        const password_hash = await bcrypt.hash(email + password, 10);
        const user = await User.create({ name, email, password_hash, birth_date, role });

        res.status(201).json({ message: "Пользователь зарегистрирован" });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при регистрации" });
    }
};

// Вход
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Неверный email или пароль" });
        }

        const isMatch = await bcrypt.compare(email + password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Неверный email или пароль" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при входе" });
    }
};
