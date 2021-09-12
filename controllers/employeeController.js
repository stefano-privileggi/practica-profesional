const conexion = require('../database/conexion');
var moment = require('moment');     
const ip = require('ip');

exports.create = (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const idTipoDoc = req.body.idTipoDoc;
    conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
        if (error) console.log(error);
        else {
            conexion.query('INSERT INTO empleados SET ?',{ nombre, apellido, idTipoDoc }, (error, results) => {
                if (error) console.log(error);
                else {
                    const sql = 'SELECT * FROM empleados WHERE nombre = ? AND apellido = ? AND idTipoDoc = ? ORDER BY id DESC LIMIT 1';
                    conexion.query(sql, [nombre,apellido,idTipoDoc] , (error, result) => {
                        if (error) console.log(error);
                        else {
                            const idEmpleado = result[0].id;
                            conexion.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol], (error, rol) => {
                                if (error) 
                                console.log(error) 
                                else {
                                    const datos = {
                                        usuario : req.session.email,
                                        rol : req.session.idRol,
                                        accion : "ALTA",
                                        cargo : rol[0].rol,
                                        terminal : ip.address(),
                                        idEmpleado : idEmpleado,
                                        nombre : nombre,
                                        apellido : apellido,
                                        idTipoDoc : idTipoDoc,
                                        fecha : moment().format('YYYY-DD-MM'),
                                        hora : moment().format('HH:mm:ss'),
                                        terminal : ip.address()   
                                    }
                                    conexion.query('INSERT INTO auditoria_empleados SET ?',datos, (error) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                    res.redirect('/employees');         
                                } 
                            })
                        }
                    })
                }
            })
        }
    })
};

exports.update = (req, res)=>{
  console.log("entre al export update");
   const id = req.body.id;
   const nombre = req.body.nombre;
   const apellido = req.body.apellido;
   const idTipoDoc = req.body.idTipoDoc;
   conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
        console.log("me conecte a la db");
        conexion.query('UPDATE empleados SET ? WHERE id = ?', [{ nombre, apellido, idTipoDoc }, id], (error) => {
                if (error) {
                    conexion.query('SELECT * FROM empleados WHERE id = ?',[id], (error,empleados) => {
                        if (!error) {
                            res.render('employees/edit.ejs', { 
                                email : req.session.email,
                                empleado : empleados,
                                alert : true,
                                error: 'El id del tipo de documento no existe' 
                            })
                        }
                    })
                } else {           
                    const sql = 'SELECT * FROM empleados WHERE nombre=? AND apellido=? AND idTipoDoc=? ORDER BY id DESC LIMIT 1';
                    conexion.query(sql, [nombre,apellido,idTipoDoc] , (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            const idEmpleado = result[0].id;
                            conexion.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol], (error, rol) => {
                                if (error) 
                                console.log(error) 
                                else {
                                    const datos = {
                                        usuario : req.session.email,
                                        rol : req.session.idRol,
                                        cargo : rol[0].rol,
                                        accion : "MODIFICAR",
                                        terminal : ip.address(),
                                        idEmpleado : idEmpleado,
                                        nombre : nombre,
                                        apellido : apellido,
                                        idTipoDoc : idTipoDoc,
                                        fecha : moment().format('YYYY-DD-MM'),
                                        hora : moment().format('HH:mm:ss'),
                                        terminal : ip.address()
                                    }
                                    conexion.query('INSERT INTO auditoria_empleados SET ?',datos, (error) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    })
                                    res.redirect('/employees');   
                                }
                            })    
                        }
                    })
                }
            })
        }
    })
};