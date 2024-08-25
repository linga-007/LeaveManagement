const { LeaveModel } = require('../models/leaveSchema'); // Replace with the correct path

// Apply for leave
const ApplyLeave = async (req, res) => {
    try {
        const { empId, leaveType, from, to, numberOfDays, reason } = req.body;

        const newLeave = new LeaveModel({
            empId,
            leaveType,
            from,
            to,
            numberOfDays,
            reason
        });

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

        leave.status = 'Approved';
        await leave.save();

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
