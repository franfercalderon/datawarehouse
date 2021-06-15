require('dotenv').config();
const jwt= require ('jsonwebtoken');
const jwtKey= process.env.JWTPASSWORD;
const models = require('../models');

//VALIDACION DE CORREO ELECTRONICO

function emailValidation(email) {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/;
    return re.test(email);
};

const emailValid = async (req, res, next) => {
    const {email} = req.body;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/;
    if(re.test(email)){
        next();
    }
    else{
        res.status(400).json({error: 'Email format incorrect'})
    }
}

//VALIDACION DE CONTRASEÑA

function passwordValidation(pass){
    const capitalLetter= /[A-Z]/g;
    const lowercaseLetter= /[a-z]/g;
    const numberCharacter = /[0-9]/g;
    if(pass.match(capitalLetter) && pass.match(lowercaseLetter) && pass.match(numberCharacter) && pass.length>=8){
        return true;
    }
    else{
        return false;
    }
};

//VALIDACIÓN DE LOGIN

const loginValidation = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password){
        res.status(400).json({error: 'Email y contraseña son requeridos'})
    };

    const allow = await userValidation(email, password);
    if (allow){
        req.token = allow.tokenCode;
        req.userData = allow.userData;
        next();
    }
    else{
        res.status(401).json({error: 'Email or password incorrect'})
    }
}

const jwtValidation = (req, res, next)=>{
    const tokenCode = req.headers.authorization.split(' ')[1];
    jwt.verify(tokenCode, jwtKey, (err, decoded)=>{
        if(err){
            res.send('Denied. You are no authorized')
        }
        req.userData = decoded;
        next();
    })
}

const userValidation = async (email, password) => {
    const selectedUser = await models.User.findOne({
        where: {email: email}
    })
    if(selectedUser){
        if (selectedUser.password == password.trim()) {
            const tokenCode = newToken(selectedUser.email, selectedUser.isAdmin);
            const userData = {
                name: selectedUser.name,
                email: selectedUser.email,
                photo: selectedUser.photo,
                isAdmin: selectedUser.isAdmin 
            };

            return {tokenCode, userData};
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

//GENERACION DE NUEVO TOKEN

function newToken (email, isAdmin){
    const payload = {
        user: email,
        admin: isAdmin
    }
    const token = jwt.sign(payload, jwtKey);
    return token
};



module.exports = {loginValidation, jwtValidation, emailValid }