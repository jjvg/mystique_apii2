'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_servicios_categoria')

//----Parametros------
const path = '/vista_servicios_categoria'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findServiciosCategorias)
router.get(`${path}/${id}`,controller.findOneServicioCategoria)


module.exports = router;