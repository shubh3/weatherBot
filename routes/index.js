const express = require('express');
const userRoute =require('./user.routes');
const schdulerRoute =require('./scheduler.route');

const router = express.Router();
router.use('/user', userRoute)
router.use('/scheduler',schdulerRoute);

module.exports = router;