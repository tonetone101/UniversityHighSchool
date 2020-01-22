const express = require('express')
const {getapplication, createapplication, applicationById, singleapplication, photo, updateapplication, deleteapplication, isAdmin} = require('../controllers/application')
// const {createapplicationValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/application', getapplication)
router.get('/application/:applicationId', singleapplication)
router.post('/application/new/:userId',  createapplication)
router.put('/application/edit/:applicationId',  updateapplication)
router.delete('/application/delete/:applicationId',  deleteapplication);

router.get('/application/photo/:applicationId', photo);

router.param('userId', userById);
router.param('applicationId', applicationById);

module.exports = router