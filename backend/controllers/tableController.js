const { CasualLeave } = require('../models/casualLeaveSchema');
const { PrivelageLeave } = require('../models/privelageLeaveSchema');
const { PaternityLeave } = require('../models/paternityLeaveSchema');

const getDetails = async(req, res) =>{
    try{
        const {empId} = req.body
        const clDetails = await CasualLeave.findOne({empId});
        const plDetails = await PrivelageLeave.findOne({empId});
        const paternityLeave = await PaternityLeave.findOne({empId});
        res.status(200).json({clDetails, plDetails, paternityLeave});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = {getDetails};