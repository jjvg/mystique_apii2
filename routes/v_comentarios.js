'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/v_comentarios')

//----Parametros------
const path = '/v_comentarios'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findFComentarios)
router.get(`${path}/${id}`, controller.findOneComentario)


module.exports = router;