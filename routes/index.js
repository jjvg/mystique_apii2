//----dependencias------ 
'use strict'
const express = require('express');
const auth = require('../middlewares/auth');

//----routes------

//---- GESTIONES ------
const gestion_solicitud = require('./gestion_solicitud');

//----TABLAS BASICAS------
const agenda = require('./agenda');
const auditoria = require('./auditoria');
const bloque = require('./bloque');
const calificacion_orden = require('./calificacion_orden');
const calificacion_servicio = require('./calificacion_servicio');
const categoria_parametro = require('./categoria_parametro');
const categoria_servicio = require('./categoria_servicio');
const ciudad = require('./ciudad');
const cliente = require('./cliente');
const comentario = require('./comentario');
const consejo = require('./consejo');
const contacto_negocio = require('./contacto_negocio');
const criterio = require('./criterio');
const descripcion_negocio = require('./descripcion_negocio');
const funcion = require('./funcion');

const negocio = require('./negocio');
const objetivo = require('./objetivo');
const parametro = require('./parametro');
const perfil = require('./perfil');
const promocion = require('./promocion');
const red_social = require('./red_social');
const reclamos_realizados = require('./vista_reclamos_realizados');
const rol = require('./rol');
const rol_funcion = require('./rol_funcion');
const servicio = require('./servicio');
const suscripcion = require('./suscripcion');
const tipo_parametro = require('./tipo_parametro');
const tipo_servicio = require('./tipo_servicio');
const titulo_seccion = require('./titulo_seccion');
const usuario = require('./usuario');
const vista_clientes = require('./vista_cliente');
const vista_presupuesto = require('./vista_presupuesto');
const vista_respuesta_presupuesto = require('./vista_respuesta_presupuesto');
const vista_respuesta_solicitud = require('./vista_respuesta_solicitud');
const vista_servicios_categoria = require('./vista_servicios_categoria');
const vista_solicitudes = require('./vista_solicitudes');
const detalle_consejo = require('./detalle_consejo');
const detalle_promocion = require('./detalle_promocion');
const detalle_proveedor = require('./detalle_proveedor');
const detalle_servicio = require('./detalle_servicio');
const dia_laborable = require('./dia_laborable');
const especialidad = require('./especialidad');
const estado = require('./estado');
const garantia = require('./garantia');
const orden_servicio = require('./orden_servicio');
const reclamo = require('./reclamo');
const respuesta_comentario = require('./respuesta_comentario');
const respuesta_reclamo = require('./respuesta_reclamo');
const respuesta_solicitud = require('./respuesta_solicitud');
const servicio_solicitado = require('./servicio_solicitado');
const sistema = require('./sistema');
const solicitud = require('./solicitud');
const tipo_reclamo = require('./tipo_reclamo');
const empleado = require('./empleado');
const empleado_asignado = require('./empleado_asignado');


const horario = require('./horario');
const horario_empleado = require('./horario_empleado');
const imagen = require('./imagen');
const incidencia_orden = require('./incidencia_orden');
const incidencia_servicio = require('./incidencia_servicio');
const insumo = require('./insumo');
const insumo_asociado = require('./insumo_asociado');
const insumo_usado = require('./insumo_usado');

const notificacion = require('./notificacion');


const presupuesto = require('./presupuesto');

const proveedor = require('./proveedor');
const razon_incidencia = require('./razon_incidencia');



const respuesta_presupuesto = require('./respuesta_presupuesto');




const servicio_parametro = require('./servicio_parametro');


const tipo_comentario = require('./tipo_comentario');
const tipo_incidencia = require('./tipo_incidencia');
const tipo_insumo = require('./tipo_insumo');
const tipo_notificacion = require('./tipo_notificacion');


const tipo_respuesta_comentario = require('./tipo_respuesta_comentario');
const tipo_respuesta_presupuesto = require('./tipo_respuesta_presupuesto');
const tipo_respuesta_reclamo = require('./tipo_respuesta_reclamo');
const tipo_respuesta_solicitud = require('./tipo_respuesta_solicitud');

const unidad = require('./unidad');

