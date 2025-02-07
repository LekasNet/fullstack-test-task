const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Нет доступа" });

    try {
        req.user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ error: "Неверный токен" });
    }
};

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Доступ запрещён" });
    }
    next();
};
