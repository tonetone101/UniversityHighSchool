const express = require('express')
const {getFaculty} = require('../controllers/faculty')

router = express.Router()

// router.get('/',  (req, res) => {
//     res.send('hello world!')
// })

router.get('/faculty', getFaculty)

module.exports = router