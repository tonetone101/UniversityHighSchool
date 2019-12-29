const express = require('express')
const {getkhmerFaculty, createkhmerFaculty, khmerFacultyById, singlekhmerFaculty, photo, updatekhmerFaculty, deletekhmerFaculty, isAdmin} = require('../controllers/khmerFaculty')
// const {createkhmerFacultyValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/khmerFaculty', getkhmerFaculty)
router.get('/khmerFaculty/:khmerFacultyId', singlekhmerFaculty)
router.post('/khmerFaculty/new/:userId',  createkhmerFaculty)
router.put('/khmerFaculty/edit/:khmerFacultyId',  updatekhmerFaculty)
router.delete('/khmerFaculty/delete/:khmerFacultyId',  deletekhmerFaculty);

router.get('/khmerFaculty/photo/:khmerFacultyId', photo);

router.param('userId', userById);
router.param('khmerFacultyId', khmerFacultyById);

module.exports = router