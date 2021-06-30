const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op } = require("sequelize");
const { jwtValidation, emailValid} = require('../scripts/middlewares');
const { Country, Region } = require('../models');

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

    .get('/', jwtValidation, async (req, res)=>{
        const companies = await models.Company.findAll({
            include:[{
                model: Country,
                as:'companyCountry',
                attributes:['name']
            },
            {
                model:Region,
                as:'companyRegion',
                attributes:['name']
            }],
        });
        if(companies.length>0) return res.status(200).json(companies);
        return res.status(400).json({message:'No companies found'})
    })
    
    .delete('/:id', jwtValidation, async (req, res)=>{
        const id = req.params.id;
        const deleted = await models.Company.destroy({
            where:{id:id}
        });
        if(deleted) return res.status(200).json(deleted);
        return res.status(400).json({message:'Company was not deleted'})
    })

    .post('/', jwtValidation,emailValid, async(req, res)=>{
        const {name, email, phone, address, region, country, city} = req.body;
        const newCompany= await models.Company.create({
            name,
            email,
            phone,
            address,
            region,
            country,
            city
        });
        if(newCompany) return res.status(200).json(newCompany);
        return res.status(400).json({message:'Company was not created'})
    })

    .put('/:id', jwtValidation, emailValid, async (req, res)=>{
        const id = req.params.id;
        const {name, email, phone, address, region, country, city} = req.body;
        const update= await models.Company.update({
            name,
            email,
            phone,
            address,
            region,
            country,
            city
        },
        {
            where:{id:id}
        })
        if(update) return res.status(200).json(update);
        return res.status(400).json({message:'Company was not updated'})

    })



module.exports = router