const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Review = db.define('review', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        enum: [1,2,3,4,5]
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        enum: ['active', 'deleted']
    },
})

module.exports = Review