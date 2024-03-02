const express = require('express');
const router = express.Router();
const {getAllUser, changeUserAccessById} = require('../controller/user.controller');

router.get('/getAllUser', getAllUser);
router.put('/userAccess',changeUserAccessById)

module.exports = router;