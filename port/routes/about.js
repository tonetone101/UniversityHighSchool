const express = require('express')
const {createportabout, getportabouts, portaboutsByUser, photo, portaboutById, singleportabout, updateportabout, deleteportabout, isAdmin} = require('../controllers/portAbout')
// const {createportaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/portabout', getportabouts)
router.get('/portabout/:portaboutId', singleportabout)
router.post('/portabout/new', createportabout )
router.put('/portabout/edit/:portaboutId', updateportabout)
router.delete('/portabout/delete/:portaboutId', deleteportabout);

router.get('/portabout/photo/:portaboutId', photo);

router.param('userId', userById);
router.param('portaboutId', portaboutById);

module.exports = router