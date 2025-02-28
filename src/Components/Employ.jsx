import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import './Employe.css'

function Employ() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Ramcharan", position: "Software Engineer" },
    { id: 2, name: "Surya", position: "Project Manager" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", position: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Add Employee
  const handleAdd = () => {
    if (!newEmployee.name.trim() || !newEmployee.position.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setNewEmployee({ name: "", position: "" });
    setShowModal(false);
    toast.success("Employee added successfully!");
  };

  // Edit Employee
  const handleEdit = (index) => {
    setNewEmployee(employees[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  // Update Employee
  const handleUpdate = () => {
    if (!newEmployee.name.trim() || !newEmployee.position.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (editIndex === null) return;
    const updatedEmployees = [...employees];
    updatedEmployees[editIndex] = { ...updatedEmployees[editIndex], ...newEmployee };
    setEmployees(updatedEmployees);
    setEditIndex(null);
    setNewEmployee({ name: "", position: "" });
    setShowModal(false);
    toast.success("Employee updated successfully!");
  };

  // Delete Employee
  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
    toast.error("Employee deleted successfully!");
  };

  return (
    <div className="container-fluid px-3">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{display:"flex",justifyContent:"center"}}>
          <Link to="/SideBar1" className="navbar-brand">ERP Employee Module</Link>   
        </div>
      </nav>

      {/* Search Bar */}
      <div className="row justify-content-center mt-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search employee by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Employee List */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="card p-4 shadow mt-3 content">
        <h2 className="mb-3 h4 text-break"><i className="bi bi-list-check"></i> Employee List</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())).map((emp, index) => (
                <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                  <td className="text-center text-md-start">{emp.id}</td>
                  <td className="text-center text-md-start text-break">{emp.name}</td>
                  <td className="text-center text-md-start text-break">{emp.position}</td>
                  <td className="text-center">
                    <div className="d-flex flex-column flex-md-row">
                      <button className="btn btn-primary btn-sm me-md-2 mb-2 mb-md-0" onClick={() => handleEdit(index)}>
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                        <i className="bi bi-trash-fill"></i> Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button className="btn btn-success mt-3 w-100 w-md-auto" onClick={() => setShowModal(true)}>
          <i className="bi bi-person-plus-fill"></i> Add Employee
        </Button>
      </motion.div>

      {/* Modal for Add/Edit Employee */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">{editIndex !== null ? "Edit Employee" : "Add New Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Employee Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Position"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="bi bi-x-circle"></i> Close
          </Button>
          {editIndex !== null ? (
            <Button variant="success" onClick={handleUpdate}>
              <i className="bi bi-save"></i> Update Employee
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              <i className="bi bi-person-check-fill"></i> Add Employee
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Employ;
