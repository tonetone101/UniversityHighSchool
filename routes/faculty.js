const express = require('express')
const {getFaculty, createFaculty, facultyById} = require('../controllers/faculty')
const {createFacultyValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');

router = express.Router()

router.get('/faculty', getFaculty)
router.post('/faculty/new', requireSignin, createFaculty, createFacultyValidator)

router.param('facultyId', facultyById);

module.exports = router