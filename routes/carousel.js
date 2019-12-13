const express = require('express')
const {getCarousel, createCarousel, carouselById, singleCarousel, photo1, photo2, photo3, updateCarousel, deleteCarousel, isAdmin} = require('../controllers/carousel')
const {createCarouselValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router = express.Router()

router.get('/carousel', getCarousel)
router.get('/carousel/:carouselId', singleCarousel)
router.post('/carousel/new/:userId', requireSignin, createCarousel, createCarouselValidator)
router.put('/carousel/edit/:carouselId', requireSignin, updateCarousel)
router.delete('/carousel/delete/:carouselId', requireSignin, deleteCarousel);

router.get('/carousel/photo1/:carouselId', photo1);
router.get('/carousel/photo2/:carouselId', photo2);
router.get('/carousel/photo3/:carouselId', photo3);

router.param('carouselId', carouselById);
router.param('userId', userById);

module.exports = router