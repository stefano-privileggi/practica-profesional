const express = require('express');
const router = express.Router();
const moment = require('moment');
const ip = require('ip');
const bcrypt = require('bcryptjs');
const database = require('./database/db');
const conexion = require('./database/conexion');
const servidor = require('./database/servidor');
const mysql = require('mysql');
var cookieParser = require('cookie-parser')




router.use(cookieParser());



//7- variables de session
var session = require('express-session');
router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));






router.get('/', function (req, res) {
  servidor.query('SELECT * FROM empresas ORDER BY razon_social', (error, empresas) => {
    if (error) console.log(error);
    else
      res.render('login.ejs', {
        empresas: empresas
      });
  });

})

router.get('/adm-login', function (req, res) {
  res.render('adm-login.ejs');
});

// Login y Sign-up

router.get('/sign-up', (req, res) => {
  res.render('sign-up.ejs');
})

router.post('/administrator_home', (req, res) => {

  const id_empresa = req.body.id_empresa;
  servidor.query('SELECT * FROM empresas', (error, empresas) => {
    if (id_empresa === '') {
      res.render('companies.ejs', {
        position: 'center',
        icon: 'error',
        alertTitle: 'Tiene que seleccionar una empresa',
        showConfirmButton: false,
        timer: 6000,
        ruta: '/companies',
        alert: true,
        email: req.session.email,
        id: req.session.id_administrador,
        existenEmpresas: true,
        empresas: empresas,
        terminal: ip.address(),
        termineProceso: true
      });
    } else {
      servidor.query('SELECT * FROM empresas WHERE id = ?', [id_empresa], (error, empresa) => {
        if (error) console.log(error);
        else {
          servidor.query('SELECT * FROM administradores WHERE id = ?', [req.session.id_administrador], (error, administrador) => {
            if (error) console.log(error);
            else {
              conexion.query('USE ' + id_empresa + '_empresa', (error, result) => {
                if (error) console.log(error);
                else {
                  const email = administrador[0].email;
                  conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, administrador) => {
                    if (error) console.log(error);
                    else {
                      req.session.nombre_empresa = empresa[0].razon_social;
                      req.session.id_administrador = empresa[0].id_administrador;
                      req.session.email = administrador[0].email;
                      req.session.idRol = administrador[0].idRol;
                      req.session.id_empresa = id_empresa;
                      res.render('home', {
                        alert: true,
                        alertTitle: 'Conexión exitosa',
                        alertMessage: '¡Inicio de sesión correcto!',
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: 900,
                        ruta: '/home',
                        email: administrador[0].email,
                        terminal: ip.address(),
                        titulo: 'Practica Profesional',
                        nombre_empresa: req.session.nombre_empresa,
                        idRol: req.session.idRol,
                        id_empresa: req.session.id_empresa
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})




//10 - Método para la REGISTRACIÓN
router.post('/registrar', async (req, res) => {

  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const email = req.body.email
  const idRol = 1

  const contraseña = req.body.contraseña;
  let contraseñaHash = await bcrypt.hash(contraseña, 8);

  database.query('INSERT INTO usuarios SET ?', {
    email: email,
    nombre: nombre,
    apellido: apellido,
    contraseña: contraseñaHash,
    idRol: idRol
  }, async (error) => {
    if (error)
      console.log(error)
    else {
      res.render('sign-up.ejs', {
        alert: true,
        alertTitle: 'Registro',
        alertMessage: '¡Registro completado!',
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: 'home',
      })
    }
  })
})



// 11 - Metodo para el login
router.post('/login', async (req, res) => {

  const id_empresa = req.body.id_empresa;
  servidor.query('SELECT * FROM empresas', async (error, empresas) => {
    if (id_empresa == '') {
      res.render("login", {
        position: 'center',
        icon: 'error',
        alertTitle: 'Tiene que seleccionar una empresa',
        showConfirmButton: false,
        timer: 6000,
        ruta: "/login",
        alert: true,
        email: req.session.email,
        id: req.session.id_administrador,
        existenEmpresas: true,
        empresas: empresas,
        terminal: ip.address(),
        termineProceso: true
      });
    } else {
      const email = req.body.email
      const contraseña = req.body.contraseña
      const contraseñaHash = await bcrypt.hash(contraseña, 8);
      conexion.query('USE ' + id_empresa + '_empresa', async (error, result) => {
        if (error) console.log(error);
        else {
          if (email && contraseña) {
            conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, usuario) => {
              if (error) console.log(error);
              else {
                servidor.query('SELECT * FROM empresas ORDER BY razon_social', async (error, empresas) => {
                  if (error) console.log(error);
                  else {
                    if (usuario.length == 0 || !(await bcrypt.compare(contraseña, usuario[0].contraseña))) {
                      res.render('login.ejs', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'USUARIO y/o PASSWORD incorrectas',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 2000,
                        ruta: '/',
                        empresas: empresas
                      })
                    } else {
                      conexion.query('SELECT * FROM datos', (error, datos) => {
                        req.session.loggedin = true
                        req.session.email = usuario[0].email
                        req.session.idRol = usuario[0].idRol
                        req.session.nombre_empresa = datos[0].nombre
                        req.session.id_empresa = id_empresa
                        res.render('home.ejs', {

                          alert: true,
                          alertTitle: 'Conexión exitosa',
                          alertMessage: '¡Inicio de sesión correcto!',
                          alertIcon: 'success',
                          showConfirmButton: true,
                          timer: 900,
                          ruta: '/home',
                          email: usuario[0].email,
                          idRol: usuario[0].idRol,
                          terminal: ip.address(),
                          titulo: 'Practica Profesional',
                          nombre_empresa: req.session.nombre_empresa,

                        })
                      });
                    }
                  }
                })
              }
            })
          } else {
            res.render('login.ejs', {
              alert: true,
              alertTitle: 'Advertencia',
              alertMessage: '¡Por favor ingrese un usario y/o contraseña!',
              alertIcon: 'warning',
              showConfirmButton: true,
              timer: 2000,
              ruta: '/',
            })
          }
        }

      });
    }
  })
});


router.post('/companies', async (req, res) => {
  const email = req.body.email
  const contraseña = req.body.contraseña
  const contraseñaHash = await bcrypt.hash(contraseña, 8)
  if (email && contraseña) {
    servidor.query('SELECT * FROM administradores WHERE email = ?', [email], async (error, administrador) => {
      if (administrador.length == 0) {
        res.render('adm-login.ejs', {
          alert: true,
          alertTitle: 'Error',
          alertMessage: 'USUARIO y/o PASSWORD incorrectas',
          alertIcon: 'error',
          showConfirmButton: true,
          timer: 2000,
          ruta: '/',
        })
      } else {
        req.session.loggedin = true
        req.session.email = administrador[0].email
        req.session.id_administrador = administrador[0].id;
        servidor.query('SELECT * FROM empresas WHERE id_administrador = ? ORDER BY razon_social', [administrador[0].id], (error, empresas) => {
          if (empresas.length < 1) {
            res.render("companies.ejs", {
              email: administrador[0].email,
              id: req.session.id_administrador,
              empresas: empresas,
              existenEmpresas: false,
              alerta: true,
              terminal: ip.address(),
              termineProceso: true
            });
          } else {
            res.render('companies.ejs', {
              email: req.session.email,
              id: req.session.id_administrador,
              empresas: empresas,
              existenEmpresas: true,
              terminal: ip.address(),
              alerta: true,
              termineProceso: true
            });
          }
        })
      }

    })
  }
})


//12 - Método para controlar que está auth en todas las páginas
router.get('/home', (req, res) => {

  if (req.session.loggedin) {
    res.render('home', {
      login: true,
      email: req.session.email,
      idRol: req.session.idRol,
      titulo: 'Práctica Profesional',
      terminal: ip.address(),
      nombre_empresa: req.session.nombre_empresa,
    });
  } else {
    res.redirect('/');
  }
});

//función para limpiar la caché luego del logout
router.use(function (req, res, next) {
  if (!req.email)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

//Logout, destruye la sesión.
router.get('/logout', function (req, res) {
  req.session.destroy(() => {
    res.redirect('/')
  })
});

router.get('/audit/typesOfDocuments', (req, res) => {
  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      conexion.query('SELECT * FROM auditoria_tipos_de_documentos', (error, listado) => {
        if (error) {
          throw error;
        } else {
          conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?', [req.session.email], (error, registro) => {
            res.render(__dirname + '/views/audit/typesOfDocuments.ejs', {
              listado,
              alert: false,
              error: '',
              nombre: registro[0].nombre.toUpperCase(),
              apellido: registro[0].apellido.toUpperCase()
            });
          });
        }
      })
    }
  })
})

router.get('/audit/employees', (req, res) => {
  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      conexion.query('SELECT * FROM auditoria_empleados', (error, listado) => {
        if (error) {
          throw error;
        } else {
          conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?', [req.session.email], (error, registro) => {
            res.render(__dirname + '/views/audit/employees.ejs', {
              listado,
              alert: false,
              error: '',
              nombre: registro[0].nombre.toUpperCase(),
              apellido: registro[0].apellido.toUpperCase()
            });
          });
        }
      })
    }
  });
});

router.get('/audit/roles', (req, res) => {
  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      conexion.query('SELECT * FROM auditoria_roles', (error, listado) => {
        if (error) {
          throw error;
        } else {
          res.render(__dirname + '/views/audit/roles.ejs', {
            listado,
            alert: false,
            error: '',
            email: req.session.email
          });
        }
      })
    }
  })
});

router.get('/audit/users', (req, res) => {
  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      conexion.query('SELECT * FROM auditoria_usuarios', (error, listado) => {
        if (error) console.log(error);
        else {
          conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?', [req.session.email], (error, registro) => {
            res.render(__dirname + '/views/audit/users.ejs', {
              listado,
              alert: false,
              error: '',
              nombre: registro[0].nombre.toUpperCase(),
              apellido: registro[0].apellido.toUpperCase()
            });
          });
        }
      })
    }
  })
});

module.exports = router;