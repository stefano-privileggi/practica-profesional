const conexion = require('../database/conexion');
var moment = require('moment');
const ip = require('ip');   


exports.create = (req, res) => {

  console.log("entre el create de tipos de documentos");

  const id = req.body.id
  const descripcion = req.body.descripcion

  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) {
      console.log(error);
      console.log("Hay error en el USE");
    }
    else {
      console.log("estoy usando la empresa");
      conexion.query('INSERT INTO tiposDocumento SET ?',{ id, descripcion }, (error, results) => {
        if (error) {
          res.render('typesOfDocuments/create.ejs', {
            alert: true,
            error: 'El id ingresado ya fue previamente cargado',
            email : "stefano@gmail.com"
          })
        } else {
          console.log("inserte en tipos de documentos");
          conexion.query('SELECT * FROM roles WHERE id = ?',[req.session.idRol], (error, rol) => {
            if (error) console.log(error) 
            else {
                  const datos = {
                    usuario: req.session.email,
                    rol: req.session.idRol,
                    accion: 'ALTA',
                    cargo : rol[0].rol,
                    terminal : ip.address(),
                    idTipoDoc: id,
                    descripcion: descripcion,
                    fecha: moment().format('YYYY-DD-MM'),
                    hora: moment().format('HH:mm:ss'),
                  }
                  conexion.query('INSERT INTO auditoria_tipos_de_documentos SET ?', datos)
                  res.redirect('/typesOfDocuments');
                  console.log("Se insertó correctamente en auditoria");
            }
          });
        }
      })
    }
  })
}

 

exports.update = (req, res) => {
  const id = req.body.id
  const descripcion = req.body.descripcion

  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      let sql = 'UPDATE tiposDocumento SET ? WHERE id = ?'
      conexion.query(sql, [{ descripcion }, id], (error, results) => {
        if (error) {
          console.log(error)
        } else {
          conexion.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol],(error, result) => {
              if (error) 
                console.log(error)
              else {
                sql = 'INSERT INTO auditoria_tipos_de_documentos SET ?'
                const datos = {
                  usuario: req.session.email,
                  rol: req.session.idRol,
                  accion: 'MODIFICAR',
                  cargo: result[0].rol,
                  terminal : ip.address(),
                  idTipoDoc: id,
                  descripcion: descripcion,
                  fecha: moment().format('YYYY-DD-MM'),
                  hora: moment().format('HH:mm:ss'),
                }
                conexion.query(sql, datos, (error) => {
                  if (error) {
                    console.log(error)
                  }
                })
              }
            }
          )
          res.redirect('/typesOfDocuments')
        }
      })
    
    }
  })
}
