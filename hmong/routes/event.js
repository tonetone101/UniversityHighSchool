const express = require('express')
const {createhmongEvent, gethmongEvents, hmongEventsByUser, photo, hmongEventById, singlehmongEvent, updatehmongEvent, deletehmongEvent, isAdmin} = require('../controllers/hmongEvent')
// const {createhmongEventValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/hmongEvent', gethmongEvents)
router.get('/hmongEvent/:hmongEventId', singlehmongEvent)
router.post('/hmongEvent/new/:userId', createhmongEvent)
router.put('/hmongEvent/edit/:hmongEventId', updatehmongEvent)
router.delete('/hmongEvent/delete/:hmongEventId', deletehmongEvent);

router.get('/hmongEvent/photo/:hmongEventId', photo);

router.param('userId', userById);
router.param('hmongEventId', hmongEventById);

module.exports = router