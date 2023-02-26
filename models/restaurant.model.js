const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Restaurant = db.define('restaurant', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
        enum: [1,2,3,4,5]
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        enum: ['active', 'no active']

    }
})

module.exports = Restaurant