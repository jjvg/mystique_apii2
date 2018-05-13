'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_presupuesto')

//----Parametros------
const path = '/vista_presupuesto'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findFPresupuestos)
router.get(`${path}/${id}`,controller.findOnePresupuesto)


module.exports = router;