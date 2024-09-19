import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import './DeleteEmployee.css';
import { useNavigate } from 'react-router-dom'; // Import the CSS file

const DeleteEmployee = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/employees/delete', {
        data: { email }, // Send the email in the request body
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Clear the email input and show success message
      setEmail('');
      setMessage(response.data.message);
      setError('');
      navigate('/employee-list');
      // Optionally, if you have a list of employees, update it here
      // For example, by calling a function to refresh the list or using a state management solution

    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting employee');
      setMessage('');
    }
  };

  return (
    <div className="delete-employee-container">
      <h1>Delete Employee</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter employee email"
        required
      />
      <button onClick={handleDelete}>Delete Employee</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DeleteEmployee;
