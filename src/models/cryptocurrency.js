'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Cryptocurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Cryptocurrency.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'user'
      })
    }
  }
  Cryptocurrency.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // Reference to users table
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        field: 'user_id'
      },
      coinId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isLength: {
            max: 100,
            msg: 'coinId max length: 100'
          }
        },
        field: 'coin_id'
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
      tableName: 'cryptocurrencies',
      modelName: 'Cryptocurrency',
      underscored: true,
      paranoid: true,
      timestamps: true
    }
  )

  return Cryptocurrency
}
