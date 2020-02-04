const express = require('express');
const {
    getportLinks,
    createportLink,
    portLinksByUser,
    portLinksById,
    isPoster,
    updateportLink,
    deleteportLink,
    photo,
    singleportLink
} = require('../controllers/portLinks');

 // const { requireSignin } = require('../controllers/auth');
 const { userById, userPhoto } = require('../../general/controllers/user');
//  const { createLinkValidator } = require('../validator');

const router = express.Router();

router.get('/portLinks', getportLinks)

// upload routes
router.post('/portLink/new/:userId', createportLink);
router.get('/portLinks/by/:userId', portLinksByUser);
router.get('/portLink/:linkId', singleportLink);
router.put('/portLink/:linkId', updateportLink);
router.delete('/kherLink/:linkId',  deleteportLink)


// photo
router.get('/portLink/photo/:portLinkId', photo, userPhoto);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :uploadId, our app will first execute uploadById()
router.param('linkId', portLinksById);

module.exports = router;
