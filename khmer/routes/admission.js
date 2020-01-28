const express = require('express')
const {comment, singlekhmeradmission, createkhmeradmission, getkhmerAdmissions, uncomment, khmeradmissionById, updateComment, isAdmin} = require('../controllers/admission')
// const {createaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/khmeradmission/comments', getkhmerAdmissions)
router.post('/khmeradmission/new', createkhmeradmission )
router.get('/khmeradmission/:khmeradmissionId', singlekhmeradmission)

router.put('/khmeradmission/comment', comment);
router.put('/khmeradmission/uncomment', uncomment);
router.put('/khmeradmission/updatecomment', updateComment);

router.param('userId', userById);
router.param('khmeradmissionId', khmeradmissionById);

module.exports = router