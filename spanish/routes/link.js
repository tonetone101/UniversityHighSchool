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
router.post('/spanishLink/new/:userId', createspanishLink);
router.get('/spanishLinks/by/:userId', spanishLinksByUser);
router.get('/spanishLink/:spanishlinkId', singlespanishLink);
router.put('/spanishLink/:spanishlinkId', updatespanishLink);
router.delete('/spanishLink/:spanishlinkId',  deletespanishLink)


// photo
router.get('/spanishLink/photo/:spanishlinkId', photo, userPhoto);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :uploadId, our app will first execute uploadById()
router.param('spanishlinkId', spanishLinksById);

module.exports = router;
