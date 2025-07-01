@echo off
echo ================================
echo     TODO APP - SETUP AND RUN
echo ================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed: 
node --version

echo.
echo Installing backend dependencies...
cd /d "%~dp0Todo_App_Backend"
if not exist node_modules (
    echo Installing backend packages...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)

echo.
echo Installing frontend dependencies...
cd /d "%~dp0Todo_App_FrontEnd"
if not exist node_modules (
    echo Installing frontend packages...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)

echo.
echo ================================
echo    STARTING SERVERS
echo ================================
echo.
echo Checking if port 4000 is in use...
netstat -ano | findstr :4000 >nul
if %errorlevel% equ 0 (
    echo Port 4000 is in use. Killing existing Node.js processes...
    taskkill /f /im node.exe >nul 2>&1
    timeout /t 2 /nobreak >nul
)

echo Starting backend server...
cd /d "%~dp0Todo_App_Backend"
start "Todo Backend" cmd /k "npm start"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend server...
cd /d "%~dp0Todo_App_FrontEnd"
start "Todo Frontend" cmd /k "npm run dev"

echo.
echo ================================
echo    TODO APP IS STARTING
echo ================================
echo.
echo Backend running on: http://localhost:4000
echo Frontend will run on: http://localhost:5173 (or next available port)
echo.
echo Two terminal windows should have opened.
echo If not, run the following commands manually:
echo.
echo Backend:  cd Todo_App_Backend ^&^& npm start
echo Frontend: cd Todo_App_FrontEnd ^&^& npm run dev
echo.
echo Press any key to exit this script...
pause >nul
