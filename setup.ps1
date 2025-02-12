Write-Host "Начинаем установку Dashboard..."

# Проверка наличия PostgreSQL
if (-not (Get-Command "psql" -ErrorAction SilentlyContinue)) {
    Write-Host "PostgreSQL не установлен! Установите его и попробуйте снова."
    exit
}

# Настройка базы данных
$DB_NAME = "dashboard_db"
$DB_USER = "postgres"
$PASSWORD = "yourpassword"

Write-Host "Создаем базу данных и импортируем данные..."
cmd.exe /c "SET PGPASSWORD=$PASSWORD && psql -U $DB_USER -c 'DROP DATABASE IF EXISTS $DB_NAME;'"
cmd.exe /c "SET PGPASSWORD=$PASSWORD && psql -U $DB_USER -c 'CREATE DATABASE $DB_NAME;'"
cmd.exe /c "SET PGPASSWORD=$PASSWORD && psql -U $DB_USER -d $DB_NAME -f init-db.sql"

# Установка зависимостей сервера
Write-Host "Устанавливаем зависимости сервера..."
cd server
npm install
cd ..

# Запуск сервера
Write-Host "Запускаем сервер..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server/app.js"

# Установка зависимостей клиента
Write-Host "Устанавливаем зависимости клиента..."
cd client
npm install
cd ..

# Запуск клиента
Write-Host "Запускаем клиент..."
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory "client"

Write-Host "Установка завершена! Сервер и клиент запущены."
