import React, { useState, useEffect } from "react";

function EmployeeForm({ onSave, editingEmployee }) {
  const [employee, setEmployee] = useState({
    empNo: "",
    name: "",
    email: "",
    dept: "",
    salary: ""
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);
  };

  return (
    <div className="form-container">
      <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="empNo"
          placeholder="Employee No"
          value={employee.empNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dept"
          placeholder="Department"
          value={employee.dept}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingEmployee ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
