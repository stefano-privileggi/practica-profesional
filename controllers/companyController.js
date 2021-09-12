const servidor = require('../database/servidor');
const ip = require('ip');
var moment = require('moment');
const conexion = require('../database/conexion');
const mysqldump = require('mysqldump');
const mysql = require('mysql');
const Importer = require('mysql-import');
var winSelectFolder = require("win-select-folder");
const path = require('path');



exports.create = (req, res) => {

const razon_social = req.body.razon_social;
const id_administrador = req.session.id_administrador;

servidor.query('INSERT INTO empresas SET ?', {razon_social,id_administrador}, (error) => {
        if (error) console.log(error);
        else {
            servidor.query('SELECT id FROM empresas ORDER BY id DESC LIMIT 1', (error, empresa) => {
                if (error) console.log(error);
                else {       
                    const id_empresa = empresa[0].id;
                    conexion.query('CREATE DATABASE ' + id_empresa + '_empresa', (error, result) => {
                        if (error) console.log(error);
                        else {
                            console.log("Creé la base de datos.");
                            conexion.query('USE ' + id_empresa + '_empresa', (error, result) => {
                                if (error) console.log(error);
                                else {
                                    conexion.query('CREATE TABLE datos (id INT AUTO_INCREMENT, nombre VARCHAR(255), id_administrador INT, PRIMARY KEY(id))');
                                        if (error) console.log(error);
                                        else {
                       
                                            const datos = {
                                                id : id_empresa, 
                                                nombre : razon_social, 
                                                id_administrador : id_administrador
                                            }
                                            conexion.query('INSERT INTO DATOS SET ?',datos, (error,result) => {
                                                if (error) console.log(error);
                                                else {
                                                    const db_empresa = id_empresa + '_empresa';
                                                    const importer = new Importer({ host : 'localhost', user : 'root', password : '', database : db_empresa});
                                                    importer.import('../pp-v1/db_modelo.sql').then(()=>{
                                                      }).catch(err=>{
                                                        console.error(err);
                                                      });
                                                    servidor.query('SELECT * FROM empresas', (error,empresas) => {
                                                        if (error) console.log(error);
                                                        else {
                                                            
                                                            res.render('companies.ejs', {
                                                                position: 'center',
                                                                icon: 'success',
                                                                alertTitle: 'Alta correctamente',
                                                                showConfirmButton: false,
                                                                timer: 3000,
                                                                ruta: '/companies',
                                                                alert: true,
                                                                email: req.session.email,
                                                                id: req.session.id_administrador,
                                                                existenEmpresas : true,
                                                                empresas : empresas,
                                                                terminal : ip.address(),
                                                                termineProceso : true    
                                                            })
                                                        }
                                                        
                                                    });
                                        
                                                 
                                                }
                                            });
                                        }
                                }
                            });
                            
                        }
                    })
                        
                }
            });
        }
    })
}

exports.update = (req, res) => {

    const id_empresa = req.body.update_id_empresa;
    const razon_social = req.body.razon_social;

    servidor.query('UPDATE empresas SET ? WHERE id = ?', [{razon_social}, id_empresa], (error) => {
        if (error) console.log(error);
        else {   
            conexion.query('USE ' + id_empresa + '_empresa', (error) => {
                if (error) console.log(error);
                else {
                    conexion.query('UPDATE datos SET ? WHERE id = ?', [{nombre : razon_social }, id_empresa], (error) => {
                        if (error) console.log(error);
                        else {           
                            servidor.query('SELECT * FROM empresas', (error, empresas) => {
                                res.render('companies.ejs', {
                                    position: 'center',
                                    icon: 'success',
                                    alertTitle: '¡Modificación realizada con exito!',
                                    showConfirmButton: false,
                                    timer: 6000,
                                    ruta: '/companies',
                                    alert: true,
                                    email: req.session.email,
                                    id: req.session.id_administrador,
                                    existenEmpresas : true,
                                    empresas : empresas,
                                    terminal : ip.address(),
                                    termineProceso : true    
                                })
                            });
                        }
                    })
                }
            })
        }
    })
}

exports.back_up = (req, res) => {
    
    console.log("Entre al metodo backup");

    const root = 'myComputer'; // rootfolder - default desktop
    const description = 'Eliga la carpeta de origen'; // default Select Folder
    const newFolderButton = 1; // whether or not to show the newFolderButton - default 1
     
    winSelectFolder({root, description, newFolderButton})
      .then(ruta => {
        if (ruta === 'cancelled') console.log('Cancelled by user');
        else { 
            console.log(ruta);
            const id_empresa = req.body.back_up_id_empresa;
            servidor.query('SELECT * FROM empresas WHERE id = ?', [id_empresa], (error, empresa) => {
                if (error) console.log(error);
                else {
                    const fecha = moment().format('DDMMYY').toString();
                    const hora = moment().format('HHmmss').toString();
                    mysqldump({
                        connection: {
                            host: 'localhost',
                            user: 'root',
                            password: '',
                            database: '' + id_empresa + '_empresa'
                        },
             
                        dumpToFile: ruta + "/" + empresa[0].razon_social + ' ' + fecha + ' ' + hora + '.sql'
                    }); 

                    servidor.query('SELECT * FROM empresas', (error, empresas) => {
                        res.render('companies.ejs', {
                            position: 'center',
                            icon: 'success',
                            alertTitle: 'La copia de seguridad se realizó correctamente',
                            showConfirmButton: false,
                            timer: 6000,
                            ruta: '/companies',
                            alert: true,
                            email: req.session.email,
                            id: req.session.id_administrador,
                            existenEmpresas : true,
                            empresas : empresas,
                            terminal : ip.address(),
                            termineProceso : true    
                        })
                    });
        
                }
            })
        }
      })
      .catch(err => console.error(err)) 
}

