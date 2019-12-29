const express = require('express')
const {getspanishCarousel, createspanishCarousel, spanishCarouselById, singlespanishCarousel, photo1, photo2, photo3, updatespanishCarousel, deletespanishCarousel, isAdmin} = require('../controllers/spanishCarousel')
// const {createspanishCarouselValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/spanishCarousel', getspanishCarousel)
router.get('/spanishCarousel/:spanishCarouselId', singlespanishCarousel)
router.post('/spanishCarousel/new/', createspanishCarousel)
router.put('/spanishCarousel/edit/:spanishCarouselId', updatespanishCarousel)
router.delete('/spanishCarousel/delete/:spanishCarouselId', deletespanishCarousel);

router.get('/spanishCarousel/photo1/:spanishCarouselId', photo1);
router.get('/spanishCarousel/photo2/:spanishCarouselId', photo2);
router.get('/spanishCarousel/photo3/:spanishCarouselId', photo3);

router.param('spanishCarouselId', spanishCarouselById);
router.param('userId', userById);

module.exports = router