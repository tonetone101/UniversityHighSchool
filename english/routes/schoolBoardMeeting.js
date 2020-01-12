const express = require('express')
const {createschoolBoardMeeting, getschoolBoardMeetings, schoolBoardMeetingsByUser, photo, schoolBoardMeetingById, singleschoolBoardMeeting, updateschoolBoardMeeting, deleteschoolBoardMeeting, isAdmin} = require('../controllers/schoolBoardMeeting')
// const {createschoolBoardMeetingValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/schoolBoardMeeting', getschoolBoardMeetings)
router.get('/schoolBoardMeeting/:schoolBoardMeetingId', singleschoolBoardMeeting)
router.post('/schoolBoardMeeting/new/:userId', createschoolBoardMeeting)
router.put('/schoolBoardMeeting/edit/:schoolBoardMeetingId', updateschoolBoardMeeting)
router.delete('/schoolBoardMeeting/delete/:schoolBoardMeetingId', deleteschoolBoardMeeting);

router.get('/schoolBoardMeeting/photo/:schoolBoardMeetingId', photo);

router.param('userId', userById);
router.param('schoolBoardMeetingId', schoolBoardMeetingById);

module.exports = router