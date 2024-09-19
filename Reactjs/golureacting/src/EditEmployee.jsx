import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditEmployee.css';
import { useNavigate } from 'react-router-dom';

function EditEmployee({ employeeData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: 'HR',
    gender: 'M',
    courses: {
      MCA: false,
      BCA: false,
      BSC: false,
    },
    image: null, // File input remains null initially
  });

  const navigate = useNavigate();

  // Populate form with existing employee data
  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.name,
        email: employeeData.email,
        mobileNo: employeeData.mobileNo,
        designation: employeeData.designation || 'HR',
        gender: employeeData.gender || 'M',
        courses: {
          MCA: employeeData.courses?.MCA || false,
          BCA: employeeData.courses?.BCA || false,
          BSC: employeeData.courses?.BSC || false,
        },
        image: null, // Keep null for file input
      });
    }
  }, [employeeData]);

  // Handle input changes for text/select/radio inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox input for courses
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        [name]: checked,
      },
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('mobileNo', formData.mobileNo);
    submitData.append('designation', formData.designation);
    submitData.append('gender', formData.gender);
    submitData.append('courses', JSON.stringify(formData.courses));
  
    // Append image if selected
    if (formData.image) {
      submitData.append('image', formData.image);
    }
  
    try {
      // Send the PUT request to /edit route with email in the body
      const response = await axios.put(`http://localhost:3000/employees/edit`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
  
      // Handle success
      console.log('Employee updated:', response.data);
      navigate('/employee-list');
    } catch (error) {
      console.error('There was an error updating the employee:', error);
      alert('Error updating employee. Please try again.');
    }
  };
  

  return (
    <div className="container">
      <h1 className="page-heading">Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mobile No:
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Designation:
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>

        <legend>Gender:</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === 'M'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === 'F'}
            onChange={handleChange}
          />
          Female
        </label>

        <legend>Courses:</legend>
        <label>
          <input
            type="checkbox"
            name="MCA"
            checked={formData.courses.MCA}
            onChange={handleCheckboxChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BCA"
            checked={formData.courses.BCA}
            onChange={handleCheckboxChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BSC"
            checked={formData.courses.BSC}
            onChange={handleCheckboxChange}
          />
          BSC
        </label>

        <label>
          Image Upload:
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </label>

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;
