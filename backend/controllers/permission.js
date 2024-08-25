const { PermissionModel } = require('../models/permissionSchem'); // Replace with the correct path

// Apply for permission
const ApplyPermission = async (req, res) => {
    try {
        const { empId, role, hrs, reason } = req.body;

        const newPermission = new PermissionModel({
            empId,
            role,
            hrs,
            reason
        });

        await newPermission.save();

        res.status(201).json({ message: 'Permission applied successfully', permission: newPermission });
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

        permission.status = 'Approved';
        await permission.save();

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