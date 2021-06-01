const express = require('express');
const router = express.Router();
const models = require('../models');
const {jwtValidation} = require('../scripts/middlewares');

//APP

router.get('/regions', jwtValidation, async (req, res)=>{
        const allRegions = await models.Region.findAll();
        console.log(allRegions);
        if(allRegions){
            return res.status(200).json(allRegions)
        }
        return res.status(400).json({message: 'No regions were found'})
    })

    .get('/countries', jwtValidation, async (req, res)=>{
        const allCountries = await models.Country.findAll();
        // console.log(allRegions);
        if(allCountries){
            return res.status(200).json(allCountries)
        }
        return res.status(400).json({message: 'No countries were found'})
    })

module.exports = router