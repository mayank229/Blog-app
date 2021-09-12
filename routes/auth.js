var express = require('express');
var router = express.Router();

// Importing the middleware and auth controller
const authController = require('../controllers/auth');
const isAuthenticated = require('../middlewares/check-auth');


// POST /auth/login
router.post('/login', (req,res) => {
    authController.postLogin(req,res);
});

// POST /auth/signup
router.post('/signup', (req,res) => {
    authController.postSignup(req,res);
});

// GET /auth/logout
router.get('/logout', isAuthenticated, (req,res) => {
    res.clearCookie('jwt');
    res.status(200).json({ "message":"logged out successfully" })
});

module.exports = router;