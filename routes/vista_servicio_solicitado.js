'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_servicio_solicitado')

//----Parametros------
const path = '/vista_servicio_solicitado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findServicioSolicitado)
router.get(`${path}/${id}`,controller.findOneServicioSolicitado)


module.exports = router;