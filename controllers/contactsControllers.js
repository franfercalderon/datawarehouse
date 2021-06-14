const express = require('express');
const router = express.Router();
const models = require('../models');
const { jwtValidation} = require('../scripts/middlewares');
// const { route } = require('./locationControllers');

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

    .delete('/:id', jwtValidation, async (req, res)=>{
        const id = req.params.id;
        const deletedContact = await models.Contact.destroy({
            where:{id: id}
        });
        if(deletedContact) return res.status(200).json(deletedContact)
        return res.status(400).json({message: 'Contact not deleted'})
    })

    .post('/channels', jwtValidation, async (req, res)=>{
        const {idUser, idChannel, account, prefference} = req.body;
        const newContactChannel = await models.ContactInfo.create({
            idUser,
            idChannel,
            account,
            prefference
        })
        if(newContactChannel) return res.status(200).json(newContactChannel);
        return res.status(400).json({message: 'Contact channel could not be created'})
    })

    .get('/channels/name_:name', jwtValidation, async(req, res)=>{
        const name = req.params.name;
        const channel = await models.ContactChannel.findOne({
            where: {name: name}
        })
        if(channel) return res.status(200).json(channel)
    })

module.exports = router
