const express = require('express');
const {
    getkhmerLinks,
    createkhmerLink,
    khmerLinksByUser,
    khmerLinksById,
    isPoster,
    updatekhmerLink,
    deletekhmerLink,
    photo,
    singlekhmerLink
} = require('../controllers/khmerLinks');

 // const { requireSignin } = require('../controllers/auth');
 const { userById, userPhoto } = require('../../general/controllers/user');
//  const { createLinkValidator } = require('../validator');

const router = express.Router();

router.get('/khmerLinks', getkhmerLinks)

// upload routes
router.post('/khmerLink/new/:userId', createkhmerLink);
router.get('/khmerLinks/by/:userId', khmerLinksByUser);
router.get('/khmerLink/:linkId', singlekhmerLink);
router.put('/khmerLink/:linkId', updatekhmerLink);
router.delete('/kherLink/:linkId',  deletekhmerLink)


// photo
router.get('/khmerLink/photo/:khmerLinkId', photo, userPhoto);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :uploadId, our app will first execute uploadById()
router.param('khmerLinkId', khmerLinksById);

module.exports = router;
