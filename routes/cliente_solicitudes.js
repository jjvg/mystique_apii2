//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/cliente_solicitudes')

//----Parametros------
const path = '/cliente_solicitudes'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`, controller.findOneDocument)

module.exports = router;