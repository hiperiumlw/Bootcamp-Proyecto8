var errorController = {};

errorController.getErrorPage = (req,res,next)=>{
            res.render('error404',{
                title:'Error Page',
                layout:'layout',
                cliente:req.user,
                carrito:req.session.cart
            });
};

module.exports = errorController;