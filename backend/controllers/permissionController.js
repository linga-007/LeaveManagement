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
                empName: emp.empName,
                role: emp.role,
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
            return res.status(203).json({ message: 'Insufficient permission level' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Accept permission
const AcceptPermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        console.log(permissionId);
        const permission = await PermissionModel.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        const emp = await EmpModel.findOne({empId: permission.empId});
        console.log(emp);

        if(permission.status === 'Pending'){
            emp.permissionAvailed += permission.hrs;
            emp.permissionEligible -= permission.hrs;
            permission.status = 'Approved';
            await permission.save();
            await emp.save();
            const filePath = path.join(__dirname, "../view/accept.html");
            Accepted('lingeshwaran.kv2022cse@sece.ac.in')
            res.sendFile(filePath);
        }
        else{
            return res.status(403).json({ message: 'Permission already approved or denied' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const Accept = async (req, res) => {
    try {
        const { permissionId } = req.body;
        console.log(permissionId);
        const permission = await PermissionModel.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        const emp = await EmpModel.findOne({empId: permission.empId});
        console.log(emp);

        if(permission.status === 'Pending'){
            emp.permissionAvailed += permission.hrs;
            emp.permissionEligible -= permission.hrs;
            permission.status = 'Approved';
            await permission.save();
            await emp.save();
            Accepted('lingeshwaran.kv2022cse@sece.ac.in')
            res.status(200).json({ message: 'Permission approved successfully', permission });
        }
        else{
            return res.status(403).json({ message: 'Permission already approved or denied' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Deny permission
const DenyPermission = async (req, res) => {
    try {
        const { permissionId } = req.params;

        const permission = await PermissionModel.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        permission.status = 'Denied';
        await permission.save();
        // Rejected('kkishorekumar536@gmail.com')
        const filePath = path.join(__dirname, "../view/reject.html");
        Rejected('lingeshwaran.kv2022cse@sece.ac.in')
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const Deny = async (req, res) => {
    try {
        const { permissionId } = req.body;

        const permission = await PermissionModel.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        permission.status = 'Denied';
        await permission.save();
        Rejected('lingeshwaran.kv2022cse@sece.ac.in')
        res.status(200).json({ message: 'Permission denied successfully', permission });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get permissions granted to a particular employee
const GetPermission = async (req, res) => {
    try {
        const { empId } = req.body;
        const employee = await EmpModel.findOne({empId});
        if(employee.role === 'Manager'){
            const permissions = await PermissionModel.find();
            res.status(200).json(permissions);
        }
        else{
            const permissions = await PermissionModel.find({ empId });
        if (!permissions.length) {
            return res.status(404).json({ message: 'No permissions found for this employee' });
        }
        res.status(200).json(permissions);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {ApplyPermission,AcceptPermission,Accept,DenyPermission,Deny,GetPermission}