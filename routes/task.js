var express = require('express');
var router = express.Router();
var task = require('../controller/taskcontroller');

/* GET users listing. */
router.post('/add_task',task.inserttask) 
router.post('/alltask',task.gettask) 
router.post('/onetask',task.getonetask) 
 

module.exports = router;