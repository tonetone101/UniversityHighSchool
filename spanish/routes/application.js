const express = require('express')
const {getspanishapplication, createspanishapplication, spanishapplicationById, singlespanishapplication, photo, updatespanishapplication, deletespanishapplication, isAdmin} = require('../controllers/application')
// const {createspanishapplicationValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/spanishapplication', getspanishapplication)
router.get('/spanishapplication/:spanishapplicationId', singlespanishapplication)
router.post('/spanishapplication/new/:userId',  createspanishapplication)
router.put('/spanishapplication/edit/:spanishapplicationId',  updatespanishapplication)
router.delete('/spanishapplication/delete/:spanishapplicationId',  deletespanishapplication);

router.get('/spanishapplication/photo/:spanishapplicationId', photo);

router.param('userId', userById);
router.param('spanishapplicationId', spanishapplicationById);

module.exports = router