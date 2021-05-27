const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const db = require('./connect');
const models = require ('./models');
const startControllers = require ('./controllers/startControllers');
const userControllers = require('./controllers/usersControllers');
const regionControllers = require('./controllers/regionControllers');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/start', startControllers);
app.use('/users', userControllers);
app.use('/regions', regionControllers);


//RELACIONES TABLAS

models.Region.hasMany(models.Country,{
    foreignKey: 'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
models.Country.belongsTo(models.Region, {
    foreignKey: 'region',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


db.init()
    .then(async () => {

        db.sequelize.sync({ force: false }).then(() => {
            console.log("Database connected");
        }).catch(err => {
            console.log(err);
        });

        app.set("port", process.env.PORT || 3000);
        app.listen(app.get("port"), () => {
            console.log("Server on port", app.get("port"))
        })

    }).catch((err) => {
        console.log('Error connecting with DB', err);
    });
