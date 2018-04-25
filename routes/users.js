var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/register', function (req, res, next) {
    userController.register(req, res, next);
});

router.post('/register', function (req, res, next) {
    userController.postRegister(req, res, next);
});

router.get('/login', function (req, res, next) {
    userController.login(req, res, next);
});

router.get('/login/twitter',(req,res,next)=>{
    userController.loginTwitter(req,res,next);
})

router.get('/auth/twitter/callback',(req,res,next)=>{
    userController.loginTwitterCallback(req,res,next);
})

router.post('/login', function (req, res, next) {
    userController.postLogin(req, res, next);
});


router.get('/logout', function (req, res, next) {
    userController.logOut(req, res, next);
});


module.exports = router;
