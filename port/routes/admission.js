const express = require('express')
const {comment, singleportadmission, createportadmission, getportAdmissions, uncomment, portadmissionById, updateComment, isAdmin} = require('../controllers/portadmission')
// const {createaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/portadmission/comments', getportAdmissions)
router.post('/portadmission/new', createportadmission )
router.get('/portadmission/:portadmissionId', singleportadmission)

router.put('/portadmission/comment', comment);
router.put('/portadmission/uncomment', uncomment);
router.put('/portadmission/updatecomment', updateComment);

router.param('userId', userById);
router.param('portadmissionId', portadmissionById);

module.exports = router