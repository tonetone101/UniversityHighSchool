const express = require('express')
const {createhr, gethrs, hrsByUser, photo, hrById, singlehr, updatehr, deletehr, isAdmin} = require('../controllers/hr')
// const {createhrValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/hr', gethrs)
router.get('/hr/:hrId', singlehr)
router.post('/hr/new/:userId', createhr)
router.put('/hr/edit/:hrId', updatehr)
router.delete('/hr/delete/:hrId', deletehr);

router.get('/hr/photo/:hrId', photo);

router.param('userId', userById);
router.param('hrId', hrById);

module.exports = router