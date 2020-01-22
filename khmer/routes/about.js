const express = require('express')
const {createkhmerabout, getkhmerabouts, khmeraboutsByUser, photo, khmeraboutById, singlekhmerabout, updatekhmerabout, deletekhmerabout, isAdmin} = require('../controllers/khmerAbout')
// const {createkhmeraboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/khmerabout', getkhmerabouts)
router.get('/khmerabout/:khmeraboutId', singlekhmerabout)
router.post('/khmerabout/new', createkhmerabout )
router.put('/khmerabout/edit/:khmeraboutId', updatekhmerabout)
router.delete('/khmerabout/delete/:khmeraboutId', deletekhmerabout);

router.get('/khmerabout/photo/:khmeraboutId', photo);

router.param('userId', userById);
router.param('khmeraboutId', khmeraboutById);

module.exports = router