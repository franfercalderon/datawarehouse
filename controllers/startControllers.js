const express = require('express');
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
                password: 'Password123!',
                isAdmin: true
            },
            {
                name: 'Bonzo',
                lastname: 'Rodriguez',
                email: 'momo@gmail.com',
                phone: '5491130955759',
                adress: 'Evergreen Ave. 123, Springfield, USA',
                password: 'Password123!',
                isAdmin: false
            }
        ];

        startUsers.forEach(e=>{
            models.User.create(e)
        });
        res.status(200).json({message:'Starting users created!'})
    })

module.exports = router
