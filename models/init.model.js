const Meal = require("./meal.model");
const Restaurant = require("./restaurant.model")
const Review = require("./review.model")
const User = require("./user.model")
const Order = require("./order.model")


const initModel=()=>{
    // 1 Restaurants M reviews
    Restaurant.hasMany(Review);
    Review.belongsTo(Restaurant);

    // 1restarurants M meals 
    Restaurant.hasMany(Meal);
    Meal.belongsTo(Restaurant)

    // 1 users M orders 
    
    User.hasMany(Order);
    Order.belongsTo(User);

    // 1 users M reviews

    User.hasMany(Review);
    Review.belongsTo(User);

    // 1 meals 1 orders
    Meal.hasOne(Order);
    Order.belongsTo(Meal);
}
module.exports= initModel;