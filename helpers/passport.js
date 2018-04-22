const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usersModel');
const bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        console.log("entro aqui serealize")
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("entro aqui deserialize")
        User.getUserById(id, function(err, user) {
            done(err, user);
        });
    });

    // passport/login.js
    passport.use(new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            console.log("entro");
            User.loginPassport({ 'username' :  username },
                function(err, usuario) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!usuario){
                        return done(null, false, req.flash('mensajeError', 'El usuario no existe, intentelo de nuevo!'));
                    }
                    // User exists but wrong password, log the error
                    if (!comprobarPass(usuario, password)){
                        return done(null, false, req.flash('mensajeError', 'La contraseña is incorrecta , intentelo de nuevo!'));
                    }
                    if (!usuarioActivo(usuario)){
                        return done(null,false,req.flash('mensajeError','Su cuenta no esta activa , revisa su correo para activarla!'))
                    }
                    console.log("compruebo todo")
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, usuario);
                }
            );
        }));

    let comprobarPass = (usuario,contraseña)=>{
        return bcrypt.compareSync(contraseña,usuario.hash);
    }

    let usuarioActivo = (usuario)=>{
        console.log("entro aqui");
        return usuario.active;
    }
}