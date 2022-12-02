
const express = require('express')
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv')
const connectDB = require('./config/mongoose')
const products = require('./routes/products')
const notFound = require('./middleware/not-found')

// DB Connection 
require('./config/mongoose')

const app = express()

dotenv.config()

// Middlewares
app.use(express.json())
app.use('/api/v1/products', products)
app.use(notFound)

app.listen(PORT, (err) => {
    if (err) {
        console.log(`There is an error: ${err}`)
        return;
    }

    console.log(`The Server is running on PORT: ${PORT}...`)
})

connectDB()