const router = require('express').Router();
const userRoutes = require('./userRoutes');
const calendarRoutes = require('./calendarRoutes');

router.use('/users', userRoutes);
router.use('/calendar', calendarRoutes);


module.exports = router;
