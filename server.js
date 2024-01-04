const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const restaurantRouter = require('./api/routes/restaurantRouter')
const userRouter = require('./api/routes/userRouter')

const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()


///////////////
//Middleware//
//////////////
app.use(cors())
app.use(bodyParser.json())


////////////
//Routers//
///////////
app.use('/api/restaurants', restaurantRouter);
app.use('/api/user', userRouter);


///////////////////
//Required stuff//
//////////////////
async function startServer () {
    try {
        await mongoose.connect(process.env.DATABASE_URI)

        console.log('Connected to database')

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()