var express = require('express');
var router = express.Router();
var destinationController = require('../controllers/destinationController');
var errorController = require('../controllers/errorController');
let languageController = require('../controllers/languageController');

/* GET home page. */
router.get('/', function(req, res, next) {
    destinationController.getAllDestinationsHome(req,res,next);
});

router.get('/locale/:lang',(req,res,next)=>{
    languageController.changeLanguage(req,res,next);
})

router.get('*',function (req,res,next) {
    errorController.getErrorPage(req,res,next);
});

module.exports = router;
