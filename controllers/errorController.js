var errorController = {};

errorController.getErrorPage = (req,res,next)=>{
            res.render('error404',{
                title:'Error Page',
                layout:'layout',
                isLogged:req.session.username,
                isAdmin:req.session.isAdmin
            });
};

module.exports = errorController;