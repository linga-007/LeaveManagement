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
        message: {
            type: String,
            required: true
        },
        subject: {
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

const Circular = db.model('circular', schema)
module.exports = { Circular }
