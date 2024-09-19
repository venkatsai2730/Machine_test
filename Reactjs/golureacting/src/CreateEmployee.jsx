import React, { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './CreateEmployee.css';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: 'M',
    course: {
      MCA: false,
      BCA: false,
      BSC: false,
    },
    image: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      course: {
        ...prev.course,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data for file upload
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('mobile', formData.mobile);
    submitData.append('designation', formData.designation);
    submitData.append('gender', formData.gender);
    submitData.append('image', formData.image);

    // Append course as stringified object
    submitData.append('course', JSON.stringify(formData.course));

    try {
      const response = await axios.post('http://localhost:3000/employees/create', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      // Handle success
      console.log('Employee created:', response.data);
      
      
      // Redirect to /employee-list after successful creation
      navigate('/employee-list');
    } catch (error) {
      console.error('There was an error creating the employee:', error);
      alert('Error creating employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="page-heading">Create Employee</h1>
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
            name="mobile"
            value={formData.mobile}
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
            <option value="">-- Select --</option>
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

        <legend>Course:</legend>
        <label>
          <input
            type="checkbox"
            name="MCA"
            checked={formData.course.MCA}
            onChange={handleCheckboxChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BCA"
            checked={formData.course.BCA}
            onChange={handleCheckboxChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BSC"
            checked={formData.course.BSC}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateEmployee;
