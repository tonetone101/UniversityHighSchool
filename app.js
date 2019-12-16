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
 const studentRoutes = require('./routes/student')

 const userRoutes = require('./routes/user')



 // middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(expressValidator())

// routes
app.use('/api', imageRoutes)
app.use('/api', facultyRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', carouselRoutes)
app.use('/api', eventRoutes)
app.use('/api', studentRoutes)
app.get('/', (req, res) => {
    res.send('homepage')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT)