const express = require('express');
const {
    gethmongLinks,
    createhmongLink,
    hmongLinksByUser,
    hmongLinksById,
    isPoster,
    updatehmongLink,
    deletehmongLink,
    photo,
    singlehmongLink
} = require('../controllers/hmongLinks');

 // const { requireSignin } = require('../controllers/auth');
 const { userById, userPhoto } = require('../../general/controllers/user');
//  const { createLinkValidator } = require('../validator');

const router = express.Router();

router.get('/hmongLinks', gethmongLinks)

// upload routes
router.post('/hmongLink/new/:userId', createhmongLink);
router.get('/hmongLinks/by/:userId', hmongLinksByUser);
router.get('/hmongLink/:linkId', singlehmongLink);
router.put('/hmongLink/:linkId', updatehmongLink);
router.delete('/kherLink/:linkId',  deletehmongLink)


// photo
router.get('/hmongLink/photo/:hmongLinkId', photo, userPhoto);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :uploadId, our app will first execute uploadById()
router.param('hmongLinkId', hmongLinksById);

module.exports = router;
