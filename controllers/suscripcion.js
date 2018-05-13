//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");

//----dependencias------  
const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const Perfil = require('../models/perfil');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');

//----signup------  
function signUp(req, res) {

    //---- encriptado de contraseña
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(req.body.contrasenia, salt);

    let newUser = {
        id_rol: req.body.id_rol,
        correo: req.body.correo,
        contrasenia: hash,
        ultimo_acceso: null,
        fecha_creacion: req.body.fecha_creacion,
        estatus: 'A',
    }

    Usuario.forge(newUser).save()
        .then(function(usuario) {

            let newClient = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                cedula: req.body.cedula,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                id_ciudad: req.body.id_ciudad,
                fecha_nacimiento: req.body.fecha_nacimiento,
                tipo_cliente: 'p',
                estatus: 'A',
                id_usuario: usuario.id,
            }

            Cliente.forge(newClient).save()
                .then(function(cliente) {

                    if (req.body.perfil) {

                        for (var i = 0; i < req.body.perfil.length; i++) {

                            let newProfile = {
                                id_valor_parametro: req.body.perfil[i],
                                id_cliente: cliente.id,
                                estatus: 'A',
                            }

                            Perfil.forge(newProfile).save()
                                .then(function(perfil) {
                                    console.log('valor parametro guardado')
                                })
                                .catch(function(err) {
                                    console.log(err);
                                });

                        }

                    }
                    //--- Enviar Correo ---
                    //mailer.enviarCorreo(newUser.correo);
                    //--- Respuesta exitosa ---
                    res.status(200).json({ error: false, data: { message: 'Registro exitoso' } });

                })
                .catch(function(err2) {
                    res.status(500).json({ error: true, data: { message: err2.message } });
                });

        })
        .catch(function(err3) {
            res.status(500).json({ error: true, data: { message: err3.message } });
        });
}
//----signin------  
function signIn(req, res) {

    let conditions = { correo: req.body.correo };

    Usuario.forge(conditions).fetch()
        .then(function(usuario) {
            if (!usuario) return res.status(404).send({ message: "El usuario no existe" })

            let isPassword = bcrypt.compareSync(req.body.contrasenia, usuario.get("contrasenia"))
            if (isPassword) {
                res.status(200).send({ error: false, data: { message: "Te has logueado de forma exitosa", token: jwt.createToken(usuario), id: usuario.get("id") } })
            } else {
                res.status(404).send({ error: true, data: { message: "La contraseña es incorrecta" } })
            }
        })
        .catch(function(err) {
            res.status(500).send({ error: true, data: { message: err.message } })
        })

}

//----exports------  
module.exports = {
    signUp,
    signIn
}