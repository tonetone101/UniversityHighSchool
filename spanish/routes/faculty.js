const express = require('express')
const {getspanishFaculty, createspanishFaculty, spanishFacultyById, singlespanishFaculty, photo, updatespanishFaculty, deletespanishFaculty, isAdmin} = require('../controllers/spanishFaculty')
// const {createspanishFacultyValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/spanishFaculty', getspanishFaculty)
router.get('/spanishFaculty/:spanishFacultyId', singlespanishFaculty)
router.post('/spanishFaculty/new/:userId',  createspanishFaculty)
router.put('/spanishFaculty/edit/:spanishFacultyId',  updatespanishFaculty)
router.delete('/spanishFaculty/delete/:spanishFacultyId',  deletespanishFaculty);

router.get('/spanishFaculty/photo/:spanishFacultyId', photo);

router.param('userId', userById);
router.param('spanishFacultyId', spanishFacultyById);

module.exports = router