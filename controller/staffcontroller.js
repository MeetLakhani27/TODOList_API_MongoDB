var staffmodel = require('../model/staffmodel');
var task = require('../model/taskmodel');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const storage = require('node-persist');
storage.init(/* options...*/);



// INSERT STAFF DATA
exports.insertstaff = async(req,res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;


    const data = await staffmodel.create(req.body);
    res.status(200).json ({
        status:200,
        message: "staff registered successfully...",
        data
    });
}

// login-select
exports.login = async (req, res) => {
    const check =  await storage.getItem("login");
    var data = await staffmodel.find({ email: req.body.email });
    if(check == undefined) {
        if (data.length == 1) {
            bcrypt.compare(req.body.password, data[0].password, async(error, result) => {
                if (result == true) {
                    await storage.setItem("login", data[0]);
                    console.log("data", data[0]);
                    var token = jwt.sign({ id: data[0].id }, "tokan_key")
                    res.status(200).json ({
                        status: 200,
                        message: "you are login",
                        token
                    });
                }
                else {
                    res.status(200).json({
                        status: 200,
                        message: "check your email and password"
                    });
                }
            });
        }
        else {
            res.status(200).json({
                status: 200,
                message: "check your email and password"
            });
        }
    } else {
        res.status(200).json({
            status: 200,
            message: "All Ready Login"
        });
    }
}

// logout-staff
exports.logout = async(req,res) => {
    await storage.clear();
    res.status(200).json({
        status: 200,
        massage:"Staff Logout Sucessfully..",
    });
}


// ALL STAFF LIST
exports.getstaff = async(req,res) => {
    const data = await staffmodel.find();
    res.status(200).json({
        status: 200,
        massage:"All Staff List",
        data
    });
}


// SINGLE STAFF LIST
exports.getonestaff = async(req,res) => {
    var id = req.params.id;
    const data = await staffmodel.findById(id);
    res.status(200).json({
        status: 200,
        massage:"Single Staff Show",
        data
    });
}

// UPDATE STAFF 
exports.updatestaff = async (req,res) => {
    var id = req.params.id;
    const data = await staffmodel.findByIdAndUpdate(id,req.body);
    res.status(200).json ({
        status: 200,
        message: "Update staff Data",
        data
    });
}

// delete staff data
exports.deletestaff = async (req,res) => {
    var id = req.params.id;
    var data = await staffmodel.findByIdAndDelete(id);
    res.status(200).json ({
        status: 200,
        message: "Delete staff Data",
    });
}

// view task login staff wise
exports.viewtaskstaff = async(req,res) => {
    const check = await storage.getItem("login");
    if(check != undefined) {
        const data = await task.find({ staff_id: check._id}). populate("staff_id");
        if(data != undefined) {
            res.status(200).json({
                status:200,
                massage:"Task view sucessfully...",
                data,
            });
        } else {
            res.status(200).json({
                status:200,
                massage:"Task Not Found",
                data,
            });
        }
    } else {
        res.status(200).json({
            status:200,
            massage:"Plz login !",
            data,
        });
}
}


// accept-the -staff
exports.accpettask = async(req, res) => {
    const check = await storage.getItem("login");
    if(check != undefined) {
        var id = req.params.id;
        req.body.status = "Accept";
        const data = await task.findByIdAndUpdate(id, req.body);
        if(data != undefined) {
            res.status(200).json({
                status:200,
                massage:"Task Accepted Succefully"

            });
        } else {
            res.status(200).json({
                status:200,
                massage:"Task Not Found"

            });
        }
    }
}

// Decline-the-staff
exports.Decline = async(req, res) => {
    const check = await storage.getItem("login");
    if(check != undefined) {
        var id = req.params.id;
        req.body.status = "Decline";
        const data = await task.findByIdAndUpdate(id, req.body);
        if(data != undefined) {
            res.status(200).json({
                status:200,
                massage:"Task Accepted Succefully"

            });
        } else {
            res.status(200).json({
                status:200,
                massage:"Task Not Found"

            });
        }
    }
}

// Complete-the-staff
exports.Complete = async(req, res) => {
    const check = await storage.getItem("login");
    if(check != undefined) {
        var id = req.params.id;
        req.body.status = "Completed";
        const data = await task.findByIdAndUpdate(id, req.body);
        if(data != undefined) {
            res.status(200).json({
                status:200,
                massage:"Task Accepted Succefully"

            });
        } else {
            res.status(200).json({
                status:200,
                massage:"Task Not Found"

            });
        }
    }
}