const express = require('express');
const router = express.Router();
/* GET clientes*/
router.get('/', function (req, res, next) {
    res.send('GET clientes');
});
/* POST clientes*/
router.post('/', function (req, res, next) {
    res.send('POST clientes');
});
/* PUT clientes*/
router.put('/', function (req, res, next) {
    res.send('PUT clientes');
});
/* DELETE clientes*/
router.delete('/', function (req, res, next) {
    res.send('DELETE clientes');
});
module.exports = router;