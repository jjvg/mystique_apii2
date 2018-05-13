'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_respuesta_solicitud')

//----Parametros------
const path = '/vista_respuesta_solicitud'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findFRespuestaSolicitud)
router.get(`${path}/${id}`,controller.findOneRespuestaSolicitud)


module.exports = router;