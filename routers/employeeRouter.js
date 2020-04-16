const express = require('express');
const router = express.Router();
var reservationController= require("../controllers/reservationController");
const { isLoggedOut, isLoggedIn } = require('../middlewares/checkAuth');

// Reservations Report route
router.get('/reservations', reservationController.getAllReservations);

module.exports = router;
