'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });



Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Defining Models 
db.Users = require("./users")(sequelize, Sequelize);
db.Products = require('./products')(sequelize,Sequelize)
db.Categories = require('./categories')(sequelize,Sequelize)
db.Orders = require('./orders')(sequelize,Sequelize)
db.OrderItems = require('./orderItems') (sequelize,Sequelize)


// Realtionship with the models 
db.Categories.hasMany(db.Products);
db.Products.belongsTo(db.Categories)

// Relationship between Products & OrderItems
db.Products.hasMany(db.OrderItems);
db.OrderItems.belongsTo(db.Products)

// relationship between Orders & OrderItems & Users
db.OrderItems.hasMany(db.Orders);
db.Orders.belongsTo(db.OrderItems)
db.Orders.belongsTo(db.Users)

module.exports = db