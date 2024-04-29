const admin = require("../model/adminmodel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// insert staff data
exports.insertadmin = async (req, res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    const data = await admin.create(req.body);
    res.status(200).json({
        status: "insert data",
    });
}

// login-select
exports.login = async (req, res) => {
    var data = await admin.find({ email: req.body.email });
    if (data.length == 1) {
        bcrypt.compare(req.body.password, data[0].password, async (error, result) => {
            if (result == true) {
                var token = jwt.sign({ id: data[0].id }, "tokan_key")
                res.status(200).json({
                    status: 200,
                    message: "you are login",
                    token

                }
                )
            }
            else {
                res.status(200).json({
                    status: 200,
                    message: "check your email and password"
                })
            }
        })
    }
    else {
        res.status(200).json({
            status: 200,
            message: "check your email and password"
        })
    }
}

