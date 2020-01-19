const express = require('express')
const {createspanishschoolBoardMeeting, getspanishschoolBoardMeetings, spanishschoolBoardMeetingsByUser, photo, spanishschoolBoardMeetingById, singlespanishschoolBoardMeeting, updatespanishschoolBoardMeeting, deletespanishschoolBoardMeeting, isAdmin} = require('../controllers/schoolBoardMeeting')
// const {createspanishschoolBoardMeetingValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/spanishschoolBoardMeeting', getspanishschoolBoardMeetings)
router.get('/spanishschoolBoardMeeting/:spanishschoolBoardMeetingId', singlespanishschoolBoardMeeting)
router.post('/spanishschoolBoardMeeting/new/:userId', createspanishschoolBoardMeeting)
router.put('/spanishschoolBoardMeeting/edit/:spanishschoolBoardMeetingId', updatespanishschoolBoardMeeting)
router.delete('/spanishschoolBoardMeeting/delete/:spanishschoolBoardMeetingId', deletespanishschoolBoardMeeting);

router.get('/spanishschoolBoardMeeting/photo/:spanishschoolBoardMeetingId', photo);

router.param('userId', userById);
router.param('spanishschoolBoardMeetingId', spanishschoolBoardMeetingById);

module.exports = router