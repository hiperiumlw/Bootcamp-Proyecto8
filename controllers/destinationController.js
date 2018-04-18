var destinationsModel = require('../models/destinationsModel');
var destinationsController = {};
const paginate = require('express-paginate');

destinationsController.getAllDestinationsHome= (req, res, next)=> {
    destinationsModel.getAllDestinations((err,destinos)=>{
        if(err) next(err);
        res.render('home',{
            title: 'Home Page',
            layout: 'layout',
            destinos: destinos,
            isLogged: req.session.username,
            isAdmin:req.session.isAdmin
            });
    })
};

destinationsController.getAllDestinationsAdmin= (req, res, next)=> {
    let page=(parseInt(req.query.page) || 1) -1;
    let limit = 2;
    let offset = page * limit ;
    destinationsModel.getAllDestinationsPaginate(offset,limit,(err,resultado)=>{
        if(err){
            return res.status(500).send(err);
        }
        const currentPage = offset ===0 ? 1:(offset/limit)+1;
        const totalCount = resultado.count[0].total;
        const pageCount = Math.ceil(totalCount /limit);
        const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);

        if(req.session.isAdmin){
            res.render('admins/adminPanel',{
                title: 'Panel de administrador',
                layout: 'layout',
                destinos: resultado.rows,
                isLogged: req.session.username,
                isAdmin: req.session.isAdmin,
                añadir: req.flash('añadir'),
                borrar: req.flash('borrar'),
                actualizar: req.flash('actualizar'),
                currentPage:currentPage,
                links:pagination,
                hasNext:paginate.hasNextPages(pageCount),
                pageCount:pageCount
            })
        }else{
            next();
        }
    })
};

destinationsController.createDestination = (req, res, next)=>{
    let activo = 0;
    if (req.body.activo){
        activo = 1;
    }else {
        activo = 0;
    }
    let destino = {
        nombre: req.body.nombre,
        titulo_descr: req.body.descripcion,
        tipo: req.body.tipo,
        oferta: req.body.oferta,
        precio: req.body.precio,
        plazas: req.body.plazas,
        activo: activo,
        imagen: '/images/'+req.file.originalname,
    }
    let viaje={
        fecha_ida:req.body.fecha_ida,
        hora_ida:req.body.hora_ida,
        fecha_vuelta: req.body.fecha_vuelta,
        hora_vuelta:req.body.hora_vuelta,
        aeropuerto:req.body.aeropuerto
    }
    destinationsModel.createDestination(destino,viaje,(err,resultado)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.redirect('/');
            }else{
                if(req.session.isAdmin){
                    req.flash('añadir','Se ha creado el viaje correctamente!')
                    res.redirect('/admins/adminpanel');
                }else{
                    res.redirect('/');
                }
            }
        }
    })
};

destinationsController.deleteDestination = (req, res, next) =>{
        if(req.session.isAdmin){
            destinationsModel.deleteDestination(req.params.id, (err, result)=>{
                if(err){
                    next(err);
                }else{
                    req.flash('borrar','Se ha borrado el registro '+req.params.id+' satisfactoriamente!')
                    res.redirect('/admins/adminpanel');
                }
            })
        }else {
           next();
        }
};

destinationsController.updateDestination = (req,res,next)=>{
    console.log(req.file);
    let activo = 0;
    if (req.body.activo){
        activo = 1;
    } else {
        activo = 0;
    }
    console.log(activo);
    let destino = {
        id:req.body.id,
        nombre:req.body.nombre,
        titulo_descr:req.body.descripcion,
        tipo:req.body.tipo,
        oferta:req.body.oferta,
        precio:req.body.precio,
        plazas:req.body.plazas,
        activo:activo,
        imagen:'/images/'+req.file.originalname,
    }
    let viajes = {
        fecha_ida:req.body.fecha_ida,
        hora_ida:req.body.hora_ida,
        fecha_vuelta:req.body.fecha_vuelta,
        hora_vuelta:req.body.hora_vuelta,
        aeropuerto:req.body.aeropuerto
    }
            destinationsModel.updateDestination(destino,viajes,(err,resultado)=>{
                if (err) {
                     next(err);
                 }else {
                     req.flash('actualizar','Se ha actualizado el registro '+req.body.id+' satisfactoriamente!')
                     res.redirect('/admins/adminpanel');
                 }
            })
};

module.exports = destinationsController;

