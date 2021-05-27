const connect = require ('./connect');
const sequelize = connect.sequelize;
const { DataTypes, Model } = require('sequelize');

class User extends Model {}
User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    photo: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
},  {
    sequelize,
    modelName: 'User'
});

class Region extends Model{}
Region.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING
},{
    sequelize,
    modelName:'Region'
});

class Country extends Model {}
Country.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    region: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Country'
});

class City extends Model{}
City.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    country: DataTypes.INTEGER,
    region: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'City'
})


module.exports = {User, Region, Country, City};