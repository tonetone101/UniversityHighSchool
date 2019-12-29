const express = require('express')
const {getkhmerCarousel, createkhmerCarousel, khmerCarouselById, singlekhmerCarousel, photo1, photo2, photo3, updatekhmerCarousel, deletekhmerCarousel, isAdmin} = require('../controllers/khmerCarousel')
// const {createkhmerCarouselValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/khmerCarousel', getkhmerCarousel)
router.get('/khmerCarousel/:khmerCarouselId', singlekhmerCarousel)
router.post('/khmerCarousel/new/', createkhmerCarousel)
router.put('/khmerCarousel/edit/:khmerCarouselId', updatekhmerCarousel)
router.delete('/khmerCarousel/delete/:khmerCarouselId', deletekhmerCarousel);

router.get('/khmerCarousel/photo1/:khmerCarouselId', photo1);
router.get('/khmerCarousel/photo2/:khmerCarouselId', photo2);
router.get('/khmerCarousel/photo3/:khmerCarouselId', photo3);

router.param('khmerCarouselId', khmerCarouselById);
router.param('userId', userById);

module.exports = router