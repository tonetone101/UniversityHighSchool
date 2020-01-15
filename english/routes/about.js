const express = require('express')
const {createabout, getabouts, aboutsByUser, photo, aboutById, singleabout, updateabout, deleteabout, isAdmin} = require('../controllers/about')
// const {createaboutValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/about', getabouts)
router.get('/about/:aboutId', singleabout)
router.post('/about/new', createabout )
router.put('/about/edit/:aboutId', updateabout)
router.delete('/about/delete/:aboutId', deleteabout);

router.get('/about/photo/:aboutId', photo);

router.param('userId', userById);
router.param('aboutId', aboutById);

module.exports = router