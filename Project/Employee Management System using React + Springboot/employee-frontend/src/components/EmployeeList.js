import React from "react";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Employee No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.empNo}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.dept}</td>
              <td>{emp.salary}</td>
              <td>
                <span className="icon edit" onClick={() => onEdit(emp)}>✏️</span>
                <span className="icon delete" onClick={() => onDelete(emp)}>🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
