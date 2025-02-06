require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Запускаем сервер
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
});
