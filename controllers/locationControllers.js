const express = require('express');
const router = express.Router();
const models = require('../models');
const {jwtValidation} = require('../scripts/middlewares');

    // VER TODAS LAS REGIONES

router.get('/regions', jwtValidation, async (req, res)=>{
        const allRegions = await models.Region.findAll();
        if(allRegions){
            return res.status(200).json(allRegions)
        }
        return res.status(400).json({message: 'No regions were found'})
    })

    //VER REGION POR NOMBRE

router.get('/regions/name_:name', jwtValidation, async (req, res)=>{
        const regionName = req.params.name;
        const selectedRegion = await models.Region.findOne({
            where: {name: regionName}
        })
        if (selectedRegion) return res.status(200).json(selectedRegion);
        return res.status(400).json({message: 'No region found'})
    })

    //VER REGION POR ID

router.get('/regions/:id', jwtValidation, async (req, res)=>{
        const id = req.params.id;
        const region = await models.Region.findOne({
            where: {id: id}
        })
        if (region) return res.status(200).json(region);
        return res.status(400).json({message: 'No region found'})
    })

    //VER TODOS LOS PAISES

router.get('/countries', jwtValidation, async (req, res)=>{
        const allCountries = await models.Country.findAll();
        // console.log(allRegions);
        if(allCountries){
            return res.status(200).json(allCountries)
        }
        return res.status(400).json({message: 'No countries were found'})
    })

    //VER PAIS POR NOMBRE

router.get('/countries/name_:name', jwtValidation, async (req, res)=>{
        const countryName = req.params.name;
        const selectedCountry = await models.Country.findOne({
            where: {name: countryName}
        })
        if (selectedCountry) return res.status(200).json(selectedCountry);
        return res.status(400).json({message: 'No country found'})
    })

    
    // router.get('/countries/:id', jwtValidation, async (req, res)=>{
        //         const id = req.params.id;
        //         const selectedCountry = await models.Country.findOne({
            //             where: {id: id}
            //         })
            //         if (selectedCountry) return res.status(200).json(selectedCountry);
            //         return res.status(400).json({message: 'No country found'})
            //     })
            
            
//OBTENER PAIS POR ID DE REGION

router.get('/countries/region_:reg', jwtValidation, async(req, res)=>{
    const region= req.params.reg;
    const selectedCountries = await models.Country.findAll({
        where:{region: region}
    });
    if(selectedCountries.length>0) return res.status(200).json(selectedCountries);
    return res.status(400).json({message:'No countries were found on that region'})
})  
            
//VER PAIS POR ID
router.get('/countries/:id', jwtValidation, async (req, res)=>{
    const id = req.params.id;
    const selectedCountry = await models.Country.findOne({
        where: {id: id}
    })
    if (selectedCountry) return res.status(200).json(selectedCountry);
    return res.status(400).json({message: 'No country found'})
})


    //VER TODAS LAS CIUDADES

// router.get ('/cities', jwtValidation, async (req, res)=>{
//         const allCities = await models.City.findAll();
//         if (allCities){
//             return res.status(200).json(allCities)
//         }
//         return res.status(400).json({message: 'No cities were found'})
//     })

    //VER CIUDADES POR ID PAIS

router.get('/cities/country_:ctry', jwtValidation, async (req, res)=>{
        const ctry= req.params.ctry;
        const selectedCities = await models.City.findAll({
            where:{country: ctry}
        });
        if(selectedCities.length>0) return res.status(200).json(selectedCities);
        return res.status(400).json({message:'No cities were found'})
    })

    //VER CIUDAD POR NOMBRE

router.get('/cities/name_:name', jwtValidation, async (req, res)=>{
        const name= req.params.name;
        const city = await models.City.findOne({
            where:{name: name}
        });
        if (city) return res.status(200).json(city);
        return res.status(400).json({message: 'No city found'})
    })

    .get('/all', jwtValidation, async (req,res)=>{
        const locations = await models.City.findAll({
            include: [{
                model: models.Country,
                as:'cityCountry',
                attributes: ['name'],
                include:{
                    model: models.Region,
                    as:'countryRegion',
                    attributes:['name']
                }}]
            });
            
        if(locations.length>0)return res.status(200).json(locations);
        return res.status(400).json({message: 'No locations found'})
    })


module.exports = router