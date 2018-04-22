// let conn = require('../connections/mysqlconnection');
let sequelize = require('../connections/sequelizeconnection');
const SEQUELIZE = require('sequelize');
let destinations = {};

const destination = sequelize.define('destinos',{
    nombre:{
        type:SEQUELIZE.STRING,
    },
    titulo_descr:{
        type:SEQUELIZE.STRING
    },
    tipo:{
        type:SEQUELIZE.STRING
    },
    oferta:{
        type:SEQUELIZE.STRING
    },
    precio:{
        type:SEQUELIZE.FLOAT
    },
    plazas:{
        type:SEQUELIZE.INTEGER
    },
    activo:{
        type:SEQUELIZE.BOOLEAN
    },
    imagen:{
        type:SEQUELIZE.STRING
    },
    fecha_ida:{
        type:SEQUELIZE.STRING,
    },
    hora_ida:{
        type:SEQUELIZE.TIME,
    },
    fecha_vuelta:{
        type:SEQUELIZE.STRING,
    },
    hora_vuelta:{
        type:SEQUELIZE.STRING,
    },
    aeropuerto:{
        type:SEQUELIZE.STRING,
    },
});

destinations.getAllDestinations = (cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('SELECT destinos.*,viajes.* FROM destinos INNER JOIN viajes ON destinos.id=viajes.id',function (err,rows) {
    //     if (err) return cb(err);
    //     console.log(rows);
    //     return cb(err,rows);
    // })

    destination.findAll().then((destinos)=>{
        return cb(null,destinos);
    }).error((error)=>{
        return cb(error);
    })
};

destinations.getAllDestinationsPaginate = (offset,limit,cb)=>{
    // if (!conn) return cb("No se ha podido crear conexion");
    // conn.query('SELECT destinos.*,viajes.* FROM destinos INNER JOIN viajes ON destinos.id=viajes.id LIMIT ?,?',[offset,limit],(err,rows)=>{
    //     if (err) return err;
    //     console.log("entro aqui")
    //     conn.query('SELECT COUNT(*) as total FROM destinos',(err,count)=>{
    //         return cb(null,{rows,count})
    //     })
    // })

    destination.findAndCount({offset:offset,limit:limit}).then((resultado)=>{
        let rows = resultado.rows;
        let count = resultado.count;
        return cb(null,{rows,count});
    });
}

destinations.createDestination = (destino,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('INSERT INTO destinos SET ?',destino,function (err,resultado) {
    //     if (err) return cb(err);
    //     conn.query('INSERT INTO viajes SET ?',viaje,function (err2,resultado2) {
    //         if (err2) return cb(err2);
    //         return cb(null,resultado2);
    //     })
    // })

    destination.create(destino).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

destinations.deleteDestination = (id,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('DELETE FROM destinos WHERE id=?',id,(err,resultado)=>{
    //     if (err) return cb(err);
    //     conn.query('DELETE FROM viajes WHERE id=?',id,(err2,resultado2)=>{
    //         if (err2) return cb(err2);
    //         return cb(null,resultado2);
    //     })
    // })
    destination.destroy({where:{id:id}}).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

destinations.updateDestination = (destino,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('UPDATE destinos SET ? WHERE id='+destino.id+'',destino,(err,resultado)=>{
    //     if (err) return cb(err);
    //     conn.query('UPDATE viajes SET ? WHERE id='+destino.id+'',viajes,(err2,resultado2)=>{
    //         if (err2) return cb(err2);
    //         return cb(null,resultado2);
    //     })
    // })

    destination.findOne({where:{id:destino.id}}).then((dest)=>{
        dest.updateAttributes(destino).then((resultado)=>{
            return cb(null,resultado);
        }).error((error)=>{
            return cb(error);
        })
    }).error((error)=>{
        return cb(error);
    })

    // destination.update(destino,{where:{id:destination.id}}).then((resultado)=>{
    //     return cb(null,resultado);
    // }).error((error)=>{
    //     return cb(error);
    // });
};

destinations.getDestinationById = (id,cb)=>{
    // if (!conn) return cb("No se ha podido crear la conexion");
    // conn.query('SELECT destinos.*,viajes.* FROM destinos INNER JOIN viajes ON destinos.id=viajes.id WHERE destinos.id=?',id,(error,resultado)=>{
    //     if (error) return cb(error);
    //     return cb(null,resultado);
    // })

    destination.findById(id).then((destino)=>{
        return cb(null,destino);
    }).error((error)=>{
        return cb(error);
    })
};

module.exports = destinations;