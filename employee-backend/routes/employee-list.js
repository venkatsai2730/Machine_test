const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const upload = require('../config/multer-config');  // Make sure multer config exists
const employeeModel = require('../models/user');    // Employee model

// GET /employees - Get the list of employees
router.get('/', async (req, res) => {
    try {
        const employees = await employeeModel.find();
        const employeesWithBase64Images = employees.map(employee => {
            return {
                ...employee._doc,
                image: employee.image ? `data:image/jpeg;base64,${employee.image.toString('base64')}` : null
            };
        });
        console.log(employeesWithBase64Images[0].name)
        res.status(200).json(employeesWithBase64Images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); 

// POST /employees/create - Create a new employee with validations
router.post('/create',
    upload.single('image'),
    [
        // Validate required fields
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('mobile').isNumeric().withMessage('Mobile number must be numeric'),
        body('designation').notEmpty().withMessage('Designation is required'),
        body('gender').notEmpty().withMessage('Gender is required'),
        body('course').notEmpty().withMessage('Course is required'),
    ],
    async (req, res) => {
        
        // Check validation results
        const errors = validationResult(req);
        console.log(errors);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check for duplicate email
        const existingEmployee = await employeeModel.findOne({ email: req.body.email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        try {
            const { name, email, mobile, designation, gender, course } = req.body;
            const image = req.file ? req.file.buffer : null;
            console.log(req.body);
            const newEmployee = await employeeModel.create({
                image,
                name,
                email,
                mobile,
                designation,
                gender,
                course
            });

            res.status(201).json(newEmployee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

// PUT /employees/edit/:id - Edit an employee with validations
// Update employee by email
router.put('/edit', upload.single('image'), async (req, res) => {
    const { email, name, mobileNo, designation, gender, courses } = req.body;
    console.log(req.body);
  
    try {
      const updateData = { name, mobileNo, designation, gender, courses };
  
      // If an image file is uploaded, add it to the update data
      if (req.file) {
        updateData.image = req.file.buffer; // Assuming you're using buffer for file storage
      }
  
      // Update the employee by email
      const updatedEmployee = await employeeModel.findOneAndUpdate(
        { email },
        updateData,
        { new: true }
      );
     
   
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
   
      res.status(200).json(updatedEmployee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// DELETE /employees/delete/:id - Delete an employee
router.delete('/delete',
    [
        // Validate that email is provided
        body('email').isEmail().withMessage('Valid email is required'),
    ],
    async (req, res) => {
        // Extract email from the request body
        const { email } = req.body;

        // Check validation results
        try {
            const deletedEmployee = await employeeModel.findOneAndDelete({ email });

            if (!deletedEmployee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            res.status(200).json({ message: "Employee deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


module.exports = router;
