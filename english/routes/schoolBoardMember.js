const express = require('express')
const {getschoolBoardMember, createschoolBoardMember, schoolBoardMemberById, singleschoolBoardMember, photo, updateschoolBoardMember, deleteschoolBoardMember, isAdmin} = require('../controllers/schoolBoardMembers')
// const {createschoolBoardMemberValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/schoolBoardMember', getschoolBoardMember)
router.get('/schoolBoardMember/:schoolBoardMemberId', singleschoolBoardMember)
router.post('/schoolBoardMember/new/:userId',  createschoolBoardMember)
router.put('/schoolBoardMember/edit/:schoolBoardMemberId',  updateschoolBoardMember)
router.delete('/schoolBoardMember/delete/:schoolBoardMemberId',  deleteschoolBoardMember);

router.get('/schoolBoardMember/photo/:schoolBoardMemberId', photo);

router.param('userId', userById);
router.param('schoolBoardMemberId', schoolBoardMemberById);

module.exports = router