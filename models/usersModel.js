// let conn = require('../connections/mysqlconnection');
let sequelize = require('../connections/sequelizeconnection');
const SEQUELIZE = require('sequelize');
let hash = require('bcrypt-nodejs');

const User = sequelize.define('cliente',{
    usuario:{
        type:SEQUELIZE.STRING
    },
    email:{
        type:SEQUELIZE.STRING
    },
    password:{
        type:SEQUELIZE.STRING
    },
    hash:{
        type:SEQUELIZE.STRING
    },
    isAdmin:{
        type:SEQUELIZE.BOOLEAN
    },
    active:{
        type:SEQUELIZE.BOOLEAN
    }
},{
    freezeTableName:true,
})

let Users={};

Users.register = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query("SELECT * FROM cliente WHERE usuario=?",usuario.usuario,function (err1,res1) {
    //     if (err1) return cb(err1);
    //     if (res1 != ''){
    //         return cb(null,comprobacion[0]);
    //     } else {
    //         conn.query('SELECT * FROM cliente where email=?',usuario.email,function (err2,res2) {
    //             if (err2) return cb(err2);
    //             if (res2 != '' ){
    //                 return cb(null,comprobacion[1]);
    //             }else {
    //                 conn.query('INSERT INTO cliente SET ?',usuario,function (err3,res3) {
    //                     if(err3) return cb(err3);
    //                     return cb(null,comprobacion[2]);
    //                 })
    //             }
    //         })
    //     }
    // })
    User.findOne({where:{usuario:usuario.usuario}}).then((resultado)=>{
        if (resultado)
        return cb(null,comprobacion[0]);
        else
            User.findOne({where:{email:usuario.email}}).then((resultado)=>{
                if (resultado) return cb(null,comprobacion[1]);
                else
                    User.create(usuario).then((resultado)=>{
                        return cb(null,comprobacion[2]);
                    })
            })
    }).error((err)=>{
        return cb(err);
    })
};

Users.login = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('SELECT * FROM cliente WHERE usuario=?',[usuario.usuario],function (err,rows) {
    //     if (err) return cb(error);
    //     if (rows == ''){
    //         return cb(null,comprobacion[0]);
    //     } else {
    //         hash.compare(usuario.password, rows[0].hash, function(err, coincide) {
    //             console.log(coincide);
    //             if (!coincide){
    //                 return cb(null,comprobacion[1]);
    //             }else{
    //                 return cb(null,comprobacion[2],rows[0]);
    //             }
    //         });
    //     }
    // })

    User.findOne({where:{usuario:usuario.usuario}}).then((resultado)=>{
        if (!resultado) return cb(null,comprobacion[0]);
        hash.compare(usuario.password,resultado.hash,(error,coincide)=>{
            if (!coincide) return cb(null,comprobacion[1]);
            return cb(null,comprobacion[2],resultado);
        })
    }).error((error)=>{
        return cb(error);
    })
};

Users.loginPassport = (usuario,cb)=>{
    User.findOne({where:{usuario:usuario.username}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
}

Users.getAllUsers = (offset,limit,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('SELECT * FROM cliente',(err,resultado)=>{
    //     if (err) return cb(err);
    //     return cb(null,resultado);
    // })
    User.findAndCount({offset:offset,limit:limit}).then((clientes)=>{
        let rows = clientes.rows;
        let count = clientes.count;
        return cb(null,{rows,count});
    }).error((error)=>{
        return cb(error);
    })
};

Users.deleteUser = (id,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('DELETE FROM cliente WHERE id=?',id,(err,resultado)=>{
    //     if (err) return cb(err);
    //     return cb(null,resultado);
    // })

    User.destroy({where:{id:id}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

Users.editUser = (usuario,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('UPDATE cliente SET ? WHERE id='+usuario.id+'',usuario,(err,resultado)=>{
    //     if (err) return cb(err);
    //     return cb(null,resultado);
    // })

    User.update(usuario,{where:{id:usuario.id}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

Users.activate = (hash,cb)=>{
    // if (!conn) return cb ("No se ha podido establecer conexión")
    // conn.query('SELECT * FROM cliente WHERE hash=?',hash,function (err,resultado){
    //     if (err) return cb (err)
    //     if (resultado==""){
    //         return cb(err);
    //     }
    //     let activo = resultado[0].active;
    //     if (activo!=0){
    //         return cb('Error : Enlace caducado');
    //     }
    //     activo = 1;
    //     conn.query('UPDATE cliente SET active=? WHERE id='+resultado[0].id+'',activo,(err2,resultado2)=>{
    //         if (err2) return cb(err2);
    //         return cb(null,resultado2);
    //     })
    // })

    User.findOne({where:{hash:hash}}).then((resultado)=>{
        if (!resultado) return cb(err);
        let activo = resultado.active;
        if (activo!=0){
            return cb("Error : Enlace caducado");
        }
        activo = 1;
        User.update({active:activo},{where:{id:resultado.id}}).then((resultado)=>{
            return cb(null,resultado);
        }).error((error)=>{
            return cb(error);
        })
    }).error((error)=>{
        return cb(error);
    })
};

Users.checkEmail = (email,cb)=>{
    // if (!conn) return cb ("No se ha podido establecer conexión")
    // conn.query('SELECT * FROM cliente WHERE email=?',email,function (err,resultado) {
    //     if (err) return cb(err)
    //     return cb(null,resultado);
    // })

    User.findOne({where:{email:email}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

Users.checkHash = (hash,cb)=>{
    // if (!conn) return cb ("No se ha podido establecer conexión")
    // conn.query('SELECT * FROM cliente WHERE hash=?',hash,function (err,resultado){
    //     if (err) return cb (err)
    //     return cb(null,resultado)
    // })

    User.findOne({where:{hash:hash}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

Users.changePass = (usuario,cb)=>{
    // if (!conn) return cb ("No se ha podido establecer conexión")
    // conn.query('UPDATE cliente SET ? WHERE id='+usuario.id+'',usuario,function (error,resultado) {
    //     if (error) return cb(error)
    //     return cb(null,resultado)
    // });

    User.update(usuario,{where:{id:usuario.id}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

Users.getUserById = (id,cb)=>{
    // if (!conn) return cb ("No se ha podido establecer conexión")
    // conn.query('SELECT * FROM cliente WHERE id=?',id,function (error,resultado) {
    //     if (error) return cb(error)
    //     return cb(null,resultado)
    // })

    User.findOne({where:{id:id}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

module.exports = Users;