var express = require('express');
var router = express.Router();
var destinationController = require('../controllers/destinationController');
var userController = require('../controllers/userController');
var emailController = require('../controllers/emailController');
var upload = require('../config/multer');


router.get('/adminpanel',function (req,res,next) {
    destinationController.getAllDestinationsAdmin(req,res,next);
});

router.post('/adminpanel/crear',upload.single('file'),function (req,res,next) {
    // console.log(req.file);
    destinationController.createDestination(req,res,next);
});

router.get('/adminpanel/borrar/:id',function (req,res,next) {
    destinationController.deleteDestination(req,res,next);
});

router.post('/adminpanel/editar',upload.single('file'),function (req,res,next) {
    destinationController.updateDestination(req,res,next);
});

router.get('/userpanel',function (req,res,next) {
    userController.getAllUsers(req,res,next);
});

router.post('/userpanel/editar',function (req,res,next) {
    userController.editUser(req,res,next);
});

router.post('/userpanel/crear',function (req,res,next) {
    userController.createUser(req,res,next);
});

router.get('/userpanel/borrar/:id',function (req,res,next) {
    userController.deleteUser(req,res,next);
});

router.get('/userpanel/recuperar/:id',(req,res,next)=>{
    emailController.recoverAdmin(req,res,next);
})

module.exports = router;