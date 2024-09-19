import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import EmployeeList from './EmployeeList';
import EmployeeName from './EmployeeName';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';
import Logout from './Logout';
import './App.css';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Now this is used inside a component rendered by Router

  // Handle form submission for login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin1' && password === 'admin1234') {
      setIsAuthenticated(true);
      navigate('/'); // Redirect to Dashboard after login
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {!isAuthenticated ? (
          <Login setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <>
            <Navbar setIsAuthenticated={setIsAuthenticated} />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/employee/:name" element={<EmployeeName />} />
                <Route path="/create-employee" element={<CreateEmployee />} />
                <Route path="/edit/:employeeId" element={<EditEmployee />} />
                <Route path="/delete/:employeeId" element={<DeleteEmployee />} />
                <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
