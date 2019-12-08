const express = require('express')
const {getCarousel, createCarousel, carouselById, singleCarousel, photo, updateCarousel, deleteCarousel, isAdmin} = require('../controllers/carousel')
const {createCarouselValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');

router = express.Router()

router.get('/carousel', getCarousel)
router.get('/carousel/:carouselId', singleCarousel)
router.post('/carousel/new', requireSignin, createCarousel, createCarouselValidator)
router.put('/carousel/edit/:carouselId', requireSignin, updateCarousel)
router.delete('/carousel/delete/:carouselId', requireSignin, deleteCarousel);

router.get('/carousel/photo/:carouselId', photo);

router.param('carouselId', carouselById);

module.exports = router