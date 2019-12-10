const express = require('express')
const {getRegisters, createRegister, registerById, singleRegister, updateRegister, deleteRegister, isAdmin} = require('../controllers/register')
const {createRegisterValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');

router = express.Router()

router.get('/register', getRegisters)
router.get('/register/:registerId', singleRegister)
router.post('/register/new', requireSignin, createRegister, createRegisterValidator)
router.put('/register/edit/:registerId', requireSignin, updateRegister)
router.delete('/register/delete/:registerId', requireSignin, deleteRegister);

router.param('registerId', registerById);

module.exports = router