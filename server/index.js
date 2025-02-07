const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const setupSwagger = require("./swaggerConfig");

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем Swagger
setupSwagger(app);

// Подключаем роуты

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


// Запускаем сервер
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}\nSwagger UI: http://localhost:${PORT}/api-docs`));
});
