const express = require('express');
const router = express.Router();
const clienteController = 
require('../controllers/clienteController');
/* GET clientes*/
router.get('/', clienteController.findAll);
/* POST clientes*/
router.post('/', clienteController.save);

/* PUT clientes*/
router.put('/', clienteController.update);
/* DELETE clientes*/
router.delete('/:id', clienteController.remove);
module.exports = router;
