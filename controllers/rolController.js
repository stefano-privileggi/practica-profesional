const database = require('../database/db');

var moment = require('moment'); 
const ip = require('ip');   

exports.create = (req, res)=>{
    const id = req.body.id;
    const rol = req.body.rol;
    database.query('INSERT INTO roles SET ?',{ id, rol }, (error)=>{
        if (error) {
            res.render('roles/create.ejs', {
               email : req.session.email,
               error : 'Ya fue agregado el rol',
               alert : true
            }); 
        }
        else {
            database.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol],(error, rol) => {
               if (error) 
               console.log(error)
               else {  
                     const datos = {
                        usuario : req.session.email,
                        rol : req.session.idRol,
                        accion : "ALTA",
                        cargo : rol[0].rol,
                        terminal : ip.address(),
                        id : id,
                        descripcion : req.body.rol,
                        fecha : moment().format('YYYY-DD-MM'),
                        hora : moment().format('HH:mm:ss')
                     }
                     database.query('INSERT INTO auditoria_roles SET ?',datos, (error) => {
                        if (error) {
                           console.log(error);
                     }
                  });
                  res.redirect('/roles');         
               } 
         })
      }
   })
}

exports.update = (req, res)=>{
   const id = req.body.id;
   const rol = req.body.rol;
   database.query('UPDATE roles SET ? WHERE id = ?', [{ rol }, id], (error) => {
      database.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol], (error, result) => {
         if (error) 
            console.log(error) 
         else {
               const datos = {
                  usuario : req.session.email,
                  rol : req.session.idRol,
                  cargo : result[0].rol,
                  terminal : ip.address(),
                  accion : "MODIFICAR",
                  id : id,
                  descripcion : rol,
                  fecha : moment().format('YYYY-DD-MM'),
                  hora : moment().format('HH:mm:ss')
               }
               database.query('INSERT INTO auditoria_roles SET ?',datos, (error) => {
                  if (error) {
                     console.log(error);
                  }
               })
               res.redirect('/roles');
            }   
         })
      })    
};
   