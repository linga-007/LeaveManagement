const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config('./env')
const { EmpModel } = require('../models/employeeSchema');

// Signup
const Signup = async (req, res) => {
    try {
        const { empId, password, empName, role, designation, reportionManager, dateOfJoining, function: empFunction, department, level, location, isPaternity, CL, PL, paternityLeave } = req.body;

        // Check if employee already exists
        const existingEmployee = await EmpModel.findOne({ empId });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this ID already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new employee
        const newEmployee = new EmpModel({
            empId,
            password: hashedPassword,
            empName,
            role,
            designation,
            reportionManager,
            dateOfJoining,
            function: empFunction,
            department,
            level,
            location,
            isPaternity,
            CL,
            PL,
            paternityLeave
        });

        await newEmployee.save();

        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Login
const Login = async (req, res) => {
    try {
        const { empId, password } = req.body;

        // Find employee by ID
        const employee = await EmpModel.findOne({ empId });
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ empId: employee.empId, role: employee.role }, process.env.SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get all employees
const GetEmp = async (req, res) => {
    try {
        const employees = await EmpModel.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {Login,Signup,GetEmp}