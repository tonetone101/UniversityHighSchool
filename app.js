const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const morgan = require('morgan')
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true
 }).then(() => console.log('DB connected!!'))


const facultyRoutes = require('./routes/faculty');

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/', facultyRoutes)
app.get('/', (req, res) => {
    res.send('homepage')
})

const port = 5000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})