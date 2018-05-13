'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_respuesta_presupuesto')

//----Parametros------
const path = '/vista_respuesta_presupuesto'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findRespuestaPresupuestos)
router.get(`${path}/${id}`,controller.findOneRespuestaPresupuesto)


module.exports = router;