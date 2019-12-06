const express = require('express')
const {getFaculty, createFaculty, facultyById} = require('../controllers/faculty')

router = express.Router()

router.get('/faculty', getFaculty)
router.post('/faculty/new', createFaculty)

router.param('facultyId', facultyById);

module.exports = router