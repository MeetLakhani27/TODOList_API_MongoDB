var jwt = require("jsonwebtoken");

exports.auth_check =(req,res,next) => {
    jwt.verify(req.headers.authorization,"tokan_key",next);
}