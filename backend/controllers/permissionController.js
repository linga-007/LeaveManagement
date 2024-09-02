const { EmpModel } = require('../models/employeeSchema');
const { PermissionModel } = require('../models/permissionSchem'); // Replace with the correct path
const { Accepted, Rejected } = require('../utils/AdminResponseLeave')

// Apply for permission
const ApplyPermission = async (req, res) => {
    try {
        const { empId, date, from, to, hrs, reason } = req.body;
       
        const emp = await EmpModel.findOne({empId});
        if (!empId) {
            return res.status(404).json({ message: 'Employee not found' });
        }
       
        if(emp.permissionAvailed < 4){
            const newPermission = new PermissionModel({
                empId,
                date,
                from,
                to,
                hrs,
                reason
            });
            await newPermission.save();
            res.status(201).json({ message: 'Permission applied successfully', permission: newPermission });
        }
        else{
            return res.status(403).json({ message: 'Insufficient permission level' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Accept permission
const AcceptPermission = async (req, res) => {
    try {
        const { permissionId } = req.body;

        const permission = await PermissionModel.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        const emp = await EmpModel.findById(permission.empId);

        emp.permission += 1;
        permission.status = 'Approved';
        await permission.save();
        await emp.save();
        Accepted()
        res.status(200).json({ message: 'Permission approved successfully', permission });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Deny permission
const DenyPermission = async (req, res) => {
    try {
        const { permissionId } = req.body;

        const permission = await PermissionModel.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        permission.status = 'Denied';
        await permission.save();
        Rejected()
        res.status(200).json({ message: 'Permission denied successfully', permission });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get permissions granted to a particular employee
const GetPermission = async (req, res) => {
    try {
        const { empId } = req.body;

        const permissions = await PermissionModel.find({ empId });
        if (!permissions.length) {
            return res.status(404).json({ message: 'No permissions found for this employee' });
        }

        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {ApplyPermission,AcceptPermission,DenyPermission,GetPermission}