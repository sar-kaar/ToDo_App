const { Sequelize } = require("sequelize");
const path = require("path");

// Database configuration
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_STORAGE || path.join(__dirname, "../database/todo_app.db"),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});

// Import models
const User = require("./user")(sequelize);
const Todo = require("./todo")(sequelize);

// Define associations
User.hasMany(Todo, {
  foreignKey: 'userId',
  as: 'todos',
  onDelete: 'CASCADE'
});

Todo.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = { sequelize, User, Todo };