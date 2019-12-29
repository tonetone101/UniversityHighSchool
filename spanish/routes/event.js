const express = require('express')
const {createspanishEvent, getspanishEvents, spanishEventsByUser, photo, spanishEventById, singlespanishEvent, updatespanishEvent, deletespanishEvent, isAdmin} = require('../controllers/spanishEvent')
// const {createspanishEventValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/spanishEvent', getspanishEvents)
router.get('/spanishEvent/:spanishEventId', singlespanishEvent)
router.post('/spanishEvent/new/:userId', createspanishEvent)
router.put('/spanishEvent/edit/:spanishEventId', updatespanishEvent)
router.delete('/spanishEvent/delete/:spanishEventId', deletespanishEvent);

router.get('/spanishEvent/photo/:spanishEventId', photo);

router.param('userId', userById);
router.param('spanishEventId', spanishEventById);

module.exports = router