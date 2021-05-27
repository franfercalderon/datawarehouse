const express = require('express');
// const { Model } = require('sequelize/types');
// const { User } = require('../models');
const router = express.Router();
const models = require ('../models');

//START USERS:

router.post('/users', async (req, res)=>{
        const startUsers =[
            {
                name: 'Franco',
                lastname: 'Fernandez',
                email: 'franco@gmail.com',
                phone: '5491130955758',
                adress: 'Evergreen Ave. 123, Springfield, USA',
                photo: './styles/assets/users/franco.jpg',
                password: 'Password123!',
                isAdmin: true
            },
            {
                name: 'Bonzo',
                lastname: 'Rodriguez',
                email: 'momo@gmail.com',
                phone: '5491130955759',
                adress: 'Evergreen Ave. 123, Springfield, USA',
                photo: './styles/assets/users/bonzo.jpg',
                password: 'Password123!',
                isAdmin: false
            }
        ];

        startUsers.forEach(e=>{
            models.User.create(e)
        });
        res.status(200).json({message:'Starting users created!'})
    })

    //START REGIONS

    .post('/regions', async (req, res)=>{
        const startRegions=[
            {
                name: 'Latin America'
            },
            {
                name: 'North America'
            },
            {
                name: 'Europe'
            },
            {
                name: 'Asia'
            },
            {
                name: 'Africa'
            },
            {
                name: 'Oceania'
            }
        ];
        startRegions.forEach(e=>{
            models.Region.create(e)
        });
        res.status(200).json({message:'Starting regions created!'})
    })

    //START COUNTRIES

    .post('/countries', async (req, res)=>{
        const startCountries= [
            {
                name: 'Argentina',
                region: 1
            },
            {
                name: 'Australia',
                region: 6
            },
            {
                name: 'Chile',
                region: 1
            },
            {
                name: 'China',
                region: 4
            },
            {
                name: 'Colombia',
                region: 1
            },
            {
                name: 'Cuba',
                region: 1
            },
            {
                name: 'Egipto',
                region: 5
            },
            {
                name: 'España',
                region: 3
            },
            {
                name: 'Filipinas',
                region: 4
            },
            {
                name: 'Francia',
                region: 3
            },
            {
                name: 'Italia',
                region: 3
            },
            {
                name: 'Japon',
                region: 4
            },
            {
                name: 'Oman',
                region: 5
            },
            {
                name: 'Peru',
                region: 1
            },
            {
                name: 'Rusia',
                region: 4
            },
            {
                name: 'Sudafrica',
                region: 5
            },
            {
                name: 'Uruguay',
                region: 1
            },
            {
                name: 'Vietnam',
                region: 4
            }
        ];
        startCountries.forEach(e=>{
            models.Country.create(e)
        });
        res.status(200).json({message:'Starting countries created!'})
    })

module.exports = router
