import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';

const EmployeeList = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const filteredEmployees = employees.filter(employee => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const employeeName = employee.name.toLowerCase();
    const employeeEmail = employee.email.toLowerCase();
    const employeeCreatedAt = new Date(employee.createdAt).toLocaleDateString();

    return (
      employeeName.includes(lowerCaseSearchTerm) ||
      employeeEmail.includes(lowerCaseSearchTerm) ||
      employeeCreatedAt.includes(lowerCaseSearchTerm)
    );
  });
  useEffect(() => {
    // Define an async function to fetch the employee data
    const fetchEmployees = async () => {
        try {
          const response = await axios.get('http://localhost:3000/employees/');
          
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          // In Axios, data is available in response.data
        const data = response.data;

      // Set the employee data in state
        setEmployees(data);
          
        } catch (error) {
          console.error('There was an error fetching the employee:', error);
        }
    };

    fetchEmployees();
  }, []); // Empty dependency array means this effect runs once on mount
  const formatCourses = (coursesStr) => {
    try {
      const coursesObj = JSON.parse(coursesStr);
      if (typeof coursesObj === 'object' && coursesObj !== null) {
        return Object.keys(coursesObj).filter(course => coursesObj[course]).join(', '); // Filter and join courses with true value
      }
    } catch (error) {
      console.error('Error parsing course data:', error);
    }
    return 'No courses available';
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };
  return (
    <div className="employee-list-container">
      {/* Create Employee and Total Count */}
      <div className="header-actions">
        <Link to="/create-employee">
          <button className="create-employee-button">Create Employee</button>
        </Link>
        <span className="total-count">Total Count: {filteredEmployees.length}</span>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <label htmlFor="search">Search by Name: </label>
        <input
          type="text"
          id="search"
          placeholder="Enter Name Keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td><img src={employee.image} alt={`${employee.name}`} width="50" height="50" /></td>
              <td>{employee.name}</td>
              <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{formatCourses(employee.course)}</td>
              <td>{formatDate(employee.createdAt)}</td>
              <td>
                <Link to={`/edit/${employee._id}`}>Edit</Link> - 
                <Link to={`/delete/${employee._id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
