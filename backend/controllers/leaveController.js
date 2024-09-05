const path = require('path');
const { LeaveModel } = require('../models/leaveSchema'); 
const { EmpModel } = require('../models/employeeSchema');
const { CasualLeave } = require('../models/casualLeaveSchema');
const { PrivelageLeave } = require('../models/privelageLeaveSchema');
const { PaternityLeave } = require('../models/paternityLeaveSchema');
const { Accepted, Rejected } = require('../utils/AdminResponseLeave')

// Apply for leave
const ApplyLeave = async (req, res) => {
    try {
        console.log(req.body)
        const { empId, leaveType, from, to, numberOfDays, reason, LOP } = req.body;

        const emp = await EmpModel.findOne({empId});

        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if(emp.role === "3P"){
            if(leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId})
                if(cl.availed < 1){
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
            }
            else if(leaveType === "Paternity Leave" && emp.isPaternity){
                const pl = await PaternityLeave.findOne({empId})
                if(pl.availed < 5){
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
            }
            else{
                return res.status(400).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        else{
            if(leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId})
                if(cl.availed < 10){
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
            }
            else if(leaveType === "Privelage Leave"){
                const pl = await PrivelageLeave.findOne({empId})
                if(pl.availed < 16){
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
            }
            else if(leaveType === "Paternity Leave" && emp.isPaternity){
                const pl = await PaternityLeave.findOne({empId})
                if(pl.availed < 5){
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
                }
            }
            else{
                return res.status(400).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// const LOP = async(req, res) => {
//     try{
//         const { empId, leaveType, from, to, numberOfDays, reason } = req.body;
     

//         const emp = await EmpModel.findOne({empId});

//         if (!emp) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }
//         const leave = new LeaveModel({
//             empId,
//             empName: emp.empName,
//             role: emp.role,
//             leaveType,
//             from,
//             to,
//             numberOfDays,
//             reason,
//             isLOP: true
//         })
//         await leave.save()
//         res.status(201).json({ message: 'LOP Leave applied successfully', leave });
//     } catch(err){
//         res.status(500).json({ message: 'Server error', err });
//     }
// }

// Accept leave
const AcceptLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;
        console.log("leave in backend" , leaveId)

        const leave = await LeaveModel.findById(leaveId);
        console.log("leave is " , leave)
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        if (leave.status === 'Approved'){
            const filePath = path.join(__dirname, "../view/alreadyAccepted.html");
            res.sendFile(filePath);
        }
        else if(leave.status === 'Denied'){
            const filePath = path.join(__dirname, "../view/alreadyRejected.html");
            res.sendFile(filePath);
        }
        else{
            if(leave.leaveType === "Casual Leave" && leave.role === '3P'){
                console.log("CL")
                const cl = await CasualLeave.findOne({empId: leave.empId})
                cl.availed += 1;
                cl.LOP += leave.LOP;
                cl.eligibility -= 1;
                cl.totalEligibility -= 1;
                cl.closingBalance -= 1;
                cl.futureClosingBalance -= 1;
                await cl.save()
            }
            else if(leave.leaveType === "Casual Leave" && leave.role === 'GVR'){
                console.log("CL")
                const cl = await CasualLeave.findOne({empId: leave.empId})
                cl.availed += leave.numberOfDays;
                cl.LOP += leave.LOP;
                cl.eligibility -= leave.numberOfDays;
                cl.totalEligibility -= leave.numberOfDays;
                cl.closingBalance -= leave.numberOfDays;
                cl.carryForward -= leave.numberOfDays;
                cl.futureClosingBalance -= leave.numberOfDays;
                await cl.save()
            }
            else if(leave.leaveType === "Privelage Leave"){
                const pl = await PrivelageLeave.findOne({empId: leave.empId})
                pl.availed += leave.numberOfDays;
                pl.LOP += leave.LOP;
                pl.eligibility -= leave.numberOfDays;
                pl.totalEligibility -= leave.numberOfDays;
                pl.closingBalance -= leave.numberOfDays;
                pl.carryForward -= leave.numberOfDays;
                pl.futureClosingBalance -= leave.numberOfDays;
                await pl.save()
            }
            else{
                const pl = await PaternityLeave.findOne({empId: leave.empId})
                pl.availed += 1;
                pl.LOP += leave.LOP;
                pl.eligibility -= 1;
                pl.totalEligibility -= 1;
                pl.closingBalance -= 1;
                pl.futureClosingBalance -= 1;
                await pl.save()
            }
            if(leave.status === 'Pending'){
                leave.status = 'Approved';
                await leave.save();
            }
            const filePath = path.join(__dirname, "../view/accept.html");
            const emp = await EmpModel.findOne({empId: leave.empId})
            // Accepted(emp.empMail)
            Accepted('mohammedashif.a2022cse@sece.ac.in')
            res.sendFile(filePath);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const Accept = async (req, res) => {
    try {
        const { leaveId } = req.body;
        console.log(leaveId)
        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        if (leave.status === 'Approved'){
            res.status(401).json({ message: 'Already Accepted' });
        }
        else if(leave.status === 'Rejected'){
            res.status(401).json({ message: 'Already Rejected' });

        }
        else{
            if(leave.leaveType === "Casual Leave" && leave.role === '3P'){
                console.log("CL")
                const cl = await CasualLeave.findOne({empId: leave.empId})
                cl.availed += 1;
                cl.LOP += leave.LOP;
                cl.eligibility -= 1;
                cl.totalEligibility -= 1;
                cl.closingBalance -= 1;
                cl.futureClosingBalance -= 1;
                await cl.save()
            }
            else if(leave.leaveType === "Casual Leave" && leave.role === 'GVR'){
                console.log("CL")
                const cl = await CasualLeave.findOne({empId: leave.empId})
                cl.availed += leave.numberOfDays;
                cl.LOP += leave.LOP;
                cl.eligibility -= leave.numberOfDays;
                cl.totalEligibility -= leave.numberOfDays;
                cl.closingBalance -= leave.numberOfDays;
                cl.carryForward -= leave.numberOfDays;
                cl.futureClosingBalance -= leave.numberOfDays;
                await cl.save()
            }
            else if(leave.leaveType === "Privelage Leave"){
                const pl = await PrivelageLeave.findOne({empId: leave.empId})
                pl.availed += leave.numberOfDays;
                pl.LOP += leave.LOP;
                pl.eligibility -= leave.numberOfDays;
                pl.totalEligibility -= leave.numberOfDays;
                pl.closingBalance -= leave.numberOfDays;
                pl.carryForward -= leave.numberOfDays;
                pl.futureClosingBalance -= leave.numberOfDays;
                await pl.save()
            }
            else{
                const pl = await PaternityLeave.findOne({empId: leave.empId})
                pl.availed += 1;
                pl.LOP += leave.LOP;
                pl.eligibility -= 1;
                pl.totalEligibility -= 1;
                pl.closingBalance -= 1;
                pl.futureClosingBalance -= 1;
                await pl.save()
            }
            leave.status = 'Approved';
            await leave.save();
            const emp = await EmpModel.findOne({empId: leave.empId})
            // Accepted(emp.empMail)
            Accepted('mohammedashif.a2022cse@sece.ac.in')
            res.status(200).json({ message: 'Leave approved successfully', leave });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Deny leave
const DenyLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;

        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        if (leave.status === 'Approved'){
            const filePath = path.join(__dirname, "../view/alreadyAccepted.html");
            res.sendFile(filePath);
        }
        else if(leave.status === 'Denied'){
            const filePath = path.join(__dirname, "../view/alreadyRejected.html");
            res.sendFile(filePath);
        }
        else{
            leave.status = 'Denied';
            await leave.save();
            const filePath = path.join(__dirname, "../view/reject.html");
            const emp = await EmpModel.findOne({empId: leave.empId})
            // Rejected(emp.empMail)
            Rejected('mohammedashif.a2022cse@sece.ac.in')
            res.sendFile(filePath);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const Deny = async (req, res) => {
    try {
        const { leaveId } = req.body;

        const leave = await LeaveModel.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        leave.status = 'Denied';
        await leave.save();
        const emp = await EmpModel.findOne({empId: leave.empId})
        console.log(emp.empMail)
        // Rejected(emp.empMail)
        Rejected('mohammedashif.a2022cse@sece.ac.in')
        res.status(200).json({ message: 'Leave denied successfully', leave });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const checkLeave = async(req, res) => {
    try{
        const { empId, role, leaveType, from, numberOfDays } = req.body
        // console.log(from.firstHalf)
        if(from.firstHalf === true){
            const data = await LeaveModel.find({empId: empId, "from.date": from.date, "from.first-half": true})
            console.log(data.length)
            console.log(data)
            if(data.length){
                return res.status(300).json({ mesasage: "Already leave had applied in the same day" })
            }
        }
        else if(from.secondHalf === true){
            const data = await LeaveModel.findOne({empId: empId, "from.date": from.date, "from.second-half": true})
            if(data){
                return res.status(300).json({ mesasage: "Already leave had applied in the same day" })
            }
        }

        if(role === '3P'){
            const cl = await CasualLeave.findOne({empId: empId})
            if(numberOfDays > 1 && cl.availed === 0){
                res.status(200).json({ CL: 1, LOP: numberOfDays-1 })
            }
            else if(numberOfDays > 1 && cl.availed !== 0){
                res.status(200).json({ CL: 0, LOP: numberOfDays })
            }
            else{
                res.status(200).json({ CL: 1, LOP: 0 })
            }
        }
        else{
            if(leaveType === 'Casual Leave'){
                const cl = await CasualLeave.findOne({empId: empId})
                console.log(cl)
                if(numberOfDays > cl.eligibility){
                    res.status(200).json({ CL: cl.eligibility, LOP: numberOfDays-cl.eligibility })
                }
                else{
                    res.status(200).json({ CL: numberOfDays, LOP: 0 })
                }
            }
            else if(leaveType === 'privilage Leave'){
                console.log("check")
                const pl = await PrivelageLeave.findOne({empId: empId})
                console.log(pl)
                if(numberOfDays > pl.eligibility){
                    res.status(200).json({ PL: pl.eligibility, LOP: numberOfDays-pl.eligibility })
                }
                else{
                    res.status(200).json({ PL: numberOfDays, LOP: 0 })
                }
            }
            else{
                const pl = await PaternityLeave.findOne({empId: empId})
                if(numberOfDays > 1){
                    res.status(200).json({ PL: pl.eligibility, LOP: numberOfDays-pl.eligibility })
                }
                else{
                    res.status(200).json({ PL: numberOfDays, LOP: 0 })
                }
            }
        }
    }
    catch(err){
        res.status(500).json({ message: "Server error", error: err })
    }
}

const GetLeave = async (req, res) => {
    try {
        const { empId } = req.body;
        const employee = await EmpModel.findOne({empId});
        if(employee.role === 'Manager'){
            const leaves = await LeaveModel.find({});

            res.status(200).json(leaves);
        }
        else{
            const leaves = await LeaveModel.find({ empId });
        if (!leaves.length) {
            return res.status(404).json({ message: 'No leaves found for this employee' });
        }
        res.status(200).json(leaves);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {checkLeave,ApplyLeave,AcceptLeave,Accept,DenyLeave,Deny,GetLeave}