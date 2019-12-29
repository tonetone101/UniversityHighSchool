const express = require('express')
const {gethmongCarousel, createhmongCarousel, hmongCarouselById, singlehmongCarousel, photo1, photo2, photo3, updatehmongCarousel, deletehmongCarousel, isAdmin} = require('../controllers/hmongCarousel')
// const {createhmongCarouselValidator} = require('../../validator')
//const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/hmongCarousel', gethmongCarousel)
router.get('/hmongCarousel/:hmongCarouselId', singlehmongCarousel)
router.post('/hmongCarousel/new/', createhmongCarousel)
router.put('/hmongCarousel/edit/:hmongCarouselId', updatehmongCarousel)
router.delete('/hmongCarousel/delete/:hmongCarouselId', deletehmongCarousel);

router.get('/hmongCarousel/photo1/:hmongCarouselId', photo1);
router.get('/hmongCarousel/photo2/:hmongCarouselId', photo2);
router.get('/hmongCarousel/photo3/:hmongCarouselId', photo3);

router.param('hmongCarouselId', hmongCarouselById);
router.param('userId', userById);

module.exports = router