const User = require("../models/User");

// Получение всех пользователей
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении пользователей" });
    }
};

// Создание пользователя
exports.createUser = async (req, res) => {
    try {
        const { name, email, birth_date } = req.body;
        const user = await User.create({ name, email, birth_date });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Ошибка при создании пользователя" });
    }
};

// Обновление пользователя
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, birth_date } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Пользователь не найден" });

        await user.update({ name, email, birth_date });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: "Ошибка при обновлении пользователя" });
    }
};

// Удаление пользователя
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Пользователь не найден" });

        await user.destroy();
        res.json({ message: "Пользователь удалён" });
    } catch (error) {
        res.status(400).json({ error: "Ошибка при удалении пользователя" });
    }
};
