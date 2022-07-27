
//configuracao inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const Patient = require('./models/Patient')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//ROTAS DA API
const patientRoutes = require('./routes/patientRoutes')
app.use('/patient', patientRoutes)

//rota inicial /endpoint
app.get('/', (req, res) => {

    res.json({ message: 'ola mundo' })

})

//entregar uma porta 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gqgynra.mongodb.net/bancodaapi?retryWrites=true&w=majority`)

    .then(() => {
        console.log("conectou no banco")
        app.listen(3000)
    })
    .catch((err) => console.log(err))

