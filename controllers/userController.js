var bcrypt = require('bcrypt-nodejs');
var usersModel = require('.././models/usersModel');
const Email = require('../config/emailConf');
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path');
const paginate = require('express-paginate');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var userController = {};


//Passport - Inicio
passport.serializeUser(function(user, done) {
    console.log("entro aqui serealize")
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("entro aqui deserialize")
    usersModel.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        passReqToCallback : true
    },
    //funcion para recibir los parametros de req,username,password y un callback
    function(req, username, password, done) {
        usersModel.loginPassport({ 'username' :  username },
            function(err, usuario) {
                // En caso de error, devolvemos el mismo con el done
                if (err)
                    return done(err);
                // El usuario no existe , registramos el error y nos redirigimos hacia atrás
                if (!usuario){
                    return done(null, false, req.flash('mensajeError', 'El usuario no existe, intentelo de nuevo!'));
                }
                // El usuario existe pero la contraseña es incorrecta
                if (!comprobarPass(usuario, password)){
                    return done(null, false, req.flash('mensajeError', 'La contraseña is incorrecta , intentelo de nuevo!'));
                }
                // Comprobamos si el usuario está activo o no
                if (!usuarioActivo(usuario)){
                    return done(null,false,req.flash('mensajeError','Su cuenta no esta activa , revisa su correo para activarla!'))
                }
                // Todo es correcto , el done nos devolvera un succes
                return done(null, usuario);
            }
        );
    }));

let comprobarPass = (usuario,contraseña)=>{
    return bcrypt.compareSync(contraseña,usuario.hash);
}

let usuarioActivo = (usuario)=>{
    return usuario.active;
}

userController.register = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('users/register', {
            title: 'Registro',
            layout: 'layout',
            usernameError: req.flash('usernameError'),
            emailError: req.flash('emailError')

        });
    }

};

userController.postRegister = function (req, res, next) {
    var hash = bcrypt.hashSync(req.body.password);
    var usuario = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        hash: hash,
        isAdmin: 0,
        active: 0
    };
    usersModel.register(usuario, function (err, resultado) {
        if (err) {
            next(err);
        } else {
            switch (resultado) {
                case 1:
                    req.flash('usernameError', 'El usuario ya existe, inténtelo de nuevo')
                    res.redirect('/users/register');
                    break;
                case 2:
                    req.flash('emailError', 'El email ya existe, inténtelo de nuevo')
                    res.redirect('/users/register');
                    break;
                case 3:
                    req.flash('registerCorrectly', 'Se ha registrado correctamente, le hemos enviado un correo para activar su cuenta!');
                    hash = encodeURIComponent(hash);
                    Email.transporter.use('compile', Hbs({
                        viewEngine: 'hbs',
                        extName: '.hbs',
                        viewPath: Path.join(__dirname, '../views/email-template')
                    }));
                    let message = {
                        to: usuario.email,
                        subject: 'Enlace de activación de la cuenta',
                        // html: '<p>Estimado/a ' + usuario.usuario + ':<br>Haga click en el enlace para activa su cuenta.</p><br>' +
                        // '<a href="http://localhost:3000/email/activate/' + hash + '">Active su cuenta de Geekshubs travels.</a>'
                        template: 'activate',
                        context: {
                            usuario: usuario.usuario,
                            ruta: 'http://localhost:3000/email/activate/' + hash + '',
                        },
                        attachments: [
                            {
                                filename: 'logo2.png',
                                path: __dirname + '/../public/images/logo2.png',
                                cid: 'logo'
                            }
                        ]
                    }
                    Email.transporter.sendMail(message, (error, info) => {
                        if (error) {
                            next()
                        }

                        Email.transporter.close();
                    })
                    res.redirect('/users/login');
                    break;
            }
        }
    })
};

userController.login = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render('users/login', {
            title: 'login',
            layout: 'layout',
            registerCorrectly: req.flash('registerCorrectly'),
            mensajeError: req.flash('mensajeError'),
            activated: req.flash('activated'),
            emailError: req.flash('emailError'),
            recoverCorrect: req.flash('recoverCorrect'),
            passwordChanged: req.flash('passwordChanged')
        });
    }
};

