var express = require('express');
var router = express.Router();
var admin = require("../controller/admincontroller");

/* GET home page. */
router.post('/', admin.insertadmin);
router.post('/login', admin.login);

module.exports = router;
