let usersModel=require('../models/usersModel');
let bcrypt= require('bcrypt-nodejs');
let emailController={};
const Email= require('../config/emailConf');
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path');

emailController.activate = (req,res,next)=>{
    let hash = decodeURIComponent(req.params.hash);
    usersModel.activate(hash,(err,resultado)=>{
        if (err) {
            next();
        } else {
            req.flash('activated','Su cuenta ha sido activada , ahora puede iniciar sesión!');
            res.redirect('/users/login');
        }

    });
};

emailController.recover = (req,res,next)=>{
    usersModel.checkEmail(req.body.email,(err,resultado)=>{
        if (err) next();
        if (resultado == '') {
            req.flash('emailError', 'El email no existe, inténtelo de nuevo!')
            res.redirect('/users/login');
        }
        else {
            let hash = encodeURIComponent(resultado[0].hash);
            req.flash('recoverCorrect','Le hemos enviado un email para recuperar su contraseña!')
            Email.transporter.use('compile', Hbs ({
                viewEngine: 'hbs',
                extName:'.hbs',
                viewPath: Path.join(__dirname,'../views/email-template')
            }));
            let message= {
                to: req.body.email,
                subject: 'Email de recuperación de contraseña',
                // html: '<p>Estimado/a '+resultado[0].usuario+':<br>Haga click en el enlace para recuperar su contraseña.</p><br>' +
                // '<a href="http://localhost:3000/email/recover/'+hash+'">Recuperar contraseña de Geekshubs travels.</a>'
                template:'recover',
                context:{
                    usuario:resultado[0].usuario,
                    ruta: 'http://localhost:3000/email/recover/'+hash+'',
                },
                attachments:[
                    {
                        filename:'logo2.png',
                        path:__dirname+'/../public/images/logo2.png',
                        cid:'logo'
                    }
                ]
            }
            Email.transporter.sendMail(message,(error,info) =>{
                if (error){
                    next()
                }
                Email.transporter.close();
            })
            res.redirect('/users/login');
        }
    })
};

emailController.checkHash = (req,res,next)=>{
    let hash = decodeURIComponent(req.params.hash);
    usersModel.checkHash(hash,(error,resultado)=>{
        if (error) next();
        if (resultado== ''){
            next()
        } else {
            res.render('users/recover',{
                title: 'Recuperar Contraseña',
                layout: 'layout',
                id: resultado[0].id
            })
        }

    })
};

emailController.changePass = (req,res,next)=>{
    let hash = bcrypt.hashSync(req.body.contrasenya);
    let Usuario = {
        id: req.body.id,
        password: req.body.contrasenya,
        hash: hash
    }
    usersModel.changePass(Usuario,(error, resultado)=>{
        if (error) {next()}
        else {
            req.flash('passwordChanged', 'Su contraseña se ha cambiado correctamente.');
            res.redirect('/users/login')
        }
    })
};

emailController.recoverAdmin = (req,res,next)=>{
    usersModel.getUserById(req.params.id,(error,resultado)=>{
        if (error) next();
        if (req.session.isAdmin) {
            let hash = encodeURIComponent(resultado[0].hash);
            req.flash('sendEmailCorrectly','Se ha enviado el email de recuperacion al usuario correctamente!')
            let message= {
                to: resultado[0].email,
                subject: 'Email de recuperación de contraseña',
                html: '<p>Estimado/a '+resultado[0].usuario+':<br>Haga click en el enlace para recuperar su contraseña.</p><br>' +
                '<a href="http://localhost:3000/email/recover/'+hash+'">Recuperar contraseña de Geekshubs travels.</a>'
            }
            Email.transporter.sendMail(message,(error,info) =>{
                if (error){
                    next()
                }
                Email.transporter.close();
            })
            res.redirect('/admins/userpanel');
        }
        else{
            next();
        }
    })
};

module.exports = emailController;

