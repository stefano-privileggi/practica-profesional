const {
    Router
} = require('express');
const router = Router();
const conexion = require('../database/conexion');
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        conexion.query('SELECT * FROM plan_de_cuentas ORDER BY codigo', (error, cuentas) => {
            if (error)
                console.log(error);
            else {
                conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 0 ORDER BY codigo', (error, cuentas_no_imputables) => {
                    if (error) {
                        console.log(error);
                    } else
                        conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 1 ORDER BY codigo', (error, cuentas_imputables) => {
                            if (error)
                                console.log(error);
                            else {
                                var nuevoCodigo = "Stefano";
                                res.render('chartOfAccounts/list.ejs', {
                                    cuentas,
                                    cuentas_no_imputables,
                                    cuentas_imputables,
                                    email: req.session.email,
                                    idRol: req.session.idRol,
                                    nombre_empresa: req.session.nombre_empresa,
                                    nuevoCodigo
                                });
                            }
                        })

                })
            }
        })
    } else {
        res.redirect('/');
    }
});

router.post('/create', (req, res) => {
    var codigo = req.body.codigo_create;
    var nombre_cuenta = req.body.nombre;
    var es_tipo = req.body.es_tipo;

    conexion.query('SELECT * FROM plan_de_cuentas WHERE codigo = ?', [codigo], (error, cuenta) => {
        if (error)
            console.log(error);
        else {
            var numero = cuenta[0].numero;
            conexion.query('SELECT MAX(codigo) as max_codigo, COUNT(codigo) AS cantidad FROM plan_de_cuentas WHERE id_padre = ?', [numero], (error, resultados) => {
                if (error)
                    console.log(error);
                else {
                    var cod = resultados[0].max_codigo;
                    var cantidad = resultados[0].cantidad;
                    var nuevoCodigo = '';
                    if (cantidad == 0) {
                        console.log("Cuando el padre no tiene hijos");
                        nuevoCodigo = nuevoCodigo.concat(codigo.toString() + ".01");
                        console.log("Nuevo codigo: " + nuevoCodigo);
                        var datos_insertar = {
                            codigo : nuevoCodigo,
                            id_padre : numero,
                            nombre: nombre_cuenta,
                            tipo : es_tipo
                        };
                        conexion.query('INSERT INTO plan_de_cuentas SET ?',datos_insertar, (error) => {
                            if (error)
                                console.log(error);
                            else {
                                conexion.query('SELECT * FROM plan_de_cuentas ORDER BY codigo', (error, cuentas) => {
                                    if (error)
                                        console.log(error);
                                    else {
                                        conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 0 ORDER BY codigo', (error, cuentas_no_imputables) => {
                                            if (error) {
                                                console.log(error);
                                            } else
                                                conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 1 ORDER BY codigo', (error, cuentas_imputables) => {
                                                    if (error)
                                                        console.log(error);
                                                    else {
                                                        res.render('chartOfAccounts/list.ejs', {
                                                            cuentas,
                                                            cuentas_no_imputables,
                                                            cuentas_imputables,
                                                            email: req.session.email,
                                                            idRol: req.session.idRol,
                                                            nombre_empresa: req.session.nombre_empresa,
                                                            nuevoCodigo: "Stefano"
                                                        });
                                                    }
                                                })

                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        console.log("Cuando el padre tiene hijos");
                        console.log("Ultimo hermano: " + cod);
                        cod = resultados[0].max_codigo
                        var i = cod.length - 1;
                        while (cod[i] != '.') {
                            i = i - 1;
                        }
                        nuevoCodigo = cod.substring(0, i + 1);
                        cantidad += 1;
                        console.log("Nuevo codigo: " + nuevoCodigo.concat("0" + cantidad.toString()));
                        nuevoCodigo = nuevoCodigo.concat("0" + cantidad.toString());
                        console.log("Se va a insertar con:");
                        console.log("Codigo a insertar: " + nuevoCodigo);
                        console.log(nuevoCodigo, numero, nombre_cuenta, es_tipo);
                        var datos = {
                            codigo : nuevoCodigo,
                            id_padre : numero,
                            nombre : nombre_cuenta,
                            tipo : es_tipo
                        };
                        conexion.query('INSERT INTO plan_de_cuentas SET ?',datos, (error) => {
                            if (error)
                                console.log(error);
                            else {
                                conexion.query('SELECT * FROM plan_de_cuentas ORDER BY codigo', (error, cuentas) => {
                                    if (error)
                                        console.log(error);
                                    else {
                                        conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 0 ORDER BY codigo', (error, cuentas_no_imputables) => {
                                            if (error) {
                                                console.log(error);
                                            } else
                                                conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 1 ORDER BY codigo', (error, cuentas_imputables) => {
                                                    if (error)
                                                        console.log(error);
                                                    else {
                                                        res.render('chartOfAccounts/list.ejs', {
                                                            cuentas,
                                                            cuentas_no_imputables,
                                                            cuentas_imputables,
                                                            email: req.session.email,
                                                            idRol: req.session.idRol,
                                                            nombre_empresa: req.session.nombre_empresa,
                                                            nuevoCodigo: "Stefano"
                                                        });
                                                    }
                                                })

                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    });
});


router.post('/update', (req, res) => {
    var codigo_update = req.body.codigo_update;
    var nombre = req.body.nombre_update;
    var tipo = req.body.es_tipo_update;
    conexion.query('UPDATE plan_de_cuentas SET ? WHERE codigo = ?',[{nombre,tipo},codigo_update], (error) => {
        if (error)
            console.log(error);
        else {
            conexion.query('SELECT * FROM plan_de_cuentas ORDER BY codigo', (error, cuentas) => {
                if (error)
                    console.log(error);
                else {
                    conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 0 ORDER BY codigo', (error, cuentas_no_imputables) => {
                        if (error) {
                            console.log(error);
                        } else
                            conexion.query('SELECT * FROM plan_de_cuentas WHERE tipo = 1 ORDER BY codigo', (error, cuentas_imputables) => {
                                if (error)
                                    console.log(error);
                                else {
                                    res.render('chartOfAccounts/list.ejs', {
                                        cuentas,
                                        cuentas_no_imputables,
                                        cuentas_imputables,
                                        email: req.session.email,
                                        idRol: req.session.idRol,
                                        nombre_empresa: req.session.nombre_empresa,
                                        nuevoCodigo: "Stefano"
                                    });
                                }
                            })

                    })
                }
            })
        }
    });

});

module.exports = router;