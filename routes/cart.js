var express = require('express');
var router = express.Router();
let cartController = require('../controllers/cartController');

router.get('/add/:id',(req,res,next)=>{
    cartController.addDestination(req,res,next);
});

router.get('/',(req,res,next)=>{
    cartController.getShoppingCart(req,res,next);
});

router.get('/remove/:id',(req,res,next)=>{
    cartController.removeDestination(req,res,next);
});

router.get('/removeAll',(req,res,next)=>{
    cartController.removeAll(req,res,next);
});

router.get('/removeQuantity/:id',(req,res,next)=>{
    cartController.removeQuantity(req,res,next);
});

router.get('/addQuantity/:id',(req,res,next)=>{
    cartController.addQuantity(req,res,next);
})

module.exports = router;