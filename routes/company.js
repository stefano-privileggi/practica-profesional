const { Router } = require('express');
const router = Router();
const servidor = require('../database/servidor');

const ip = require('ip');

router.get('/', (req,res) => {    
    servidor.query('SELECT * FROM empresas ORDER BY razon_social', (error, empresas) => {
        if (error) console.log(error);
        else {
            res.render('companies.ejs', {
                email : req.session.email,
                empresas : empresas,
                existenEmpresas : true,
                terminal : ip.address(),
                id : req.session.id_administrador,
                termineProceso : true
            });
        }
    });
})

const companyController = require('../controllers/companyController');

router.post('/create', companyController.create);
router.post('/update', companyController.update);
router.post('/back_up', companyController.back_up);
router.post('/restore', companyController.restore);

module.exports = router;
 