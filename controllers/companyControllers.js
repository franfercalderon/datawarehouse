const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op } = require("sequelize");
const { jwtValidation} = require('../scripts/middlewares');

router.get('/name_:name',jwtValidation, async (req, res)=>{
        const name = req.params.name; 
        const company = await models.Company.findOne({
            where:{name: name}
        })
        if(company) return res.status(200).json(company)
        return res.status(400).json({message: 'No company was found'})
    })
    
    .get('/:input', jwtValidation, async (req, res)=>{
        const input = req.params.input;
        const companies = await models.Company.findAll({
            limit: 5,
            where:{name: {[Op.startsWith]: input}}
        })
        if(companies.length>0) return res.status(200).json(companies);
    })
    //VER COMPANIA POR ID
    
    .get('/:id', jwtValidation, async (req, res)=>{
        const id = req.params.id;
        const company = await models.Company.findOne({
            where: {id: id}
        })
        if (company) return res.status(200).json(company);
        return res.status(400).json({message: 'No company found'})
    })

    



module.exports = router