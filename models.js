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
    country: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'City'
})

class Contact extends Model {}
Contact.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    company: DataTypes.INTEGER,
    region: DataTypes.INTEGER,
    country: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    interest: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Contact'
})

class ContactChannel extends Model {}
ContactChannel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING
},{
    sequelize,
    modelName: 'ContactChannel'
})

class ContactInfo extends Model {}
ContactInfo.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUser: DataTypes.INTEGER,
    idChannel: DataTypes.INTEGER,
    account: DataTypes.STRING,
    prefference: DataTypes.STRING
},{
    sequelize,
    modelName: 'ContactInfo'
})

class Company extends Model {}
Company.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    region: DataTypes.INTEGER,
    country: DataTypes.INTEGER,
    city: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Company'
})

Region.hasMany(Country,{
    as:'countryRegion',
    foreignKey: 'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Country.belongsTo(Region, {
    as:'countryRegion',
    foreignKey: 'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Country.hasMany(City,{
    as:'cityCountry',
    foreignKey: 'country',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

City.belongsTo(Country, {
    as:'cityCountry',
    foreignKey: 'country',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Contact.hasMany(ContactInfo, {
    foreignKey:'idUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ContactInfo.belongsTo(Contact, {
    foreignKey:'idUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ContactChannel.hasMany(ContactInfo, {
    foreignKey:'idChannel',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ContactInfo.belongsTo(ContactChannel, {
    foreignKey:'idChannel',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Region.hasMany(Contact, {
    foreignKey:'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Contact.belongsTo(Region, {
    foreignKey:'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// City.hasMany(Contact, {
//     as:'contactCity',
//     foreignKey:'city',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });

// Contact.belongsTo(City, {
//     as:'contactCity',
//     foreignKey:'city',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });

Country.hasMany(Contact, {
    as:'contactCountry',
    foreignKey:'country',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Contact.belongsTo(Country, {
    as:'contactCountry',
    foreignKey:'country',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

City.hasMany(Contact, {
    as: 'contactCity',
    foreignKey:'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Contact.belongsTo(City, {
    as: 'contactCity',
    foreignKey:'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Company.hasMany(Contact, {
    as:'contactCompany',
    foreignKey:'company',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Contact.belongsTo(Company, {
    as:'contactCompany',
    foreignKey:'company',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


Region.hasMany(Company, {
    foreignKey:'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Company.belongsTo(Region, {
    foreignKey:'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Country.hasMany(Company, {
    foreignKey:'country',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Company.belongsTo(Country, {
    foreignKey:'country',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

City.hasMany(Company, {
    foreignKey:'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Company.belongsTo(City, {
    foreignKey:'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


module.exports = {User, Region, Country, City, ContactChannel, Contact, ContactInfo, Company};