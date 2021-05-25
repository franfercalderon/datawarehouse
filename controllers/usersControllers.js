const express = require('express');
const router = express.Router();
const models = require('../models');
const {loginValidation, signupValidation, jwtValidation} = require('../scripts/middlewares');

//APP

router.post('/login', loginValidation, async (req, res)=>{
        res.status(200).json({
            success:{
                token: req.token,
                userData: req.userData
            }
        })
    })

module.exports = router