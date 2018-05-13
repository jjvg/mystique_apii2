//----dependencias------  
'use strict'
const nodemailer = require('nodemailer');

function enviarCorreo(correoDestino) {

	//---- Configurar Cuenta ------  
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'joseencinoza07@gmail.com', // correo emisor
	    pass: '21125822'                  // contraseña del correo
	  }
	});

	//---- Configurar Msj ------  
	const mensaje = "Hola desde nodejs...";

	//---- Configurar Correo ------  
	const mailOptions = {
	  from: 	'joseencinoza07@gmail.com', //cuenta emisor
	  to: 		correoDestino,     			//cuenta destino
	  subject: 	'Asunto Del Correo',     	//asunto msj
	  text: 	mensaje                     //texto msj
	};

	//---- Enviar Correo  ------  
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email enviado: ' + info.response);
	  }
	});

}

module.exports = { enviarCorreo };

