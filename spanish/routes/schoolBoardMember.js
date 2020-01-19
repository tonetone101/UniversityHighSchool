const express = require('express')
const {getspanishschoolBoardMember, createspanishschoolBoardMember, spanishschoolBoardMemberById, singlespanishschoolBoardMember, photo, updatespanishschoolBoardMember, deletespanishschoolBoardMember, isAdmin} = require('../controllers/schoolBoardMembers')
// const {createspanishschoolBoardMemberValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/spanishschoolBoardMember', getspanishschoolBoardMember)
router.get('/spanishschoolBoardMember/:spanishschoolBoardMemberId', singlespanishschoolBoardMember)
router.post('/spanishschoolBoardMember/new/:userId',  createspanishschoolBoardMember)
router.put('/spanishschoolBoardMember/edit/:spanishschoolBoardMemberId',  updatespanishschoolBoardMember)
router.delete('/spanishschoolBoardMember/delete/:spanishschoolBoardMemberId',  deletespanishschoolBoardMember);

router.get('/spanishschoolBoardMember/photo/:spanishschoolBoardMemberId', photo);

router.param('userId', userById);
router.param('spanishschoolBoardMemberId', spanishschoolBoardMemberById);

module.exports = router