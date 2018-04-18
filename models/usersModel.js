let conn = require('../connections/mysqlconnection');
let hash = require('bcrypt-nodejs');
let Users={};


Users.register = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query("SELECT * FROM cliente WHERE usuario=?",usuario.usuario,function (err1,res1) {
        if (err1) return cb(err1);
        if (res1 != ''){
            return cb(null,comprobacion[0]);
        } else {
            conn.query('SELECT * FROM cliente where email=?',usuario.email,function (err2,res2) {
                if (err2) return cb(err2);
                if (res2 != '' ){
                    return cb(null,comprobacion[1]);
                }else {
                    conn.query('INSERT INTO cliente SET ?',usuario,function (err3,res3) {
                        if(err3) return cb(err3);
                        return cb(null,comprobacion[2]);
                    })
                }
            })
        }
    })
};

Users.login = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT * FROM cliente WHERE usuario=?',[usuario.usuario],function (err,rows) {
        if (err) return cb(error);
        if (rows == ''){
            return cb(null,comprobacion[0]);
        } else {
            hash.compare(usuario.password, rows[0].hash, function(err, coincide) {
                console.log(coincide);
                if (!coincide){
                    return cb(null,comprobacion[1]);
                }else{
                    return cb(null,comprobacion[2],rows[0]);
                }
            });
        }
    })
};

Users.getAllUsers = (cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT * FROM cliente',(err,resultado)=>{
        if (err) return cb(err);
        return cb(null,resultado);
    })
};

Users.deleteUser = (id,cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('DELETE FROM cliente WHERE id=?',id,(err,resultado)=>{
        if (err) return cb(err);
        return cb(null,resultado);
    })
};

Users.editUser = (usuario,cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('UPDATE cliente SET ? WHERE id='+usuario.id+'',usuario,(err,resultado)=>{
        if (err) return cb(err);
        return cb(null,resultado);
    })
};

Users.activate = (hash,cb)=>{
    if (!conn) return cb ("No se ha podido establecer conexión")
    conn.query('SELECT * FROM cliente WHERE hash=?',hash,function (err,resultado){
        if (err) return cb (err)
        if (resultado==""){
            return cb(err);
        }
        let activo = resultado[0].active;
        if (activo!=0){
            return cb('Error : Enlace caducado');
        }
        activo = 1;
        conn.query('UPDATE cliente SET active=? WHERE id='+resultado[0].id+'',activo,(err2,resultado2)=>{
            if (err2) return cb(err2);
            return cb(null,resultado2);
        })
    })
};

Users.checkEmail = (email,cb)=>{
    if (!conn) return cb ("No se ha podido establecer conexión")
    conn.query('SELECT * FROM cliente WHERE email=?',email,function (err,resultado) {
        if (err) return cb(err)
        return cb(null,resultado);
    })
};

Users.checkHash = (hash,cb)=>{
    if (!conn) return cb ("No se ha podido establecer conexión")
    conn.query('SELECT * FROM cliente WHERE hash=?',hash,function (err,resultado){
        if (err) return cb (err)
        return cb(null,resultado)
    })
};

Users.changePass = (usuario,cb)=>{
    if (!conn) return cb ("No se ha podido establecer conexión")
    conn.query('UPDATE cliente SET ? WHERE id='+usuario.id+'',usuario,function (error,resultado) {
        if (error) return cb(error)
        return cb(null,resultado)
    });
};

Users.getUserById = (id,cb)=>{
    if (!conn) return cb ("No se ha podido establecer conexión")
    conn.query('SELECT * FROM cliente WHERE id=?',id,function (error,resultado) {
        if (error) return cb(error)
        return cb(null,resultado)
    })
};

module.exports = Users;