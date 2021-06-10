const express = require('express');
const router = express.Router();
const models = require('../models');
const { jwtValidation} = require('../scripts/middlewares');
const { route } = require('./locationControllers');

//APP

router.get('/channels', jwtValidation, async (req, res)=>{
    const contactchannels= await models.ContactChannel.findAll();
    if(contactchannels){
        return res.status(200).json(contactchannels)
    }
    return res.status(400).json({message: 'No channels were found'})
})

    .post('/', jwtValidation, async (req, res)=>{
        const {name, lastname, email, company, role, region, country, city, interest}=req.body;
        const newContact = await models.Contact.create({
            name,
            lastname,
            role,
            email,
            company,
            region,
            country,
            city,
            interest
        });
        if(newContact) return res.status(200).json(newContact)
        return res.status(400).json({message: 'Contact could not be created'})
    })

module.exports = router
