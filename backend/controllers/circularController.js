const { Circular } = require("../models/circularSchema");

const addCircular = async(req, res) => {
    try{
        const { empId, empName, message,subject } = req.body;

        const circular = new Circular({empId, empName, message,subject});
        await circular.save()
        res.status(201).json(circular);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

const getAllCirculars = async(req, res) => {
    try{
        const circulars = await Circular.find({});
        res.json(circulars);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports = {addCircular,getAllCirculars}