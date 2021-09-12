var moment = require('moment');  
const bcrypt = require('bcryptjs');
const ip = require('ip');
const conexion = require('../database/conexion');

exports.create = async (req, res)=>{
    
    const email = req.body.email;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const idRol = req.body.id_rol;

    const contraseña = req.body.contraseña;
    let contraseñaHash = await bcrypt.hash(contraseña, 8);
    conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
        if (error) console.log(error);
        else {
            conexion.query('INSERT INTO usuarios SET ?',{email, nombre, apellido, contraseña : contraseñaHash, idRol }, (error, results)=>{
                    if (error) {
                        res.render('users/create.ejs', { 
                            alert : true,
                            error: 'El email ingresado ya fue previamente cargado' });
                        console.log(error);
                    } else {
                        conexion.query('SELECT * FROM roles WHERE id = ?',[req.session.idRol],(error, result) => { 
                            const datos = {
                                usuario: req.session.email,
                                rol: req.session.idRol,
                                accion: 'ALTA',
                                cargo: result[0].rol,
                                terminal : ip.address(),
                                email: email,
                                nombre: nombre,
                                apellido: apellido,
                                contraseña: contraseñaHash,
                                id_rol: idRol,
                                fecha: moment().format('YYYY-DD-MM'),
                                hora: moment().format('HH:mm:ss'),
                                terminal : ip.address()
                            }
                            conexion.query('INSERT INTO auditoria_usuarios SET ?', datos);
                            res.redirect('/users');     
                        })    
                    }
            })
        }
    })
}   


exports.update = async (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const contraseña = req.body.contraseña;
    let contraseñaHash = await bcrypt.hash(contraseña, 8);
    const idRol = req.body.idRol;
    conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
        if (error) console.log(error);
        else {
            conexion.query('UPDATE usuarios SET ? WHERE email = ?',[{nombre,apellido,contraseña : contraseñaHash,idRol}, email], (error, results) => {
                if (error) console.log(error);
                else {           
                    conexion.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol],(error, result) => { 
                        const datos = {
                            usuario: req.session.email,
                            rol: req.session.idRol,
                            accion: 'MODIFICAR',
                            cargo: result[0].rol,
                            terminal : ip.address(),
                            email: email,
                            nombre: nombre,
                            apellido: apellido,
                            contraseña: contraseñaHash,
                            id_rol: idRol,
                            fecha: moment().format('YYYY-DD-MM'),
                            hora: moment().format('HH:mm:ss'),
                            terminal : ip.address()
                        }
                        conexion.query('INSERT INTO auditoria_usuarios SET ?', datos)
                        res.redirect('/users');         
                    })
                }
            })
        }
    })
}