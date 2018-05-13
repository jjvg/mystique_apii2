'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_clientes')

//----Parametros------
const path = '/vista_clientes'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findClientes)
router.get(`${path}/${id}`,controller.findOneCliente)


module.exports = router;