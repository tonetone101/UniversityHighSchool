const express = require('express')
const {createportEvent, getportEvents, portEventsByUser, photo, portEventById, singleportEvent, updateportEvent, deleteportEvent, isAdmin} = require('../controllers/portEvent')
// const {createportEventValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/portEvent', getportEvents)
router.get('/portEvent/:portEventId', singleportEvent)
router.post('/portEvent/new/:userId', createportEvent)
router.put('/portEvent/edit/:portEventId', updateportEvent)
router.delete('/portEvent/delete/:portEventId', deleteportEvent);

router.get('/portEvent/photo/:portEventId', photo);

router.param('userId', userById);
router.param('portEventId', portEventById);

module.exports = router