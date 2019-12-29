const express = require('express')
const {getspanishStudents, createspanishStudent, spanishStudentById, singlespanishStudent, photo, updatespanishStudent, deletespanishStudent, isAdmin} = require('../controllers/spanishStudent')
// const {createspanishStudentValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/spanishStudent', getspanishStudents)
router.get('/spanishStudent/:spanishStudentId', singlespanishStudent)
router.post('/spanishStudent/new/:userId', createspanishStudent)
router.put('/spanishStudent/edit/:spanishStudentId', updatespanishStudent)
router.delete('/spanishStudent/delete/:spanishStudentId', deletespanishStudent);

// router.get('/spanishStudent/photo/:spanishStudentId', photo);

router.param('userId', userById);
router.param('spanishStudentId', spanishStudentById);

module.exports = router