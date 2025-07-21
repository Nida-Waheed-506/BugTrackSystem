const { DataTypes} = require('sequelize');
const {db} = require('../config/db');
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
         allowNull: false,
    },
    email: {
          type: DataTypes.STRING,
          allowNull : false,
          unique : true,
          validate : {
             isEmail: true,  
          }
    },
    password: {
          type: DataTypes.STRING,
          allowNull : false,
    },
    user_type: {
           type: DataTypes.STRING,
           allowNull : false,
    },
    mobile_number: {
          type: DataTypes.STRING,
          allowNull: false,
    }

}, {
      tablename: 'Users',
})




module.exports = { User };




