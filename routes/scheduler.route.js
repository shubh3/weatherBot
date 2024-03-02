const express = require('express');
const {updateScheduler} = require('../controller/scheduler.controller');
const router = express.Router();


router.post('/updateScheduler', updateScheduler);

module.exports = router;