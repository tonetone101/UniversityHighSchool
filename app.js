const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const expressValidator = require('express-validator')
const app = express()
const morgan = require('morgan')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true
 }).then(() => console.log('DB connected!!'))

 mongoose.connection.on('error', err => {
     console.log(`DB connection error: ${err.message}`)
 })

// bringing in my routes
 const facultyRoutes = require('./routes/faculty');
 const authRoutes = require('./routes/auth');
 const imageRoutes = require('./routes/images');
 const carouselRoutes = require('./routes/carousel');
 const eventRoutes = require('./routes/event');
 const registerRoutes = require('./routes/register');
 const userRoutes = require('./routes/user')



 // middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(expressValidator())

// routes
app.use('/', imageRoutes)
app.use('/', facultyRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', carouselRoutes)
app.use('/', eventRoutes)
app.use('/', registerRoutes )
app.get('/', (req, res) => {
    res.send('homepage')
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})