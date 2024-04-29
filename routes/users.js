var express = require('express');
var router = express.Router();
var staff = require('../controller/staffcontroller');

/* GET users listing. */
router.post('/',staff.insertstaff) 
router.post('/login',staff.login) 
router.get('/logout',staff.logout) 
router.get('/view_staff',staff.getstaff) 
router.get('/staffone/:id',staff.getonestaff) 
router.put('/update_user/:id',staff.updatestaff) 
router.delete('/delete_user/:id',staff.deletestaff) 
router.get('/staff_view',staff.viewtaskstaff) 
router.get('/accept/:id',staff.accpettask) 
router.get('/decline/:id',staff.Decline) 
router.get('/complete/:id',staff.Complete) 

module.exports = router;
