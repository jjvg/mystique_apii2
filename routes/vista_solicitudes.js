const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_solicitudes')

//----Parametros------
const path = '/vista_solicitudes'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findSolicitudes)
router.get(`${path}/${id}`,controller.findOneSolicitud)


module.exports = router;