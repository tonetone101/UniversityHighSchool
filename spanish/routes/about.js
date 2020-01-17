const express = require('express')
const {createspanishabout, getspanishabouts, spanishaboutsByUser, photo, spanishaboutById, singlespanishabout, updatespanishabout, deletespanishabout, isAdmin} = require('../controllers/spanishAbout')
// const {createspanishaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/spanishabout', getspanishabouts)
router.get('/spanishabout/:spanishaboutId', singlespanishabout)
router.post('/spanishabout/new', createspanishabout )
router.put('/spanishabout/edit/:spanishaboutId', updatespanishabout)
router.delete('/spanishabout/delete/:spanishaboutId', deletespanishabout);

router.get('/spanishabout/photo/:spanishaboutId', photo);

router.param('userId', userById);
router.param('spanishaboutId', spanishaboutById);

module.exports = router