
const task = require("../model/taskmodel");

// Add task (admin)
exports.inserttask = async(req,res) => {


    var startdate = new Date().toISOString().slice(0, 10);
    var enddate = new Date(req.body.end_date).toISOString().slice(0,10);
    var totalday = Math.ceil((new Date(req.body.end_date)-new Date()) / (1000 * 60 * 60 * 24));

    req.body.start_date = startdate;
    req.body.end_date = enddate;
    req.body.total_day = totalday;
    req.body.status = "pending";
    
    const data =await task.create( req.body );
    res.status(200).json ({
        status: 200,
        massage:"Task Added Sucessfully...",
        data
    });
}

// get task all
exports.gettask = async(req, res) => {
    const data = await task.find().populate("staff_id");
    res.status(200).json ({
        status : 200,
        message: "Task view su8cessfully",
        data
    });
}

// single task - view 
exports.getonetask = async(req, res) => {
    var id = req.params.id;
    const data = await task.findById(id).populate("staff_id");
    res.status(200).json ({
        status : 200,
        message: "Single Task view su8cessfully",
        data
    });
}


 