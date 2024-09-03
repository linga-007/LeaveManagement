const db = require('mongoose')

const schema = new db.Schema(
    {
        empId: {
            type: String,
            required: true
        },
        empName:{
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: ['Admin', 'Manager', '3P', 'GVR'],
            default: '3P'
        },
        leaveType: {
            type: String,
            enum: ['Casual Leave', 'Privelage Leave', 'Paternity Leave'],
            default: 'Casual Leave'
        },
        from: {
            type: Object,
            required: true
        },
        to: {
            type: Object,
            required: true
        },
        numberOfDays: {
            type: Number,
            required: true
        },
        reason: {
            type: String,
            enum: ['Personal', 'Medical', 'Peternity', 'Family Function'],
            default: 'Personal'
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Approved', 'Denied'],
            default: 'Pending'
        },
        isLOP: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const LeaveModel = db.model('leave', schema)
module.exports = { LeaveModel }