const express = require('express')
const {createportschoolBoardMeeting, getportschoolBoardMeetings, portschoolBoardMeetingsByUser, photo, portschoolBoardMeetingById, singleportschoolBoardMeeting, updateportschoolBoardMeeting, deleteportschoolBoardMeeting, isAdmin} = require('../controllers/portschoolBoardMeeting')
// const {createportschoolBoardMeetingValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/portschoolBoardMeeting', getportschoolBoardMeetings)
router.get('/portschoolBoardMeeting/:portschoolBoardMeetingId', singleportschoolBoardMeeting)
router.post('/portschoolBoardMeeting/new/:userId', createportschoolBoardMeeting)
router.put('/portschoolBoardMeeting/edit/:portschoolBoardMeetingId', updateportschoolBoardMeeting)
router.delete('/portschoolBoardMeeting/delete/:portschoolBoardMeetingId', deleteportschoolBoardMeeting);

router.get('/portschoolBoardMeeting/photo/:portschoolBoardMeetingId', photo);

router.param('userId', userById);
router.param('portschoolBoardMeetingId', portschoolBoardMeetingById);

module.exports = router