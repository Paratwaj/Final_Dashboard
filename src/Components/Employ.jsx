import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Employe.css";
import { MyContext } from "../context/Context";

function Employ() {
  const { isOpen } = useContext(MyContext);
  let sidebarWidth = isOpen ? 240 : 0;

  const [employees, setEmployees] = useState([
    { id: 1, name: "Ramcharan", position: "Software Engineer" },
    { id: 2, name: "Surya", position: "Project Manager" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", position: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({ name: "", position: "" }); // State for validation errors

  // Filter Employees
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table Columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="d-flex flex-column flex-md-row">
          <button
            className="btn btn-primary btn-sm me-md-2 mb-2 mb-md-0 actions-button"
            onClick={() => handleEdit(index)}
          >
            <i className="bi bi-pencil-square"></i> Edit
          </button>
          <button
            className="btn btn-danger btn-sm actions-button"
            onClick={() => handleDelete(index)}
          >
            <i className="bi bi-trash-fill"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  // Validate Form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", position: "" };

    if (!newEmployee.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!newEmployee.position.trim()) {
      newErrors.position = "Position is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Add Employee
  const handleAdd = () => {
    if (!validateForm()) return; // Validate before adding

    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setNewEmployee({ name: "", position: "" });
    setShowModal(false);
    toast.success("Employee added successfully!");
  };

  // Edit Employee
  const handleEdit = (index) => {
    setNewEmployee(filteredEmployees[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  // Update Employee
  const handleUpdate = () => {
    if (!validateForm()) return; // Validate before updating

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

  // Reset Errors and Form on Modal Close
  const handleModalClose = () => {
    setShowModal(false);
    setErrors({ name: "", position: "" });
    setNewEmployee({ name: "", position: "" });
    setEditIndex(null);
  };

  return (
    <div
      className="container-fluid"
      style={{
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        transition: "margin-left 0.3s ease, width 0.3s ease",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-center">
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
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow mt-3 content"
      >
        <h2 className="mb-3 h4 text-break">
          <i className="bi bi-list-check"></i> Employee List
        </h2>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          highlightOnHover
          striped
          responsive
        />
        <Button
          className="btn btn-success mt-3 w-100 w-md-auto"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-person-plus-fill"></i> Add Employee
        </Button>
      </motion.div>

      {/* Modal for Add/Edit Employee */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">
            {editIndex !== null ? "Edit Employee" : "Add New Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
              placeholder="Employee Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <input
              type="text" 
              className={`form-control form-control-lg ${errors.position ? "is-invalid" : ""}`}
              placeholder="Position"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
            />
            {errors.position && <div className="invalid-feedback">{errors.position}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {editIndex !== null ? (
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add
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