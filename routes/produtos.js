const express = require('express');
const router = express.Router();
const produtoController = 
require('../controllers/produtoController');
/* GET produtos*/
router.get('/', produtoController.findAll);
/* POST produtos*/
router.post('/', produtoController.save);

/* PUT produtos*/
router.put('/', produtoController.update);
/* DELETE produtos*/
router.delete('/:id', produtoController.remove);
module.exports = router;
