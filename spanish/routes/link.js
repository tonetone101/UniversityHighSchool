const express = require('express');
const {
    getspanishLinks,
    createspanishLink,
    spanishLinksByUser,
    spanishLinksById,
    isPoster,
    updatespanishLink,
    deletespanishLink,
    photo,
    singlespanishLink
} = require('../controllers/spanishLinks');

 // const { requireSignin } = require('../controllers/auth');
 const { userById, userPhoto } = require('../../general/controllers/user');
//  const { createLinkValidator } = require('../validator');

const router = express.Router();

router.get('/spanishLinks', getspanishLinks)

// upload routes
router.post('/spanishLink/new', createspanishLink);
router.get('/spanishLinks/by/:userId', spanishLinksByUser);
router.get('/spanishLink/:linkId', singlespanishLink);
router.put('/spanishLink/:spanishLinkId', updatespanishLink);
router.delete('/spanishLink/:spanishLinkId',  deletespanishLink)


// photo
router.get('/spanishLink/photo/:spanishLinkId', photo, userPhoto);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :uploadId, our app will first execute uploadById()
router.param('spanishlinkId', spanishLinksById);

module.exports = router;
