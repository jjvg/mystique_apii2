//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_solicitud')

//----Rutas------ 
router.post('/nuevasolicitud', controller.createDocument);

module.exports = router;