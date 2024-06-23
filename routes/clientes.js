const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware');
const sobrenomeMiddleware = require('../middlewares/sobrenomeMiddleware');
const idadeMiddleware = require('../middlewares/idadeMiddleware');
const emailMiddleware = require('../middlewares/emailMiddleware');
const verifyToken = require('../middlewares/verifyToken');

/* GET clientes */
router.get('/', verifyToken, clienteController.findAll);

/* POST clientes */
router.post('/', verifyToken, nomeMiddleware.validateName, sobrenomeMiddleware.validateFamilyName, emailMiddleware.validateEmail, idadeMiddleware.validateAge, clienteController.save);

/* PUT clientes */
router.put('/', verifyToken, clienteController.update);

/* DELETE clientes */
router.delete('/:id', verifyToken,  clienteController.remove);

module.exports = router;
