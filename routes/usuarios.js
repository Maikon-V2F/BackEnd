const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


router.get('/', usuarioController.findAll);

router.post('/', usuarioController.save);

router.put('/', usuarioController.update);

router.delete('/:id', usuarioController.remove);

module.exports = router;
