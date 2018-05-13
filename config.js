module.exports = {
    basePath: '/',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: 'miclavedetokens',
    db: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: '5432', //5432
            user: 'postgres',
            password: 'postgres',
            database: 'devmystique',
            charset: 'utf8'
        }
    }
}