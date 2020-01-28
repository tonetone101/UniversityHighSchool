const express = require('express')
const {getkhmerschoolBoardMember, createkhmerschoolBoardMember, khmerschoolBoardMemberById, singlekhmerschoolBoardMember, photo, updatekhmerschoolBoardMember, deletekhmerschoolBoardMember, isAdmin} = require('../controllers/khmerschoolBoardMembers')
// const {createkhmerschoolBoardMemberValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/khmerschoolBoardMember', getkhmerschoolBoardMember)
router.get('/khmerschoolBoardMember/:khmerschoolBoardMemberId', singlekhmerschoolBoardMember)
router.post('/khmerschoolBoardMember/new/:userId',  createkhmerschoolBoardMember)
router.put('/khmerschoolBoardMember/edit/:khmerschoolBoardMemberId',  updatekhmerschoolBoardMember)
router.delete('/khmerschoolBoardMember/delete/:khmerschoolBoardMemberId',  deletekhmerschoolBoardMember);

router.get('/khmerschoolBoardMember/photo/:khmerschoolBoardMemberId', photo);

router.param('userId', userById);
router.param('khmerschoolBoardMemberId', khmerschoolBoardMemberById);

module.exports = router