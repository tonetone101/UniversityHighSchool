const express = require('express')
const {createkhmerEvent, getkhmerEvents, khmerEventsByUser, photo, khmerEventById, singlekhmerEvent, updatekhmerEvent, deletekhmerEvent, isAdmin} = require('../controllers/khmerEvent')
// const {createkhmerEventValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/khmerEvent', getkhmerEvents)
router.get('/khmerEvent/:khmerEventId', singlekhmerEvent)
router.post('/khmerEvent/new/:userId', createkhmerEvent)
router.put('/khmerEvent/edit/:khmerEventId', updatekhmerEvent)
router.delete('/khmerEvent/delete/:khmerEventId', deletekhmerEvent);

router.get('/khmerEvent/photo/:khmerEventId', photo);

router.param('userId', userById);
router.param('khmerEventId', khmerEventById);

module.exports = router