const express = require('express');
const router = express.Router();
const models = require('../models');
const {loginValidation, signupValidation, jwtValidation, adminValidation} = require('../scripts/middlewares');

//APP

router.post('/login', loginValidation, async (req, res)=>{
        res.status(200).json({
            success:{
                token: req.token,
                userData: req.userData
            }
        })
    })

    .get('/', jwtValidation, adminValidation, async (req, res)=>{
        const users = await models.User.findAll();
        if (users.length>0) return res.status(200).json(users);
        return res.status(400).json({message: 'No users were found'})
    })

    .put('/:id', jwtValidation, adminValidation, async (req, res)=>{
        const id= req.params.id;
        const {name, lastname, email, phone, adress, password, isAdmin}= req.body;
        const updatedUser= await models.User.update({
            name,
            lastname,
            email,
            phone,
            adress,
            password,
            isAdmin
        },{
            where:{id:id}
        });
        if(updatedUser) return res.status(200).json(updatedUser);
        return res.status(400).json({message:'User not updated'})

    })

    .post('/', jwtValidation, adminValidation, async (req, res)=>{
        const {name, lastname, email, phone, adress, password, isAdmin}= req.body;
        const newUser= await models.User.create({
            name,
            lastname,
            email,
            phone,
            adress,
            password,
            isAdmin
        });
        if(newUser) return res.status(200).json(newUser);
        return res.status(400).json({message:'User not created'})
    })

    .delete('/:id', jwtValidation, adminValidation, async (req, res)=>{
        const id = req.params.id;
        const deletedUser= await models.User.destroy({
            where:{id:id}
        });
        if(deletedUser) return res.status(200).json(deletedUser);
        return res.status(400).json({message:'User not deleted'})
    })

module.exports = router