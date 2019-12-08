const express = require('express')
const {getFaculty, createFaculty, facultyById, singleFaculty, updateFaculty, deleteFaculty, isAdmin} = require('../controllers/faculty')
const {createFacultyValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');

router = express.Router()

router.get('/faculty', getFaculty)
router.get('/faculty/:facultyId', singleFaculty)
router.post('/faculty/new', requireSignin, createFaculty, createFacultyValidator)
router.put('/faculty/edit/:facultyId', requireSignin, isAdmin, updateFaculty)
router.delete('/faculty/delete/:facultyId', requireSignin, isAdmin, deleteFaculty);

router.param('facultyId', facultyById);

module.exports = router