//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/suscripcion')

//----Rutas------ 
router.post('/signin', controller.signIn);
router.post('/signup', controller.signUp);

module.exports = router;