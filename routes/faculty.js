const express = require('express')
const {getFaculty, createFaculty, facultyById, singleFaculty, photo, updateFaculty, deleteFaculty, isAdmin} = require('../controllers/faculty')
const {createFacultyValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/faculty', getFaculty)
router.get('/faculty/:facultyId', singleFaculty)
router.post('/faculty/new/:userId', requireSignin, createFaculty, createFacultyValidator)
router.put('/faculty/edit/:facultyId', requireSignin, updateFaculty)
router.delete('/faculty/delete/:facultyId', requireSignin, deleteFaculty);

router.get('/faculty/photo/:facultyId', photo);

router.param('userId', userById);
router.param('facultyId', facultyById);

module.exports = router