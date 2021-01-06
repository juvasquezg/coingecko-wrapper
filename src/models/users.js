'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (_models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(64),
        unique: true,
        validate: {
          isLength: {
            min: 8,
            max: 64,
            msg: 'username min length: 8 and max length: 64'
          }
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(60)
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(64),
        validate: {
          isLength: {
            max: 64,
            msg: 'firstName max length: 64'
          }
        },
        field: 'first_name'
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(64),
        validate: {
          isLength: {
            max: 64,
            msg: 'lastName max length: 64'
          }
        },
        field: 'last_name'
      },
      fullName: {
        allowNull: true,
        type: DataTypes.STRING(128),
        validate: {
          isLength: {
            max: 128,
            msg: 'fullName max length: 128'
          }
        },
        field: 'full_name'
      },
      preferredCurrency: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['eur', 'ars', 'usd'],
        field: 'preferred_currency'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true,
      paranoid: true,
      timestamps: true
    }
  )

  User.addHook('beforeCreate', 'beforeUpdate', (user) => {
    if (!user.firstName) return
    if (!user.lastName) return
    const fullName = `${user.firstName} ${user.lastName}`

    user.fullName = fullName
  })

  return User
}
