const express = require('express')
const {getportschoolBoardMember, createportschoolBoardMember, portschoolBoardMemberById, singleportschoolBoardMember, photo, updateportschoolBoardMember, deleteportschoolBoardMember, isAdmin} = require('../controllers/portschoolBoardMembers')
// const {createportschoolBoardMemberValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/portschoolBoardMember', getportschoolBoardMember)
router.get('/portschoolBoardMember/:portschoolBoardMemberId', singleportschoolBoardMember)
router.post('/portschoolBoardMember/new/:userId',  createportschoolBoardMember)
router.put('/portschoolBoardMember/edit/:portschoolBoardMemberId',  updateportschoolBoardMember)
router.delete('/portschoolBoardMember/delete/:portschoolBoardMemberId',  deleteportschoolBoardMember);

router.get('/portschoolBoardMember/photo/:portschoolBoardMemberId', photo);

router.param('userId', userById);
router.param('portschoolBoardMemberId', portschoolBoardMemberById);

module.exports = router