const valor_parametro = require('./valor_parametro');
const v_comentarios = require('./v_comentarios');
const cliente_solicitudes = require('./cliente_solicitudes');
const vista_servicio_solicitado = require('./vista_servicio_solicitado');

//----app------
const app = express();

//---- Rutas Publicas ------
app.use('/',
    //---------
    usuario,
    cliente,
    negocio,
    parametro,
    perfil,
    tipo_parametro,
    categoria_servicio,
    servicio,
    consejo,
    empleado,
    red_social,
    imagen,
    titulo_seccion,
    promocion,
    calificacion_orden,
    calificacion_servicio,
    tipo_servicio,
    rol,
    funcion,
    rol_funcion,
    objetivo,
    contacto_negocio,
    descripcion_negocio,
    agenda,
    auditoria,
    bloque,
    categoria_parametro,
    ciudad,
    comentario,
    criterio,
    vista_clientes,
    reclamos_realizados,
    vista_solicitudes,
    vista_servicios_categoria,
    valor_parametro,
    especialidad,
    sistema,
    estado,
    detalle_consejo,
    detalle_promocion,
    detalle_proveedor,
    detalle_servicio,
    dia_laborable,
    empleado_asignado,
    solicitud,
    orden_servicio,
    servicio_solicitado,
    garantia,
    respuesta_solicitud,
    reclamo,
    tipo_reclamo,
    respuesta_comentario,
    respuesta_reclamo,
    suscripcion,
    usuario,
    cliente,
    negocio,
    parametro,
    perfil,
    tipo_parametro,
    categoria_servicio,
    servicio,
    consejo,
    empleado,
    red_social,
    imagen,
    titulo_seccion,
    promocion,
    calificacion_orden,
    calificacion_servicio,
    tipo_servicio,
    rol,
    funcion,
    rol_funcion,
    objetivo,
    contacto_negocio,
    descripcion_negocio,
    agenda,
    auditoria,
    bloque,
    categoria_parametro,
    ciudad,
    comentario,
    criterio,
    vista_clientes,
    reclamos_realizados,
    vista_solicitudes,
    vista_servicios_categoria,
    vista_respuesta_solicitud,
    vista_presupuesto,
    vista_respuesta_presupuesto,
    usuario,
    cliente,
    negocio,
    parametro,
    perfil,
    tipo_parametro,
    categoria_servicio,
    servicio,
    consejo,
    empleado,
    red_social,
    imagen,
    titulo_seccion,
    promocion,
    calificacion_orden,
    calificacion_servicio,
    tipo_servicio,
    rol,
    funcion,
    rol_funcion,
    objetivo,
    contacto_negocio,
    descripcion_negocio,
    agenda,
    auditoria,
    bloque,
    categoria_parametro,
    ciudad,
    comentario,
    criterio,
    valor_parametro,
    especialidad,
    sistema,
    estado,
    detalle_consejo,
    detalle_promocion,
    detalle_proveedor,
    detalle_servicio,
    dia_laborable,
    empleado_asignado,
    solicitud,
    orden_servicio,
    servicio_solicitado,
    garantia,
    respuesta_solicitud,
    reclamo,
    tipo_reclamo,
    respuesta_comentario,
    respuesta_reclamo,
    horario,
    horario_empleado,
    incidencia_orden,
    incidencia_servicio,
    insumo,
    insumo_asociado,
    insumo_usado,
    notificacion,
    presupuesto,
    proveedor,
    razon_incidencia,
    respuesta_presupuesto,
    servicio_parametro,
    tipo_comentario,
    tipo_incidencia,
    tipo_insumo,
    tipo_notificacion,
    tipo_respuesta_comentario,
    tipo_respuesta_presupuesto,
    tipo_respuesta_reclamo,
    tipo_respuesta_solicitud,
    unidad,
    v_comentarios,
    cliente_solicitudes,
    vista_servicio_solicitado,

    //---- Gestiones ----
    gestion_solicitud,
);

//---- Tablas Basicas ----
//---- Rutas Privadas ------
// app.use('/',auth,

// );

//----Exportar Rutas------ 
module.exports = app