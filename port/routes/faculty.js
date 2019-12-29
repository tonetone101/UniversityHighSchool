const express = require('express')
const {getportFaculty, createportFaculty, portFacultyById, singleportFaculty, photo, updateportFaculty, deleteportFaculty, isAdmin} = require('../controllers/portFaculty')
// const {createportFacultyValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/portFaculty', getportFaculty)
router.get('/portFaculty/:portFacultyId', singleportFaculty)
router.post('/portFaculty/new/:userId',  createportFaculty)
router.put('/portFaculty/edit/:portFacultyId',  updateportFaculty)
router.delete('/portFaculty/delete/:portFacultyId',  deleteportFaculty);

router.get('/portFaculty/photo/:portFacultyId', photo);

router.param('userId', userById);
router.param('portFacultyId', portFacultyById);

module.exports = router