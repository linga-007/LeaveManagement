const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const dotenv = require('dotenv')
const EmpRoute = require('./routes/employeeRoute')
const LeaveRoute = require('./routes/leaveRoute')
const PermissionRoute = require('./routes/permissionRoute')
const TableRoute = require('./routes/tableRoute')
const Email = require('./routes/mailRoute')
const Circular = require('./routes/circularRoute')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors());
   
dotenv.config('./env')

app.use('/emp',EmpRoute)
app.use('/leave',LeaveRoute)
app.use('/permission',PermissionRoute)
app.use('/table',TableRoute)
app.use('/mail', Email)
app.use('/circular', Circular)

// cron.schedule('0 0 1 2 *', () => {
//     resetGVR();
// });

cron.schedule('0 0 1 * *', () => {
    reset3P();
});

cron.schedule('0 0 1 * *', () => {
    resetPermission();
});

cron.schedule('0 0 1 1 *', () => {
    carryForward();
});

const reset3P = async() => {
    //reset Eligibility = 12, Total Eligibility = 12, Availed = 0, LOP = 0, Closing Balance = 12
    console.log('3P')
}

const resetGVR = async() => {
    //reset Eligibility = 16, Total Eligibility = 16, Availed = 0, LOP = 0, Closing Balance = 16, Closing Balance = 16
    console.log('GVR')
}

const resetPermission = async() => {
    console.log('Permission')
}

const carryForward = async() => {
    console.log('carryForward')
}

app.get("/test", (req, res)=>{
    try{
        res.status(200).json({error: false, message: "API works successfully"})
    } catch(err){
        res.status(500).json({error: true, message: err.message})
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})

try{
    const connectDb = async()=>{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected')
    }
    connectDb()
} catch(err){
    console.log(err)
}