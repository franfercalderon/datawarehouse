// const { parse } = require('dotenv');
const express = require('express');
const { Region, City, Country, Company, ContactChannel } = require('../models');
const router = express.Router();
const models = require('../models');
const { jwtValidation, emailValid} = require('../scripts/middlewares');
// const { route } = require('./locationControllers');

//APP

router.get('/channels', jwtValidation, async (req, res)=>{
        const contactchannels= await models.ContactChannel.findAll();
        if(contactchannels){
            return res.status(200).json(contactchannels)
        }
        return res.status(400).json({message: 'No channels were found'})
    })

    .post('/', jwtValidation, emailValid, async (req, res)=>{
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

    .get('/offset_:off', jwtValidation, async (req, res)=>{
    
        try{
            const off= parseInt(req.params.off)
            const contacts= await models.Contact.findAll({
                include: [{
                    model: City,
                    as:'contactCity',
                    attributes: ['name'],
                    include:{
                        model: Country,
                        as:'cityCountry',
                        attributes: ['name'],
                        include:{
                            model: Region,
                            as:'countryRegion',
                            attributes:['name']
                        }
                    }},
                    {
                        model: Company,
                        as:'contactCompany',
                        attributes: ['name'],
                }],
                offset: off, 
                limit: 10

              });
            // console.log(contacts)
            if(contacts) return res.status(200).json(contacts);
            return res.status(400).json({message: 'No contacts found'})
        }
        catch(err){
            console.log(err)
        }
    })

    .get('/:id', jwtValidation, async (req, res)=>{
        try{
            const id = req.params.id;
            const contact= await models.Contact.findOne({
                include: [{
                    model: City,
                    as:'contactCity',
                    attributes: ['name'],
                    include:{
                        model: Country,
                        as:'cityCountry',
                        attributes: ['name'],
                        include:{
                            model: Region,
                            as:'countryRegion',
                            attributes:['name']
                        }
                    }},
                    {
                        model: Company,
                        as:'contactCompany',
                        attributes: ['name'],
                }],
                where:{id: id}
              });
            if(contact) return res.status(200).json(contact)
            return res.status(400).json({message: 'Contact was not found'})

        }
        catch(err){
            console.log(err)
        }
    })

    .get('/offset_:off', jwtValidation, async (req, res)=>{
        console.log("caca")
        try{
            const off= parseInt(req.params.off)
            console.log(off)
            const contacts= await models.Contact.findAll({
                include: [
                    {
                        model: Country,
                        as:'contactCountry',
                        attributes: ['name'],
                        include:{
                            model: Region,
                            as:'countryRegion',
                            attributes:['name']
                        }
                    },
                    {
                        model: Company,
                        as:'contactCompany',
                        attributes: ['name'],
                    }],
                offset: off, 
                limit: 10

              });
    
            if(contacts) return res.status(200).json(contacts);
            return res.status(400).json({message: 'No contacts found'})
        }
        catch(err){
            console.log(err)
        }
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

    .get('/contactChannel/:id', jwtValidation, async(req, res)=>{
        const contactId = req.params.id;
        const channels= await models.ContactInfo.findAll({
            include:{
                model: ContactChannel,
                attributes: ['name']
            },
            where:{idUser: contactId}
        })
        if(channels) return res.status(200).json(channels)
    })

    .put('/:id', jwtValidation, async (req, res)=>{
        const contactId = req.params.id;
        const {name, lastname, email, company, role, region, country, city, interest}=req.body;
        const updatedContact = await models.Contact.update({
            name,
            lastname,
            role,
            email,
            company,
            region,
            country,
            city,
            interest
        },
        {
            where:{id: contactId}
        });
        if(updatedContact) return res.status(200).json(updatedContact);
        return res.status(400).json({message: 'Contact was not updated'})
    })

    .delete('/contactChannel/:id', jwtValidation, async (req, res)=>{
        const id = req.params.id;
        const deletedContactCards= await models.ContactInfo.destroy({
            where:{idUser: id}
        });
        if(deletedContactCards) return res.status(200).json(deletedContactCards);
        console.log(deletedContactCards)
        return res.status(400).json({message: 'ContactCards not deleted'})

    })



module.exports = router