userController.postLogin = function (req, res, next) {
    passport.authenticate('local', {
        failureRedirect: '/users/login', failureFlash: true
    })(req, res, function () {
        res.redirect('/');
    });

    // var usuario = {
    //     usuario: req.body.usuario,
    //     password: req.body.password
    // }
    // usersModel.login(usuario, function (err, resultado, usuarioRegistrado) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         switch (resultado) {
    //             case 1:
    //                 req.flash('usernameError', 'El usuario no existe, intentelo de nuevo!')
    //                 res.redirect('/users/login');
    //                 break;
    //             case 2:
    //                 req.flash('passwordError', 'La contraseña is incorrecta , intentelo de nuevo!')
    //                 res.redirect('/users/login');
    //                 break;
    //             case 3:
    //                 if (!usuarioRegistrado.active) {
    //                     req.flash('noActivo', 'Su cuenta no esta activa , revisa su correo para activarla!')
    //                     res.redirect('/users/login');
    //                 } else {
    //                     req.session.username = usuarioRegistrado.usuario;
    //                     req.session.isAdmin = usuarioRegistrado.isAdmin;
    //                     res.redirect('/');
    //                 }
    //                 break;
    //         }
    //
    //     }
    // });
};

userController.logOut = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    } else {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    }
};

userController.getAllUsers = (req, res, next) => {
    let page=(parseInt(req.query.page) || 1) -1;
    let limit = 4;
    let offset = page * limit ;
    usersModel.getAllUsers(offset,limit,(err, clientes) => {
        const currentPage = offset ===0 ? 1:(offset/limit)+1;
        const totalCount = clientes.count;
        const pageCount = Math.ceil(totalCount /limit);
        const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);

        if (err) next();
        if (req.isAuthenticated() && req.user.isAdmin) {
            res.render('admins/userpanel', {
                title: "UsersPanel",
                layout: 'layout',
                clientes: clientes.rows,
                cliente: req.user,
                usernameError: req.flash('usernameError'),
                emailError: req.flash('emailError'),
                registerCorrectly: req.flash('registerCorrectly'),
                borrarUsuario: req.flash('borrarUsuario'),
                editar: req.flash('editar'),
                sendEmailCorrectly: req.flash('sendEmailCorrectly'),
                currentPage:currentPage,
                links:pagination,
                pageCount:pageCount
            })
        } else {
            next();
        }

    })
};

userController.editUser = (req, res, next) => {
    let usuario = {
        id: req.body.id,
        usuario: req.body.usuario,
        email: req.body.email,
        isADmin: req.body.isAdmin,
        active: req.body.active
    }
    console.log(usuario);
    usersModel.editUser(usuario, (err, resultado) => {
        if (err) next(err);
        req.flash('editar', 'Se ha editado el registro correctamente!');
        res.redirect('/admins/userpanel');
    })
};

userController.createUser = (req, res, next) => {
    let hash = bcrypt.hashSync(req.body.password);
    let usuario = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        hash: hash,
        isAdmin: req.body.isAdmin,
        active: req.body.active
    }
    usersModel.register(usuario, (err, resultado) => {
        if (err) next(err);
        switch (resultado) {
            case 1:
                req.flash('usernameError', 'El usuario ya existe, inténtelo de nuevo')
                res.redirect('/admins/userpanel');
                break;
            case 2:
                req.flash('emailError', 'El email ya existe, inténtelo de nuevo')
                res.redirect('/admins/userpanel');
                break;
            case 3:
                req.flash('registerCorrectly', 'Se ha creado correctamente el usuario');
                res.redirect('/admins/userpanel');
                break;
        }
    });

};

userController.deleteUser = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        usersModel.deleteUser(req.params.id, (err, resultado) => {
            if (err) next(err);
            req.flash('borrarUsuario', 'Se ha borrado el usuario correctamente!');
            res.redirect('/admins/userpanel')
        })
    } else {
        next();
    }
};

module.exports = userController;


