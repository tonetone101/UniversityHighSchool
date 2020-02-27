const express = require('express')
const {createacademics, getacademicss, academicssByUser, academicsById, singleacademics, updateacademics, deleteacademics, isAdmin} = require('../controllers/academics')
// const {createacademicsValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/academics', getacademicss)
router.get('/academics/:academicsId', singleacademics)
router.post('/academics/new', createacademics )
router.put('/academics/edit/:academicsId', updateacademics)
router.delete('/academics/delete/:academicsId', deleteacademics);

// router.get('/academics/photo/:academicsId', photo);

router.param('userId', userById);
router.param('academicsId', academicsById);

module.exports = router