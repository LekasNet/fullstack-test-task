CREATE DATABASE test_task_db;

\connect test_task_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    birth_date DATE,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP - INTERVAL '1 day')
);

CREATE TABLE delivery_companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP - INTERVAL '1 day'),
    delivery_date DATE,
    delivery_company_id INTEGER REFERENCES delivery_companies(id) ON DELETE SET NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled')) NOT NULL DEFAULT 'pending'
);

-- Insert users
INSERT INTO users (name, email, password_hash, role, birth_date, created_at) VALUES
('Admin', 'admin@example.com', '.', 'admin', '1980-01-01', NOW() - INTERVAL '1 day'),
('Anton', 'anton@example.com', '/8wM0lPH.I7qu4GZzO1Oi', 'user', '1990-05-10', NOW() - INTERVAL '1 day'),
('Maria', 'maria@example.com', '.0pIZ8KKpHLfZZWqUClJqG', 'user', '1985-08-22', NOW() - INTERVAL '1 day'),
('John Doe', 'john@example.com', '.7shg89GhYQfdA2gh34kl', 'user', '1992-03-14', NOW() - INTERVAL '1 day'),
('Alice Smith', 'alice@example.com', '.JKlO89shGfdYH723klA', 'user', '1988-07-19', NOW() - INTERVAL '1 day'),
('Robert Johnson', 'robert@example.com', '.89Dshf74lQGfd7Hj2kA', 'user', '1995-11-25', NOW() - INTERVAL '1 day');

-- Insert delivery companies
INSERT INTO delivery_companies (name, phone) VALUES
('FastDelivery', '+1 (123) 456-7890'),
('ExpressMail', '+1 (987) 654-3210'),
('QuickCourier', '+1 (555) 123-4567');

-- Insert orders
INSERT INTO orders (user_id, amount, delivery_date, delivery_company_id, status, created_at) VALUES
(2, 1500.50, '2024-02-10', 1, 'shipped', NOW() - INTERVAL '1 day'),
(2, 300.00, '2024-02-15', 2, 'pending', NOW() - INTERVAL '1 day'),
(3, 2000.99, '2024-02-08', 3, 'delivered', NOW() - INTERVAL '1 day'),
(3, 450.75, '2024-02-20', NULL, 'cancelled', NOW() - INTERVAL '1 day'),
(4, 799.99, '2024-03-05', 1, 'pending', NOW() - INTERVAL '1 day'),
(5, 1250.00, '2024-03-10', 2, 'shipped', NOW() - INTERVAL '1 day'),
(6, 650.50, '2024-03-15', 3, 'delivered', NOW() - INTERVAL '1 day'),
(6, 920.30, '2024-04-01', NULL, 'cancelled', NOW() - INTERVAL '1 day');
