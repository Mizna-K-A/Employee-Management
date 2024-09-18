import React, { useState, useEffect } from 'react';
import Employee from './Employee';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    username: '',
    email: '',
    status: 'active',
  });

  useEffect(() => {
    fetch('https://employee-server-k24j.onrender.com/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    fetch('https://employee-server-k24j.onrender.com/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => setEmployees([...employees, data]))
      .catch((error) => console.error(error));
  };

  const handleEditEmployee = (employee) => {
    fetch(`https://employee-server-k24j.onrender.com/employees/${employee.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp))))
      .catch((error) => console.error(error));
  };

  const handleDeleteEmployee = (id) => {
    fetch(`https://employee-server-k24j.onrender.com/employees/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => setEmployees(employees.filter((emp) => emp.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1 className="text-center">Employee Management App</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <Employee
              key={employee.id}
              employee={employee}
              onDelete={handleDeleteEmployee}
              onEdit={handleEditEmployee}
            />
          ))}
        </tbody>
      </table>
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label">Username:</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="username"
              value={newEmployee.username}
              onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
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
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Status:</label>
          <div className="col-sm-10">
            <select
              name="status"
              value={newEmployee.status}
              onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
              className="form-control"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button onClick={handleAddEmployee} className="btn btn-primary mt-3">
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeList;