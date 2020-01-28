const express = require('express')
const {comment, singlespanishadmission, createspanishadmission, getspanishAdmissions, uncomment, spanishadmissionById, updateComment, isAdmin} = require('../controllers/admission')
// const {createaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/spanishadmission/comments', getspanishAdmissions)
router.post('/spanishadmission/new', createspanishadmission )
router.get('/spanishadmission/:spanishadmissionId', singlespanishadmission)

router.put('/spanishadmission/comment', comment);
router.put('/spanishadmission/uncomment', uncomment);
router.put('/spanishadmission/updatecomment', updateComment);

router.param('userId', userById);
router.param('spanishadmissionId', spanishadmissionById);

module.exports = router