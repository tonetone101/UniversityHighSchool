const express = require('express')
const {createEvent, getEvents, eventsByUser, photo, eventById, singleEvent, updateEvent, deleteEvent, isAdmin} = require('../controllers/event')
const {createEventValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');

router = express.Router()

router.get('/event', getEvents)
router.get('/event/:eventId', singleEvent)
router.post('/event/new', requireSignin, createEvent, createEventValidator)
router.put('/event/edit/:eventId', requireSignin, updateEvent)
router.delete('/event/delete/:eventId', requireSignin, deleteEvent);

router.get('/event/photo/:eventId', photo);

router.param('eventId', eventById);

module.exports = router