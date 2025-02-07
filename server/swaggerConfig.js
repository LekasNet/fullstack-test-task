const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fullstack Test API",
            version: "1.0.0",
            description: "Документация API для тестового задания Fullstack-разработчика",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/*.js"], // Указываем, где находятся аннотации
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
