Write-Host "Starting Dashboard setup..."

# Check if PostgreSQL is installed
if (-not (Get-Command "psql" -ErrorAction SilentlyContinue)) {
    Write-Host "PostgreSQL is not installed! Please install it and try again."
    exit
}

# Prompt for database credentials
$DB_NAME = Read-Host "Enter database name" 
$DB_USER = Read-Host "Enter database user" 
$PASSWORD = Read-Host "Enter database password" -AsSecureString

# Convert secure password to plain text
$PASSWORD_PLAIN = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($PASSWORD)
)

Write-Host "Creating database and importing data..."
cmd.exe /c "SET PGPASSWORD=$PASSWORD_PLAIN && psql -U $DB_USER -c 'DROP DATABASE IF EXISTS $DB_NAME;'"
cmd.exe /c "SET PGPASSWORD=$PASSWORD_PLAIN && psql -U $DB_USER -c 'CREATE DATABASE $DB_NAME;'"
cmd.exe /c "SET PGPASSWORD=$PASSWORD_PLAIN && psql -U $DB_USER -d $DB_NAME -f init-db.sql"

# Install server dependencies
Write-Host "Installing server dependencies..."
cd server
npm install
cd ..

# Start the server
Write-Host "Starting the server..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server/index.js"

# Install client dependencies
Write-Host "Installing client dependencies..."
cd client
npm install
cd ..

# Start the client
Write-Host "Starting the client..."
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory "client"

Write-Host "Setup complete! Server and client are running."
