const express = require('express')
const {getportCarousel, createportCarousel, portCarouselById, singleportCarousel, photo1, photo2, photo3, updateportCarousel, deleteportCarousel, isAdmin} = require('../controllers/portCarousel')
// const {createportCarouselValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/portCarousel', getportCarousel)
router.get('/portCarousel/:portCarouselId', singleportCarousel)
router.post('/portCarousel/new/', createportCarousel)
router.put('/portCarousel/edit/:portCarouselId', updateportCarousel)
router.delete('/portCarousel/delete/:portCarouselId', deleteportCarousel);

router.get('/portCarousel/photo1/:portCarouselId', photo1);
router.get('/portCarousel/photo2/:portCarouselId', photo2);
router.get('/portCarousel/photo3/:portCarouselId', photo3);

router.param('portCarouselId', portCarouselById);
router.param('userId', userById);

module.exports = router