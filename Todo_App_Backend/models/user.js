const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_username',
        msg: 'Username already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        len: {
          args: [3, 30],
          msg: 'Username must be between 3 and 30 characters'
        },
        isAlphanumeric: {
          msg: 'Username can only contain letters and numbers'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        name: 'unique_email',
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long'
        }
      },
      set(value) {
        if (value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        }
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['email']
      }
    ]
  });

  // Instance methods
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};