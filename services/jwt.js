//----dependencias------  
'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')

//----dependencias------  
const config = require('../config')


//----funcion create token------  
function createToken(user) {
	const payload = {
		sub: user.id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, config.SECRET_TOKEN)
}

//----funcion decode token------ 
function decodeToken(token) {
	const decoded = new Promise((resolve, reject) =>{
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN)
			if(payload.exp < moment().unix()){
				reject({
					status: 401,
					message: 'token expirado'
				})
			}

			resolve(payload.sub)

		}catch(err){
			reject({
				status: 500,
				message: 'invalid token'
			})
		}
	})

	return decoded
}


//----exportar------  
module.exports = {
	createToken,
	decodeToken
} 