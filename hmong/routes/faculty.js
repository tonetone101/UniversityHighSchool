const express = require('express')
const {gethmongFaculty, createhmongFaculty, hmongFacultyById, singlehmongFaculty, photo, updatehmongFaculty, deletehmongFaculty, isAdmin} = require('../controllers/hmongFaculty')
// const {createhmongFacultyValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/hmongFaculty', gethmongFaculty)
router.get('/hmongFaculty/:hmongFacultyId', singlehmongFaculty)
router.post('/hmongFaculty/new/:userId',  createhmongFaculty)
router.put('/hmongFaculty/edit/:hmongFacultyId',  updatehmongFaculty)
router.delete('/hmongFaculty/delete/:hmongFacultyId',  deletehmongFaculty);

router.get('/hmongFaculty/photo/:hmongFacultyId', photo);

router.param('userId', userById);
router.param('hmongFacultyId', hmongFacultyById);

module.exports = router