const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Todo = sequelize.define("Todo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        },
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 1000],
          msg: 'Description cannot exceed 1000 characters'
        }
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDateOrNull(value) {
          // Only validate if value is provided and not empty
          if (value !== null && value !== undefined && value !== '') {
            if (!Date.parse(value)) {
              throw new Error('Please provide a valid date');
            }
          }
        },
        isAfterToday(value) {
          // Only validate if value is provided and not empty
          if (value && value !== '' && new Date(value) < new Date().setHours(0, 0, 0, 0)) {
            throw new Error('Due date cannot be in the past');
          }
        }
      },
      // Convert empty strings to null before validation
      set(value) {
        if (value === '' || value === undefined) {
          this.setDataValue('dueDate', null);
        } else {
          this.setDataValue('dueDate', value);
        }
      }
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
      validate: {
        isIn: {
          args: [['low', 'medium', 'high']],
          msg: 'Priority must be low, medium, or high'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending',
      validate: {
        isIn: {
          args: [['pending', 'in-progress', 'completed']],
          msg: 'Status must be pending, in-progress, or completed'
        }
      }
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'todos',
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['priority']
      },
      {
        fields: ['dueDate']
      }
    ],
    hooks: {
      beforeUpdate: (todo, options) => {
        if (todo.isCompleted && !todo.completedAt) {
          todo.completedAt = new Date();
          todo.status = 'completed';
        } else if (!todo.isCompleted && todo.completedAt) {
          todo.completedAt = null;
          if (todo.status === 'completed') {
            todo.status = 'pending';
          }
        }
      }
    }
  });

  return Todo;
};