const express = require('express')
const {getkhmerStudents, createkhmerStudent, khmerStudentById, singlekhmerStudent, photo, updatekhmerStudent, deletekhmerStudent, isAdmin} = require('../controllers/khmerStudent')
// const {createkhmerStudentValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/khmerStudent', getkhmerStudents)
router.get('/khmerStudent/:khmerStudentId', singlekhmerStudent)
router.post('/khmerStudent/new/:userId', createkhmerStudent)
router.put('/khmerStudent/edit/:khmerStudentId', updatekhmerStudent)
router.delete('/khmerStudent/delete/:khmerStudentId', deletekhmerStudent);

// router.get('/khmerStudent/photo/:khmerStudentId', photo);

router.param('userId', userById);
router.param('khmerStudentId', khmerStudentById);

module.exports = router