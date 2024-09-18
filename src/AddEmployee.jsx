import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployee = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://employee-server-k24j.onrender.com/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, status }),
    })
      .then((response) => response.json())
      .then(() => {
        setUsername('');
        setEmail('');
        setStatus('active');
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-2 control-label">Username:</label>
        <div className="col-sm-10">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-2 control-label">Email:</label>
        <div className="col-sm-10">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-2 control-label">Status:</label>
        <div className="col-sm-10">
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployee;