const sequelize = require('../connections/sequalizeconnection');
const SEQUELIZE = require('sequelize');
sequelize
    .authenticate()
    .then(()=>{
        console.log('Connection has been established succesfully');
    })
    .catch(err =>{
        console.error('Unable to connect to the database : ', err);
    })

const Usuario = sequelize.define('user',{
    firstName : {
        type: SEQUELIZE.STRING,
    },
    lastName:{
        type: SEQUELIZE.STRING
    }
});

Usuario.sync({force:true}).then(()=>{
    //Tabla creada
    return Usuario.create({
        firstName:'John',
        lastName:'Hancock'
    })
    res.send('Se ha creado');
});

// Usuario.findAll().then(usuarios =>{
//     console.log(usuarios);
// });

const Op = SEQUELIZE.Op;

Usuario.findAll({
    where:{
        firstName:{
            [Op.like]: '%J%'
        }
    }
}).then(user=>{
    console.log(user);
})

////////PAGINACION////////
