const bcrypt = require("bcryptjs");
const sequelize = require("./config/database");
const User = require("./models/User");

async function updatePasswords() {
    try {
        const users = await User.findAll();

        for (let user of users) {
            const hash = await bcrypt.hash(user.email + "defaultPassword123", 10);
            await user.update({ password_hash: hash });
            console.log(`Обновлён пароль для ${user.email}`);
        }

        console.log("Пароли обновлены!");
        process.exit();
    } catch (error) {
        console.error("Ошибка при обновлении паролей:", error);
        process.exit(1);
    }
}

sequelize.sync().then(updatePasswords);
