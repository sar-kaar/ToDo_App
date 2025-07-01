#!/bin/bash

echo "================================"
echo "    TODO APP - SETUP & RUN"
echo "================================"
echo

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed: $(node --version)"

echo
echo "Installing backend dependencies..."
cd "$(dirname "$0")/Todo_App_Backend"
if [ ! -d "node_modules" ]; then
    echo "Installing backend packages..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install backend dependencies"
        exit 1
    fi
else
    echo "Backend dependencies already installed"
fi

echo
echo "Installing frontend dependencies..."
cd "$(dirname "$0")/Todo_App_FrontEnd"
if [ ! -d "node_modules" ]; then
    echo "Installing frontend packages..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "Frontend dependencies already installed"
fi

echo
echo "================================"
echo "    STARTING SERVERS"
echo "================================"
echo

echo "Starting backend server..."
cd "$(dirname "$0")/Todo_App_Backend"
npm start &
BACKEND_PID=$!

echo "Waiting 3 seconds for backend to start..."
sleep 3

echo "Starting frontend server..."
cd "$(dirname "$0")/Todo_App_FrontEnd"
npm run dev &
FRONTEND_PID=$!

echo
echo "================================"
echo "    TODO APP IS RUNNING"
echo "================================"
echo
echo "Backend running on: http://localhost:4000"
echo "Frontend running on: http://localhost:5173"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt signal
trap 'echo "Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait
