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

// bringing in my english routes
 const facultyRoutes = require('./english/routes/faculty');
 const imageRoutes = require('./english/routes/images');
 const carouselRoutes = require('./english/routes/carousel');
 const eventRoutes = require('./english/routes/event');
 const studentRoutes = require('./english/routes/student')
 const linkRoutes = require('./english/routes/link');
 const partnersRoutes = require('./english/routes/partners');
 const schoolBoardMemberRoutes = require('./english/routes/schoolBoardMember');
 const schoolBoardMeetingRoutes = require('./english/routes/schoolBoardMeeting');
 const applicationRoutes = require('./english/routes/application');
 const aboutRoutes = require('./english/routes/about');
 const admissionRoutes = require('./english/routes/admission');


 // bringing in my spanish routes
 const spanishfacultyRoutes = require('./spanish/routes/faculty');
 const spanishimageRoutes = require('./spanish/routes/images');
 const spanishcarouselRoutes = require('./spanish/routes/carousel');
 const spanisheventRoutes = require('./spanish/routes/event');
 const spanishstudentRoutes = require('./spanish/routes/student')
 const spanishlinkRoutes = require('./spanish/routes/link');
 const spanishpartnersRoutes = require('./spanish/routes/partners');
 const spanishaboutRoutes = require('./spanish/routes/about');
 const spanishschoolBoardMemberRoutes = require('./spanish/routes/schoolBoardMember');
 const spanishschoolBoardMeetingRoutes = require('./spanish/routes/schoolBoardMeeting');
 const spanishapplicationRoutes = require('./spanish/routes/application');
 const spanishadmissionRoutes = require('./spanish/routes/admission');


// bringing in my khmer routes
const khmerfacultyRoutes = require('./khmer/routes/faculty');
const khmerimageRoutes = require('./khmer/routes/images');
const khmercarouselRoutes = require('./khmer/routes/carousel');
const khmereventRoutes = require('./khmer/routes/event');
const khmerstudentRoutes = require('./khmer/routes/student')
const khmerlinkRoutes = require('./khmer/routes/link');
const khmerpartnersRoutes = require('./khmer/routes/partners');
const khmeraboutRoutes = require('./khmer/routes/about');
const khmerschoolBoardMemberRoutes = require('./khmer/routes/schoolBoardMember');
const khmerschoolBoardMeetingRoutes = require('./khmer/routes/schoolBoardMeeting');
const khmerapplicationRoutes = require('./khmer/routes/application');
const khmeradmissionRoutes = require('./khmer/routes/admission');

// bringing in my hmong routes
const hmongfacultyRoutes = require('./hmong/routes/faculty');
const hmongimageRoutes = require('./hmong/routes/images');
const hmongcarouselRoutes = require('./hmong/routes/carousel');
const hmongeventRoutes = require('./hmong/routes/event');
const hmongstudentRoutes = require('./hmong/routes/student')
const hmonglinkRoutes = require('./hmong/routes/link');

// bringing in my port routes
const portfacultyRoutes = require('./port/routes/faculty');
const portimageRoutes = require('./port/routes/images');
const portcarouselRoutes = require('./port/routes/carousel');
const porteventRoutes = require('./port/routes/event');
const portstudentRoutes = require('./port/routes/student')
const portlinkRoutes = require('./port/routes/link');

// general route
const authRoutes = require('./general/routes/auth');
const userRoutes = require('./general/routes/user')

 // middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(expressValidator())

// english routes
app.use('/', imageRoutes)
app.use('/', facultyRoutes)
app.use('/', carouselRoutes)
app.use('/', eventRoutes)
app.use('/', studentRoutes)
app.use('/', linkRoutes);
app.use('/', partnersRoutes);
app.use('/', schoolBoardMemberRoutes);
app.use('/', schoolBoardMeetingRoutes);
app.use('/', aboutRoutes)
app.use('/', applicationRoutes)
app.use('/', admissionRoutes)


// spanish routes
app.use('/', spanishimageRoutes)
app.use('/', spanishfacultyRoutes)
app.use('/', spanishcarouselRoutes)
app.use('/', spanisheventRoutes)
app.use('/', spanishstudentRoutes)
app.use('/', spanishlinkRoutes);
app.use('/', spanishpartnersRoutes);
app.use('/', spanishaboutRoutes)
app.use('/', spanishschoolBoardMemberRoutes);
app.use('/', spanishschoolBoardMeetingRoutes)
app.use('/', spanishapplicationRoutes)
app.use('/', spanishadmissionRoutes)

// khmer routes
app.use('/', khmerimageRoutes)
app.use('/', khmerfacultyRoutes)
app.use('/', khmercarouselRoutes)
app.use('/', khmereventRoutes)
app.use('/', khmerstudentRoutes)
app.use('/', khmerlinkRoutes);
app.use('/', khmerpartnersRoutes);
app.use('/', khmeraboutRoutes)
app.use('/', khmerschoolBoardMemberRoutes);
app.use('/', khmerschoolBoardMeetingRoutes)
app.use('/', khmerapplicationRoutes)
app.use('/', khmeradmissionRoutes)

// hmong routes
app.use('/', hmongimageRoutes)
app.use('/', hmongfacultyRoutes)
app.use('/', hmongcarouselRoutes)
app.use('/', hmongeventRoutes)
app.use('/', hmongstudentRoutes)
app.use('/', hmonglinkRoutes);

// port routes
app.use('/', portimageRoutes)
app.use('/', portfacultyRoutes)
app.use('/', portcarouselRoutes)
app.use('/', porteventRoutes)
app.use('/', portstudentRoutes)
app.use('/', portlinkRoutes);

// general routes
app.use('/', authRoutes)
app.use('/', userRoutes)
// app.get('/', (req, res) => {
//     res.send('hello')
// })

// if in production, express will serve react file
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port);