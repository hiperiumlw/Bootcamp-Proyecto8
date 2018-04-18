var express = require('express');
var router = express.Router();
var emailController = require('../controllers/emailController');
const Email = require('../config/emailConf');

router.get('/activate/:hash',(req,res,next)=>{
    emailController.activate(req,res,next);
});

router.post('/recover',(req,res,next)=>{
    emailController.recover(req,res,next);
});

router.get('/recover/:hash',(req,res,next)=>{
    emailController.checkHash(req,res,next);
});

router.post('/changePass',(req,res,next)=>{
    emailController.changePass(req,res,next);
});

module.exports = router;
