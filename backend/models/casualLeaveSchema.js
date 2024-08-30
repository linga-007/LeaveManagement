const db = require('mongoose')

const schema = new db.Schema(
    {
        empId: {
            type: String,
            required: true
        },
        opBalance: {
            type: Number,
            default: 0
        },
        eligibility: {
            type: Number,
            default: 0
        },
        totalEligibility: {
            type: Number,
            default: 0
        },
        availed: {
            type: Number,
            default: 0
        },
        LOP: {
            type: Number,
            default: 0
        },
        leaveLapsed: {
            type: Number,
            default: 0
        },
        leaveEncashed: {
            type: Number,
            default: 0
        },
        closingBalance: {
            type: Number,
            default: 0
        },
        carryForward: {
            type: Number,
            default: 0
        },
        futureAvailed: {
            type: Number,
            default: 0
        },
        futureClosingBalance: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const CasualLeave = db.model('casualLeave', schema)
module.exports = { CasualLeave }