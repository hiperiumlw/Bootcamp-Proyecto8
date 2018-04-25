let languageController = {};

languageController.changeLanguage = (req,res,next)=>{
    // console.log(res.cookie);
    res.cookie(
        'secret-lang',
        req.params.lang
    );
    res.redirect('/');
}

module.exports = languageController;