const express = require('express')
const {getportStudents, createportStudent, portStudentById, singleportStudent, photo, updateportStudent, deleteportStudent, isAdmin} = require('../controllers/portStudent')
// const {createportStudentValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/portStudent', getportStudents)
router.get('/portStudent/:portStudentId', singleportStudent)
router.post('/portStudent/new/:userId', createportStudent)
router.put('/portStudent/edit/:portStudentId', updateportStudent)
router.delete('/portStudent/delete/:portStudentId', deleteportStudent);

// router.get('/portStudent/photo/:portStudentId', photo);

router.param('userId', userById);
router.param('portStudentId', portStudentById);

module.exports = router