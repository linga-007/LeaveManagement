const db = require('mongoose')

const schema = new db.Schema(
    {
        empId: {
            type: String,
            required: true
        },
        empName: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['Admin', 'Manager', '3P', 'GVR'],
            default: '3P'
        },
        date:{
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        hrs: {
            type: Number,
            min: 1,
            max: 2
        },
        reason: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Approved', 'Denied'],
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
);

const PermissionModel = db.model('permission', schema)
module.exports = { PermissionModel }