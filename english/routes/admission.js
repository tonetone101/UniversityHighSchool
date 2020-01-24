const express = require('express')
const {comment, createadmission, getAdmissions, uncomment, admissionById, updateComment, isAdmin} = require('../controllers/admission')
// const {createaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/admission/comments', getAdmissions)
router.post('/admission/new', createadmission )

router.put('/admission/comment', comment);
router.put('/admission/uncomment', uncomment);
router.put('/admission/updatecomment', updateComment);

router.param('userId', userById);
router.param('admissionId', admissionById);

module.exports = router