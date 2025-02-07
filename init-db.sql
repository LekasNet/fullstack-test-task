-- 1. Создать базу данных
CREATE DATABASE test_task_db;

-- Подключиться к БД
\c test_task_db;

-- 2. Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Таблица компаний-доставщиков
CREATE TABLE delivery_companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

-- 4. Таблица заказов
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    delivery_company_id INTEGER REFERENCES delivery_companies(id) ON DELETE SET NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled')) NOT NULL DEFAULT 'pending'
);

-- 5. Добавляем пользователей (с захешированными паролями)
INSERT INTO users (name, email, password_hash, role, birth_date) VALUES
('Администратор', 'admin@example.com', '.', 'admin', '1980-01-01'),
('Антон', 'anton@example.com', '/8wM0lPH.I7qu4GZzO1Oi', 'user', '1990-05-10'),
('Мария', 'maria@example.com', '.0pIZ8KKpHLfZZWqUClJqG', 'user', '1985-08-22');

-- 6. Добавляем компании-доставщиков
INSERT INTO delivery_companies (name, phone) VALUES
('Доставка+', '+7 (495) 123-45-67'),
('ЭкспрессПочта', '+7 (812) 987-65-43'),
('БыстрыйКурьер', '+7 (343) 222-33-44');

-- 7. Добавляем тестовые заказы (только для пользователей)
INSERT INTO orders (user_id, amount, delivery_date, delivery_company_id, status) VALUES
(2, 1500.50, '2024-02-10', 1, 'shipped'),
(2, 300.00, '2024-02-15', 2, 'pending'),
(3, 2000.99, '2024-02-08', 3, 'delivered'),
(3, 450.75, '2024-02-20', NULL, 'cancelled');
