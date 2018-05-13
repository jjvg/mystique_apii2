'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_reclamos_realizados')

//----Parametros------
const path = '/vista_reclamos_realizados'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findReclamos)
router.get(`${path}/${id}`,controller.findOneReclamo)


module.exports = router;