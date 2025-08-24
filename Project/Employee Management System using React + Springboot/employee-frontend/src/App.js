import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import ConfirmationDialog from "./components/ConfirmationDialog";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  }, []);

  const handleSave = (employee) => {
    if (editingEmployee) {
      fetch(`/api/employees/${editingEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      })
        .then(res => res.json())
        .then(updated => {
          setEmployees(employees.map(emp => emp.id === updated.id ? updated : emp));
          setShowModal(false);
          setEditingEmployee(null);
        });
    } else {
      fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      })
        .then(res => res.json())
        .then(newEmp => {
          setEmployees([...employees, newEmp]);
          setShowModal(false);
        });
    }
  };

  const handleDeleteClick = (emp) => {
    setDeleteId(emp.id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`/api/employees/${deleteId}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        setEmployees(employees.filter(emp => emp.id !== deleteId));
        setShowConfirm(false);
      });
  };

  const filteredEmployees = employees.filter(emp =>
    (emp.empNo || "").toLowerCase().includes(search.toLowerCase()) ||
    (emp.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (emp.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (emp.dept || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar />

      <div className="add-btn-container">
        <button onClick={() => { setEditingEmployee(null); setShowModal(true); }}>Add Employee</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <EmployeeForm onSave={handleSave} editingEmployee={editingEmployee} />
          </div>
        </div>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search employee no, name, email, or department"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={(emp) => { setEditingEmployee(emp); setShowModal(true); }}
        onDelete={handleDeleteClick}
      />

      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure you want to delete this employee?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default App;
