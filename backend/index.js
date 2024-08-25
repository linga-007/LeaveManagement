const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const dotenv = require('dotenv')
const EmpRout = require('./routes/employeeRout')
const LeaveRout = require('./routes/leaveRout')
const PermissionRout = require('./routes/permissionRout')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors());
   
dotenv.config('./env')

app.use('/emp',EmpRout)
app.use('/leave',LeaveRout)
app.use('/permission',PermissionRout)

cron.schedule('* * * * *', () => {
    const now = new Date();
    if (now.getDate() === 1) {
        resetData();
    }
});

const resetData = async() => {
    console.log('reset')
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