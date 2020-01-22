const express = require('express')
const {createkhmerschoolBoardMeeting, getkhmerschoolBoardMeetings, khmerschoolBoardMeetingsByUser, photo, khmerschoolBoardMeetingById, singlekhmerschoolBoardMeeting, updatekhmerschoolBoardMeeting, deletekhmerschoolBoardMeeting, isAdmin} = require('../controllers/khmerschoolBoardMeeting')
// const {createkhmerschoolBoardMeetingValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/khmerschoolBoardMeeting', getkhmerschoolBoardMeetings)
router.get('/khmerschoolBoardMeeting/:khmerschoolBoardMeetingId', singlekhmerschoolBoardMeeting)
router.post('/khmerschoolBoardMeeting/new/:userId', createkhmerschoolBoardMeeting)
router.put('/khmerschoolBoardMeeting/edit/:khmerschoolBoardMeetingId', updatekhmerschoolBoardMeeting)
router.delete('/khmerschoolBoardMeeting/delete/:khmerschoolBoardMeetingId', deletekhmerschoolBoardMeeting);

router.get('/khmerschoolBoardMeeting/photo/:khmerschoolBoardMeetingId', photo);

router.param('userId', userById);
router.param('khmerschoolBoardMeetingId', khmerschoolBoardMeetingById);

module.exports = router