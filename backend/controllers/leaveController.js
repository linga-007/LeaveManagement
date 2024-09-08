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
        // console.log(req.body)
        const { empId, leaveType, from, to, numberOfDays, reasonType, reason, LOP } = req.body;
        var list = []

        for(let i = parseInt(from.date.slice(0,2))+1; i < parseInt(to.date.slice(0,2)); i++) {
            if(i < 10){
                list.push(0+i.toString())
            }
            else{
                list.push(i.toString())
            }
        }

        console.log(list)

        const emp = await EmpModel.findOne({empId});

        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if(emp.role === "3P"){
            if(leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId})
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        days: list,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
            }
            else if(leaveType === "Paternity Leave" && emp.isPaternity){
                const pl = await PaternityLeave.findOne({empId})
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        days: list,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
            }
            else{
                return res.status(400).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        else{
            if(leaveType === "Casual Leave"){
                const cl = await CasualLeave.findOne({empId})
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        days: list,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
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
                        days: list,
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
                    const leave = new LeaveModel({
                        empId,
                        empName: emp.empName,
                        role: emp.role,
                        leaveType,
                        from,
                        to,
                        numberOfDays,
                        days: list,
                        reasonType,
                        reason,
                        LOP
                    })
                    await leave.save()
                    res.status(201).json({ message: 'Leave applied successfully', leave });
            }
            else{
                return res.status(400).json({ message: 'Permission Denied to Apply Leave' });
            }
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const withDrawLeave = async(req, res) => {
    try{
        const { leaveId } = req.body;
        const leave = await LeaveModel.findById(leaveId);
        if(leave.status === 'Pending'){
            leave.status = 'Withdrawn';
            await leave.save();
            res.status(200).json({message: 'Leave withdrawn successfully'})
        }
        else{
            res.status(400).json({message: 'Leave request has already been responded as '+leave.status})
        }
    }
    catch(err){
        res.status(500).json({ message: 'Server error', err });
    }
}

const updateStatus = async(req, res)=> {
    try{
        const { empId, leaveId, status } = req.body;
        const emp = await EmpModel.findOne({empId})
        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        if(emp.role === 'Manager'){
            const leave = await LeaveModel.findByIdAndUpdate(leaveId, { $set: { status } });
            res.status(200).json({message: 'Leave status updated successfully'})
        }
        else{
            res.status(404).json({message: 'You are not allowed perform this operation'})
        }
    }
    catch(err){
        res.status(500).json({ message: 'Server error', err });
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
                const filePath = path.join(__dirname, "../view/accept.html");
                const emp = await EmpModel.findOne({empId: leave.empId})
                Accepted('mohammedashif.a2022cse@sece.ac.in')
                res.sendFile(filePath);
            }
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
            res.status(202).json({ message: 'Already Accepted' });
        }
        else if(leave.status === 'Rejected'){
            res.status(202).json({ message: 'Already Rejected' });

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
                const emp = await EmpModel.findOne({empId: leave.empId})
                Accepted('mohammedashif.a2022cse@sece.ac.in')
                res.status(200).json({ message: 'Leave approved successfully', leave });
            }
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
        if (leave.status === 'Denied'){
            res.status(202).json({ message: 'Already Denied' });
        }
        else if(leave.status === 'Approved'){
            res.status(202).json({ message: 'Already Accepted' });
        }
        else{
            leave.status = 'Denied';
            await leave.save();
            const emp = await EmpModel.findOne({empId: leave.empId})
            console.log(emp.empMail)
            Rejected('mohammedashif.a2022cse@sece.ac.in')
            res.status(200).json({ message: 'Leave denied successfully', leave });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const checkLeave = async(req, res) => {
    try{
        const { empId, role, leaveType, from, numberOfDays } = req.body
        console.log(from.date.slice(0,2))
        console.log(from.secondHalf)
        const fromData = await LeaveModel.find({empId: empId, "from.date": from.date, "from.firstHalf": true})
        const toData = await LeaveModel.find({empId: empId, "to.date": from.date, "to.firstHalf": true})
        const From = await LeaveModel.find({empId: empId, "from.date": from.date, "from.secondHalf": true})
        const To = await LeaveModel.find({empId: empId, "to.date": from.date, "to.secondHalf": true})
        if(from.firstHalf && (fromData.length || toData.length)){
            return res.status(202).json({ mesasage: "Already leave had applied in the same day" })
        }
        else if(from.secondHalf && (From.length || To.length)){
            console.log(from.firstHalf)
            return res.status(202).json({ mesasage: "Already leave had applied in the same day" })
        }

        const data = await LeaveModel.find({empId: empId, days: { $in: [from.date.slice(0,2)] }})
        if(data.length){
            return res.status(202).json({ mesasage: "Already leave had applied in the same day" })
        }

        if(role === '3P'){
            const cl = await CasualLeave.findOne({empId: empId})
            if(numberOfDays >= 1 && cl.availed === 0){
                res.status(200).json({ CL: 1, LOP: numberOfDays-1 })
            }
            else if(numberOfDays >= 1 && cl.availed !== 0){
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
                if(numberOfDays >= cl.eligibility){
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
                if(numberOfDays >= pl.eligibility){
                    res.status(200).json({ PL: pl.eligibility, LOP: numberOfDays-pl.eligibility })
                }
                else{
                    res.status(200).json({ PL: numberOfDays, LOP: 0 })
                }
            }
            else{
                const pl = await PaternityLeave.findOne({empId: empId})
                if(numberOfDays >= 1){
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

module.exports = {checkLeave,ApplyLeave,withDrawLeave,updateStatus,AcceptLeave,Accept,DenyLeave,Deny,GetLeave}