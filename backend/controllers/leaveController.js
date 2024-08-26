const { LeaveModel } = require('../models/leaveSchema'); 
const { EmpModel } = require('../models/employeeSchema')

// Apply for leave
const ApplyLeave = async (req, res) => {
    try {
        const { empId, leaveType, from, to, numberOfDays, reason } = req.body;

        const emp = await EmpModel.findById(empId);
        if (!empId) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if(emp.role === "3P"){
            if(leaveType === "Casual Leave"){
                if(emp.CL < 1){
                    const newLeave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    });
                }else{
                    return res.status(404).json({ message: 'Leave Limit Exceded' });
                }
            }
            else{
                return res.status(404).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        else{
            if(leaveType === "Casual Leave"){
                if(emp.CL < 10){
                    const newLeave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    });
                }else{
                    return res.status(404).json({ message: 'Leave Limit Exceded' });
                }
            }
            else if(leaveType === "Privelage Leave"){
                if(emp.PL < 16){
                    const newLeave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    });
                }else{
                    return res.status(404).json({ message: 'Leave Limit Exceded' });
                }
            }
            else{
                if(emp.isPaternity && emp.paternityLeave < 5){
                    const newLeave = new LeaveModel({
                        empId,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reason
                    });
                }
                else{
                    return res.status(404).json({ message: 'Leave Limit Exceded' });
                }
            }
        }

        await newLeave.save();

        res.status(201).json({ message: 'Leave applied successfully', leave: newLeave });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Accept leave
const AcceptLeave = async (req, res) => {
    try {
        const { leaveId } = req.body;

        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        const emp = await EmpModel.findById(leave.empId);
        if(leave.leaveType === "Casual Leave"){
            emp.CL += 1;
        }
        else if(leave.leaveType === "Privelage Leave"){
            emp.PL += 1;
        }
        else{
            emp.paternityLeave += 1;
        }
        leave.status = 'Approved';
        await leave.save();
        await emp.save();

        res.status(200).json({ message: 'Leave approved successfully', leave });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Deny leave
const DenyLeave = async (req, res) => {
    try {
        const { leaveId } = req.body;

        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        leave.status = 'Denied';
        await leave.save();

        res.status(200).json({ message: 'Leave denied successfully', leave });
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

module.exports = {ApplyLeave,AcceptLeave,DenyLeave,GetLeave}
