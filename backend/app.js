const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
require('dotenv').config()

// routes imports
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoriesRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const brainTreeRoutes = require('./routes/braintree')

// app
const app = express()

// database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', productRoutes)
app.use('/api', brainTreeRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
