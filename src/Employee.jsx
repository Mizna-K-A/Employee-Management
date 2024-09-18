import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employee = ({ employee, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...employee }); // Create a shallow copy of the employee object

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(formData);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(employee.id);
  };

  return (
    <tr>
      <td>{employee.id}</td>
      <td>
        {editing ? (
          <input
            type="text"
            name="username" // Add name prop
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="form-control"
          />
        ) : (
          <span>{employee.username}</span>
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="email"
            name="email" // Add name prop
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-control"
          />
        ) : (
          <span>{employee.email}</span>
        )}
      </td>
      <td>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="form-control"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>
      <td>
        {editing ? (
          <button
            onClick={handleSave}
            className="btn btn-primary"
            aria-label="Save changes" // Add accessibility attribute
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="btn btn-secondary"
            aria-label="Edit employee" // Add accessibility attribute
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          aria-label="Delete employee" // Add accessibility attribute
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Employee;