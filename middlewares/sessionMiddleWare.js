function checkSessionPermissions(req,res,next) {
        req.isLogged = req.session.username;
        req.isAdmin = req.session.isAdmin;
        next();
}

module.exports = checkSessionPermissions;