var errorController = {};

errorController.getErrorPage = (req,res,next)=>{
            res.render('error404',{
                title:'Error Page',
                layout:'layout',
                cliente:req.user,
            });
};

module.exports = errorController;