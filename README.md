# 📝 Todo App - Full Stack Application

A modern, responsive Todo application with separate backend and frontend components. Built with Node.js, Express, React, and SQLite.

## 🏗️ Directory Structure

```
ToDo_App/
├── 📁 Todo_App_Backend/          # Backend API Server
│   ├── 📁 controllers/           # Business logic
│   ├── 📁 database/             # SQLite database files
│   ├── 📁 middleware/           # Authentication middleware
│   ├── 📁 models/               # Database models
│   ├── 📁 routes/               # API routes
│   ├── 📁 utils/                # Helper utilities
│   ├── 📄 server.js             # Main server file
│   ├── 📄 package.json          # Backend dependencies
│   └── 📄 .env                  # Environment variables
├── 📁 Todo_App_FrontEnd/        # Frontend React App
│   ├── 📁 src/
│   │   ├── 📁 assets/css/       # Stylesheets
│   │   │   ├── 📄 global.css    # Global styles
│   │   │   ├── 📄 login.css     # Login page styles
│   │   │   └── 📄 todo.css      # Todo page styles
│   │   ├── 📁 pages/            # React components
│   │   │   ├── 📄 LoginPage.jsx # Login/Register page
│   │   │   └── 📄 TodoPage.jsx  # Main todo interface
│   │   ├── 📄 api.js            # API configuration
│   │   ├── 📄 App.jsx           # Main app component
│   │   └── 📄 main.jsx          # React entry point
│   ├── 📄 index.html            # HTML template
│   ├── 📄 package.json          # Frontend dependencies
│   └── 📄 vite.config.js        # Vite configuration
├── 📄 start_app.bat             # Windows startup script
├── 📄 start_app.sh              # Linux/Mac startup script
└── 📄 README.md                 # This file
```

## 🚀 Quick Start

### Option 1: Use Startup Scripts (Recommended)

**Windows:**
```bash
# Simply double-click or run:
start_app.bat
```

**Linux/Mac:**
```bash
# Make executable and run:
chmod +x start_app.sh
./start_app.sh
```

### Option 2: Manual Setup

1. **Install Dependencies:**
   ```bash
   # Backend
   cd Todo_App_Backend
   npm install
   
   # Frontend
   cd ../Todo_App_FrontEnd
   npm install
   ```

2. **Start Backend Server:**
   ```bash
   cd Todo_App_Backend
   npm start
   ```
   Backend runs on: `http://localhost:4000`

3. **Start Frontend Server (in new terminal):**
   ```bash
   cd Todo_App_FrontEnd
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

## 📱 Features

### ✨ User Authentication
- **Register**: Create new account with username/password
- **Login**: Secure authentication with JWT tokens
- **Session Management**: Automatic token handling

### 📋 Todo Management
- **Create Todos**: Add todos with title, description, and due date
- **View Todos**: Clean, organized list of all your todos
- **Delete Todos**: Remove completed or unwanted todos
- **Responsive Design**: Works perfectly on desktop and mobile

### 🛡️ Error Handling
- **Frontend**: User-friendly error messages for all operations
- **Backend**: Comprehensive error handling and logging
- **Network Issues**: Clear messaging when server is unavailable
- **Validation**: Input validation on both client and server

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet-Friendly**: Great experience on tablets
- **Desktop**: Full-featured desktop interface
- **Cross-Browser**: Works on all modern browsers

## 🔧 Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **SQLite**: Database
- **Sequelize**: Database ORM
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **CORS**: Cross-origin requests

### Frontend
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Axios**: HTTP client
- **Day.js**: Date formatting
- **CSS3**: Modern styling with flexbox/grid

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Health Check
- `GET /api/health` - Server health status

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords encrypted with bcrypt
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for specific origins
- **Error Handling**: No sensitive information leaked in errors

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Loading States**: Visual feedback during operations
- **Success Messages**: Confirmation for successful actions
- **Error Messages**: Clear, helpful error messaging
- **Confirmation Dialogs**: Prevent accidental deletions
- **Keyboard Support**: Enter key support for forms

## 🔧 Development

### Backend Development
```bash
cd Todo_App_Backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd Todo_App_FrontEnd
npm run dev  # Vite dev server with hot reload
```

### Environment Variables
Create `.env` file in `Todo_App_Backend/`:
```env
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
DB_DIALECT=sqlite
DB_STORAGE=./database/todo_app.db
```

## 🚀 Production Deployment

1. **Build Frontend:**
   ```bash
   cd Todo_App_FrontEnd
   npm run build
   ```

2. **Configure Environment:**
   - Set `NODE_ENV=production`
   - Use secure JWT secret
   - Configure proper CORS origins

3. **Deploy:**
   - Backend: Deploy to Node.js hosting (Heroku, Railway, etc.)
   - Frontend: Deploy to static hosting (Netlify, Vercel, etc.)
   - Database: Use production database (PostgreSQL, MySQL, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start:**
   - Check if port 4000 is available
   - Verify Node.js is installed
   - Check for missing dependencies

2. **Frontend can't connect:**
   - Ensure backend is running first
   - Check API URL in `src/api.js`
   - Verify CORS configuration

3. **Login not working:**
   - Check browser console for errors
   - Verify backend database is accessible
   - Try creating a new account first

### Getting Help
- Check browser developer console for frontend errors
- Check terminal/console for backend errors
- Verify both servers are running on correct ports

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Happy Todo-ing! 📝✨**
