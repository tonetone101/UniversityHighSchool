const express = require('express')
const {gethmongStudents, createhmongStudent, hmongStudentById, singlehmongStudent, photo, updatehmongStudent, deletehmongStudent, isAdmin} = require('../controllers/hmongStudent')
// const {createhmongStudentValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/hmongStudent', gethmongStudents)
router.get('/hmongStudent/:hmongStudentId', singlehmongStudent)
router.post('/hmongStudent/new/:userId', createhmongStudent)
router.put('/hmongStudent/edit/:hmongStudentId', updatehmongStudent)
router.delete('/hmongStudent/delete/:hmongStudentId', deletehmongStudent);

// router.get('/hmongStudent/photo/:hmongStudentId', photo);

router.param('userId', userById);
router.param('hmongStudentId', hmongStudentById);

module.exports = router