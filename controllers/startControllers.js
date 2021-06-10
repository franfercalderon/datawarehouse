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
                id: 1,
                name: 'Latin America'
            },
            {
                id: 2,
                name: 'North America'
            },
            {
                id:3,
                name: 'Europe'
            },
            {
                id: 4,
                name: 'Asia'
            },
            {
                id: 5,
                name: 'Africa'
            },
            {
                id: 6,
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
                id: 1,
                name: 'Argentina',
                region: 1
            },
            {
                id: 2,
                name: 'Australia',
                region: 6
            },
            {
                id: 3,
                name: 'Chile',
                region: 1
            },
            {
                id: 4,
                name: 'China',
                region: 4
            },
            {
                id: 5,
                name: 'Colombia',
                region: 1
            },
            {
                id: 6,
                name: 'Cuba',
                region: 1
            },
            {
                id: 7,
                name: 'Egipto',
                region: 5
            },
            {
                id: 8,
                name: 'España',
                region: 3
            },
            {
                id: 9,
                name: 'Filipinas',
                region: 4
            },
            {
                id: 10,
                name: 'Francia',
                region: 3
            },
            {
                id: 11,
                name: 'Italia',
                region: 3
            },
            {
                id: 12,
                name: 'Japon',
                region: 4
            },
            {
                id: 13,
                name: 'Oman',
                region: 5
            },
            {
                id: 14,
                name: 'Peru',
                region: 1
            },
            {
                id: 15,
                name: 'Rusia',
                region: 4
            },
            {
                id: 16,
                name: 'Sudafrica',
                region: 5
            },
            {
                id: 17,
                name: 'Uruguay',
                region: 1
            },
            {
                id: 18,
                name: 'Vietnam',
                region: 4
            },
            {
                id: 19,
                name: 'United States',
                region: 2
            }
        ];
        startCountries.forEach(e=>{
            models.Country.create(e)
        });
        res.status(200).json({message:'Starting countries created!'})
    })

    //START CITIES:

    .post('/cities', async (req, res)=>{
        const startCities=[
            {
                name: 'Barcelona',
                country: 8
            },
            {
                name: 'Bariloche',
                country: 1
            },
            {
                name: 'Beijing',
                country: 4
            },
            {
                name: 'Bogota',
                country: 5
            },
            {
                name: 'Buenos Aires',
                country: 1
            },
            {
                name: 'Cairo',
                country: 7
            },
            {
                name: 'Calama',
                country: 3
            },
            {
                name: 'Cape Town',
                country: 16
            },
            {
                name: 'Cartagena',
                country: 5
            },
            {
                name: 'Cicilia',
                country: 11
            },
            {
                name: 'Cordoba',
                country: 1
            },
            {
                name: 'Cuzco',
                country: 14
            },
            {
                name: 'El Nido',
                country: 9
            },
            {
                name: 'Ha Long Bay',
                country: 18
            },
            {
                name: 'Ho Chi Min',
                country: 18
            },
            {
                name: 'Johannesburg',
                country: 16
            },
            {
                name: 'Juliaca',
                country: 14
            },
            {
                name: 'Kyoto',
                country: 12
            },
            {
                name: 'La Habana',
                country: 6
            },
            {
                name: 'Lima',
                country: 14
            },
            {
                name: 'Madrid',
                country: 8
            },
            {
                name: 'Manila',
                country: 9
            },
            {
                name: 'Mascate',
                country: 13
            },
            {
                name: 'Medellin',
                country: 5
            },
            {
                name: 'Melbourne',
                country: 2
            },
            {
                name: 'Mendoza',
                country: 1
            },
            {
                name: 'Milano',
                country: 11
            },
            {
                name: 'Montevideo',
                country: 17
            },
            {
                name: 'Moscow',
                country: 15
            },
            {
                name: 'Paris',
                country: 10
            },
            {
                name: 'Port Barton',
                country: 9
            },
            {
                name: 'Port Douglas',
                country: 2
            },
            {
                name: 'Punta del Este',
                country: 17
            },
            {
                name: 'Roma',
                country: 11
            },
            {
                name: 'Santiago',
                country: 3
            },
            {
                name: 'St. Petersburg',
                country: 15
            },
            {
                name: 'Sydney',
                country: 2
            },
            {
                name: 'Tokio',
                country: 12
            },
            {
                name: 'Toulouse',
                country: 10
            },
            {
                name: 'Ushuaia',
                country: 1
            },
            {
                name: 'Valencia',
                country: 8
            },
            {
                name: 'Valparaiso',
                country: 3
            },
            {
                name: 'Venezia',
                country: 11
            },
            {
                name: 'Wuhan',
                country: 4
            },
            {
                name: 'Chicago',
                country: 19
            },
            {
                name: 'Los Angeles',
                country: 19
            },
            {
                name: 'New York',
                country: 19
            },
            {
                name: 'Seattle',
                country: 19
            }
        ];
        startCities.forEach(e=>{
            models.City.create(e)
        });
        res.status(200).json({message:'Starting cities created!'})
    })

    .post('/channels', async (req, res)=>{
        const startChannels = [
            {
                name: 'Facebook'
            },
            {
                name: 'Instagram'
            },
            {
                name: 'Telegram'
            },
            {
                name: 'WhatsApp'
            }
        ];
        startChannels.forEach(e=>{
            models.ContactChannel.create(e)
        });
        res.status(200).json({message: 'Start Contact Channels created!'})
    })



module.exports = router

