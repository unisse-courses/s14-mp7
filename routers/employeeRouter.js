const express = require('express');
const router = express.Router();
var reservationController= require("../controllers/reservationController");
const { isLoggedIn, isAdmin } = require('../middlewares/checkAuth');

// Reservations Report route
router.get('/reservations', isLoggedIn, isAdmin, reservationController.getAllReservations);

module.exports = router;
