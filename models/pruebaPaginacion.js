let conn = require('../connections/mysqlconnection');
let pagina={};

pagina.paginate = (offset,limit,cb)=>{
    if (conn){
        conn.query('SELECT * FROM cliente LIMIT=?,?',[offset,limit],(error,rows)=>{
            if (error) return cb(error);
            conn.query('SELECT COUNT(*) as TOTAL FROM cliente',(err,count)=>{
                if (err) return cb(err);
                console.log({rows,count})
            })
        })
    }
}