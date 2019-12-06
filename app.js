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


 const facultyRoutes = require('./routes/faculty');
 const authRoutes = require('./routes/auth');

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(expressValidator())

app.use('/', facultyRoutes)
app.use('/', authRoutes)
app.get('/', (req, res) => {
    res.send('homepage')
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})