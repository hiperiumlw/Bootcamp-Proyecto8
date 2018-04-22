let Cart = require('../class/cart');
let destinationsModel = require('../models/destinationsModel');
let cartController = {};

cartController.addDestination = (req,res,next)=>{
    destinationsModel.getDestinationById(req.params.id,(error,resultado)=>{
        if (error) next();
        else {
            let cart = new Cart(req.session.cart ? req.session.cart : {});
            resultado.dataValues.quantity = 1;
            resultado.dataValues.totalPrice = resultado.dataValues.precio;
            cart.add(resultado.dataValues);
            req.session.cart = cart;
            res.redirect('/');
        }

    })

};

cartController.getShoppingCart = (req,res,next)=>{
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render('shoppingcart/view',{
        title:'Shopping Cart',
        layout:'layout',
        carrito:cart
    })
};

cartController.removeDestination = (req,res,next)=>{
    if (req.session.cart){
        let cart = new Cart(req.session.cart);
        cart.remove(req.params.id);
        req.session.cart = cart;
        res.redirect('/cart');
    }else {
        next();
    }
};

cartController.removeAll = (req,res,next)=>{
    if (req.session.cart){
        let cart = new Cart(req.session.cart);
        cart.removeAll();
        req.session.cart = cart;
        res.redirect('/cart');
    }else {
        next();
    }
};

cartController.removeQuantity = (req,res,next)=>{
    if (req.session.cart){
        let cart = new Cart(req.session.cart);
        cart.removeQuantity(req.params.id);
        req.session.cart = cart;
        res.redirect('/cart');
    }else {
        next();
    }
};

cartController.addQuantity = (req,res,next)=>{
    if (req.session.cart){
        let cart = new Cart(req.session.cart);
        cart.addQuantity(req.params.id);
        req.session.cart = cart;
        res.redirect('/cart');
    }else {
        next();
    }
};


module.exports = cartController;