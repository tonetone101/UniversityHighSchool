const express = require('express');
const {
    getLinks,
    createLink,
    linksByUser,
    linksById,
    isPoster,
    updateLink,
    deleteLink,
    photo,
    singleLink
} = require('../controllers/links');

 // const { requireSignin } = require('../controllers/auth');
 const { userById, userPhoto } = require('../../general/controllers/user');
 const { createLinkValidator } = require('../../validator');

const router = express.Router();

router.get('/links', getLinks)

// upload routes
router.post('/link/new/:userId', createLink);
router.get('/links/by/:userId', linksByUser);
router.get('/link/:linkId', singleLink);
router.put('/link/:linkId', updateLink);
router.delete('/link/:linkId',  deleteLink)


// photo
router.get('/link/photo/:linkId', photo);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :uploadId, our app will first execute uploadById()
router.param('linkId', linksById);

module.exports = router;
