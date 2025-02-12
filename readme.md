# 📊 Dashboard (Node.js + React + PostgreSQL)

## 📌 Описание проекта
Этот проект представляет собой **Dashboard** с серверной и клиентской частью. Серверная часть построена на **Node.js + Sequelize + PostgreSQL**, а клиентская - на **React + Material UI + Ag-Grid**.

**Шаблон:** Проект использует шаблон [Material Dashboard 2](https://www.creative-tim.com/product/material-dashboard-react) от Creative Tim в качестве дизайн-референса.

---

## 📁 Структура проекта

```
📦 fullstack-test-task
├── 📂 server                     # Серверная часть
│   ├── 📂 controllers            # Контроллеры API
│   ├── 📂 models                 # Модели Sequelize
│   ├── 📂 routes                 # Роуты API
│   ├── 📜 database.js            # Подключение к PostgreSQL
│   ├── 📜 index.js               # Главный файл сервера
│   ├── 📜 hash-passwords.js      # Скрипт для перегенерации хэшей в бд
│   ├── 📜 .env                   # Переменные окружения
│   ├── 📜 package.json           # Зависимости сервера
│
├── 📂 client                     # Клиентская часть (React)
│   ├── 📂 src
│   │   ├── 📂 components         # Компоненты React
│   │   ├── 📂 hooks              # Необходимые хуки
│   │   ├── 📂 styles             # автоматически созданная папка, все рукописные стили прописаны непосредственно в файлах компонентов
│   │   ├── 📂 api                # Файл API для работы с сервером
│   │   ├── 📜 App.js             # Главный компонент
│   │   ├── 📜 index.js           # Точка входа
│   ├── 📜 package.json           # Зависимости клиента
│
├── 📜 init-db.sql                # Скрипт создания и заполнения БД
├── 📜 README.md                  # Документация проекта
├── 📜 setup                      # Скрипт автоматической установки и запуска
├── 📜 setup.ps1                  # Скрипт установки для Windows
```

---

## ✅ Выполненные требования

### **1. Создание базы данных в Postgres**
✔ **База данных создана**  
✔ **Две таблицы связаны через Foreign Key** (`orders` и `users`)  
✔ **Поля разных типов**: `NUMERIC, VARCHAR, DATE, INTEGER`  
✔ **SQL-скрипт `init-db.sql`** добавлен в корень проекта  

### **2. Создание серверной части (Node.js + Sequelize)**
✔ **Используется Node.js**  
✔ **Подключение к PostgreSQL через Sequelize**  
✔ **Реализованы SQL-запросы через `sequelize.query()`**  
✔ **Частичная подгрузка данных (`LIMIT` и `OFFSET`)**  
✔ **REST API реализован:**  
   - `GET /api/orders`
   - `POST /api/orders`
   - `PUT /api/orders/:id`
   - `DELETE /api/orders/:id`  
✔ **Структура файлов соответствует REST-архитектуре** (`models/controllers/routes`)  
✔ **Авторизация через токен добавлена**  

### **3. Клиентская часть (React + Ag-Grid)**
✔ **Используется React + Material UI**  
✔ **Создан Dashboard с боковым меню**  
✔ **Таблицы Ag-Grid для Orders и Users выведены**  
✔ **Добавление, изменение и удаление записей реализовано**  
✔ **Foreign Key обрабатывается при изменении/удалении**  
⚠ **Infinite Loading в Ag-Grid для Orders работает с ошибками**  
✔ **Используется `limit` и `offset` на сервере**  
✔ **Стиль адаптирован под шаблон из Creative Tim**  

---

## 🚀 Запуск проекта

### ~~**1. Автоматический запуск (универсальный скрипт)**~~ В данный момент не работает ввиду ошибки с обработкой psql запросов в PowerShell. Bash скрипт не протестирован.

#### ~~**Linux / MacOS**~~
```sh
chmod +x setup
./setup
```

#### ~~**Windows (PowerShell)**~~
```powershell
Set-ExecutionPolicy Unrestricted -Scope Process
./setup.ps1
```

### **2. Ручная установка (если не используете скрипт)**

#### **Установка зависимостей**
```sh
cd server
npm install

cd ../client
npm install
```

#### **Настройка базы данных**
```sh
cd server
psql -U postgres -f init-db.sql
node ./hash-passwords.js
```

#### **НЕОБХОДИМО поместить .env в папку server, предварительно заменив данные о подключении к бд**
```sh
DB_USER=
DB_PASSWORD=
```

#### **Запуск серверной части**
```sh
cd server
node ./index.js
```

#### **Запуск клиентской части**
```sh
cd client
npm start
```
## Данные для входа
```
login -    admin@example.com
password - defaultPassword123
```
#### Если воникли проблемы со входом:
```sh
cd ./server/
node ./hash-passwords.js
```
---
## Страницы клиентской части

### **Главные страницы**
- **Главная (Dashboard):**  `http://localhost:3000/`
- **Заказы:**  `http://localhost:3000/orders`
- **Пользователи:**  `http://localhost:3000/users`

### **Аутентификация**
- **Вход:** `http://localhost:3000/login`
- **Регистрация:** `http://localhost:3000/register`

### **Документация API (Swagger)**
- `http://localhost:3000/api/docs`

---

## 🔥 Возможные улучшения
- Исправление Infinite Loading в Ag-Grid для Orders
- Добавление анимаций и улучшение UI/UX
- Оптимизация запросов к серверу

---

## 📜 Лицензия
Проект разработан для тестового задания и распространяется без ограничений.