exports.restore = (req, res) => {
    
    const nombre_archivo = req.body.formControlFile;
    
    var absolutePath = path.resolve(nombre_archivo.toString());

    console.log("absolutePath = " + absolutePath);
    // const id_empresa = req.body.restore_id_empresa;
    
    // let tamaño = nombre_archivo.length - 19; 
    // let i = 0;
    // let nombre_back_up = '';
    
    // while (i <= tamaño) {
    //     nombre_back_up += nombre_archivo.charAt(i);
    //     i++;
    // }    
    // servidor.query('SELECT * FROM empresas WHERE id = ?', [id_empresa], (error, empresa) => {
    //     if (error) console.log(error);
    //     else {
    //         const nombre_empresa = empresa[0].razon_social;
    //         servidor.query('SELECT * FROM empresas', (error, empresas) => {
    //             if (nombre_empresa != nombre_back_up) {
    //                     res.render('companies.ejs', {
    //                         position: 'center',
    //                         icon: 'error',
    //                         alertTitle: 'El archivo de copia de seguridad pertenecen a otra empresa',
    //                         showConfirmButton: false,
    //                         timer: 6000,
    //                         ruta: '/companies',
    //                         alert: true,
    //                         email: req.session.email,
    //                         id: req.session.id_administrador,
    //                         existenEmpresas : true,
    //                         empresas : empresas,
    //                         terminal : ip.address(),
    //                         termineProceso : true    
    //                     })  
    //             }
    //             else {
    //                 conexion.query('CREATE DATABASE auxiliar', (error) => {
    //                     if (error) console.log(error);
    //                     else {                        
    //                         const importer = new Importer({ host : 'localhost', user : 'root', password : '', database : 'auxiliar'});                         
    //                         importer.import('../practica-profesional/back_ups/' + nombre_archivo).then(()=>{
    //                             var files_imported = importer.getImported();
    //                             conexion.query('USE auxiliar', (error) => {
    //                                 if (error) console.log(error);
    //                                 else {
    //                                     conexion.query('SELECT * FROM datos', (error,registro) => {
    //                                         if (error) console.log(error);
    //                                         else {
    //                                             const nombre_auxiliar = registro[0].nombre;          
    //                                             if (nombre_empresa != nombre_auxiliar) {
    //                                                 res.render('companies.ejs', {
    //                                                     position: 'center',
    //                                                     icon: 'error',
    //                                                     alertTitle: 'El archivo de copia de seguridad pertenecen a otra empresa',
    //                                                     showConfirmButton: false,
    //                                                     timer: 6000,
    //                                                     ruta: '/companies',
    //                                                     alert: true,
    //                                                     email: req.session.email,
    //                                                     id: req.session.id_administrador,
    //                                                     existenEmpresas : true,
    //                                                     empresas : empresas,
    //                                                     terminal : ip.address(),
    //                                                     termineProceso : true    
    //                                                 })
    //                                             }
    //                                             else {
    //                                                 conexion.query('DROP SCHEMA ' + id_empresa + '_empresa', (error, result) => {
    //                                                     if (error) console.log(error);
    //                                                     else {
    //                                                         conexion.query('CREATE DATABASE ' + id_empresa + '_empresa', (error) => {
    //                                                             if (error) console.log(error);
    //                                                             else {
    //                                                                 console.log("El archivo que se va a importar en la empresa " + id_empresa + "es :  " + ruta + nombre_archivo);
    //                                                                 const importer = new Importer( { host : 'localhost', user : 'root', password : '', database : id_empresa + '_empresa'});
                                                                    
    //                                                                 importer.import('../practica-profesional/back_ups/' + nombre_archivo).then(() => {
    //                                                                     var files_imported = importer.getImported();
    //                                                                     res.render('companies.ejs', {
    //                                                                         position: 'center',
    //                                                                         icon: 'success',
    //                                                                         alertTitle: 'La restauración se realizo correctamente',
    //                                                                         showConfirmButton: false,
    //                                                                         timer: 6000,
    //                                                                         ruta: '/companies',
    //                                                                         alert: true,
    //                                                                         email: req.session.email,
    //                                                                         id: req.session.id_administrador,
    //                                                                         existenEmpresas : true,
    //                                                                         empresas : empresas,
    //                                                                         terminal : ip.address(),
    //                                                                         termineProceso : true    
    //                                                                     })
                                                                  
    //                                                                 }).catch(err => {
    //                                                                     console.error(err);
    //                                                                 });  
    //                                                             }
                                                       
    //                                                         })
    //                                                     }
    //                                                 })
    //                                             }
                                         
    //                                         }
                                          
    //                                     })
                                    
    //                                 }
    //                                 conexion.query('DROP DATABASE auxiliar', (error) => {
    //                                     if (error) console.log(error);
  
    //                                 });
    //                             })
    //                         }).catch(err=>{
    //                             console.error(err);
    //                           });     
    //                     }                
    //                 });
                   
    //             }
    //         })
    //     }
    // })


}

