const express = require('express')
const {getStudents, createStudent, studentById, singleStudent, photo, updateStudent, deleteStudent, isAdmin} = require('../controllers/student')
const {createStudentValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/student', getStudents)
router.get('/student/:studentId', singleStudent)
router.post('/student/new/:userId', createStudent, createStudentValidator)
router.put('/student/edit/:studentId', updateStudent)
router.delete('/student/delete/:studentId', deleteStudent);

// router.get('/student/photo/:studentId', photo);

router.param('userId', userById);
router.param('studentId', studentById);

module.exports = router