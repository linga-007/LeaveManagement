const { LeaveModel } = require('../models/leaveSchema'); 
const { EmpModel } = require('../models/employeeSchema');
const { CasualLeave } = require('../models/casualLeaveSchema');
const { PrivelageLeave } = require('../models/privelageLeaveSchema');
const { PaternityLeave } = require('../models/paternityLeaveSchema');

// Apply for leave
const ApplyLeave = async (req, res) => {
    try {
        console.log("checkkkk")
        const { empId, leaveType, from, to, numberOfDays, reason } = req.body;

        const emp = await EmpModel.findOne({empId});

        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if(emp.role === "3P"){
            if(leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId})
                if(cl.availed < 1){
                    const leave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
                else{
                    return res.status(202).json({ message: 'Casual Leave Limit Exceded' });
                }
            }
            else if(leaveType === "Paternity Leave"){
                const pl = await PaternityLeave.findOne({empId})
                if(pl.availed < 5){
                    const leave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
                else{
                    return res.status(404).json({ message: 'Paternity Leave Limit Exceded' });
                }
            }
            else{
                return res.status(404).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        else{
            if(leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId})
                if(cl.availed < 10){
                    const leave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
                else{
                    return res.status(404).json({ message: 'Casual Leave Limit Exceded' });
                }
            }
            else if(leaveType === "Privelage Leave"){
                const pl = await PrivelageLeave.findOne({empId})
                if(pl.availed < 16){
                    const leave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
                else{
                    return res.status(404).json({ message: 'Privelage Leave Limit Exceded' });
                }
            }
            else if(leaveType === "Paternity Leave"){
                const pl = await PaternityLeave.findOne({empId})
                if(pl.availed < 5){
                    const leave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
                else{
                    return res.status(404).json({ message: 'Paternity Leave Limit Exceded' });
                }
            }
            else{
                return res.status(404).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const LOP = async(req, res) => {
    try{
        const { empId, leaveType, from, to, numberOfDays, reason } = req.body;

        const emp = await EmpModel.findOne({empId});

        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const leave = new LeaveModel({
            empId,
            leaveType,
            from,
            to,
            numberOfDays,
            reason,
            isLOP: true
        })
        await leave.save()
        res.status(201).json({ message: 'LOP Leave applied successfully', leave });
    } catch(err){
        res.status(500).json({ message: 'Server error', error });
    }
}

// Accept leave
const AcceptLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;

        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        if(leave.isLOP){
            if(leave.leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId: leave.empId})
                cl.LOP += 1;
                cl.eligibility -= 1;
                cl.totalEligibility -= 1;
                cl.closingBalance -= 1;
                cl.futureClosingBalance -= 1;
                await cl.save()
            }
            else if(leave.leaveType === "Privelage Leave"){
                const pl = await PrivelageLeave.findOne({empId: leave.empId})
                pl.LOP += 1;
                pl.eligibility -= 1;
                pl.totalEligibility -= 1;
                pl.closingBalance -= 1;
                pl.futureClosingBalance -= 1;
                await pl.save()
            }
            else{
                const pl = await PaternityLeave.findOne({empId: leave.empId})
                pl.LOP += 1;
                pl.eligibility -= 1;
                pl.totalEligibility -= 1;
                pl.closingBalance -= 1;
                pl.futureClosingBalance -= 1;
                await pl.save()
            }
        }
        else{
            if(leave.leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId: leave.empId})
                cl.availed += 1;
                cl.eligibility -= 1;
                cl.totalEligibility -= 1;
                cl.closingBalance -= 1;
                cl.futureClosingBalance -= 1;
                await cl.save()
            }
            else if(leave.leaveType === "Privelage Leave"){
                const pl = await PrivelageLeave.findOne({empId: leave.empId})
                pl.availed += 1;
                pl.eligibility -= 1;
                pl.totalEligibility -= 1;
                pl.closingBalance -= 1;
                pl.futureClosingBalance -= 1;
                await pl.save()
            }
            else{
                const pl = await PaternityLeave.findOne({empId: leave.empId})
                pl.availed += 1;
                pl.eligibility -= 1;
                pl.totalEligibility -= 1;
                pl.closingBalance -= 1;
                pl.futureClosingBalance -= 1;
                await pl.save()
            }
        }

        leave.status = 'Approved';
        await leave.save();
        // res.status(200).json({ message: 'Leave approved successfully', leave });
        const filePath = path.join(__dirname, "../view/accept.html");
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Deny leave
const DenyLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;

        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        leave.status = 'Denied';
        await leave.save();

        // res.status(200).json({ message: 'Leave denied successfully', leave });
        const filePath = path.join(__dirname, "../view/reject.html");
        res.sendFile(filePath);
        res.status(200).json({msg:"hello"})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get leaves taken by a particular employee
const GetLeave = async (req, res) => {
    try {
        const { empId } = req.body;

        const leaves = await LeaveModel.find({ empId });
        if (!leaves.length) {
            return res.status(404).json({ message: 'No leaves found for this employee' });
        }

        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {ApplyLeave,LOP,AcceptLeave,DenyLeave,GetLeave}
