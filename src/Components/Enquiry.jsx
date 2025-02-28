import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component"; // Import DataTable
import "./Enquiry.css";
import { MyContext } from "../context/context"; // Import the context

// Custom styles for DataTable
const customStyles = {
  rows: {
    style: {
      fontSize: "14px", // Adjust font size for rows
      padding: "10px", // Adjust padding for rows
    },
  },
  headCells: {
    style: {
      fontSize: "16px", // Adjust font size for header cells
      fontWeight: "bold", // Make header text bold
      backgroundColor: "#f8f9fa", // Light gray background for header
    },
  },
  cells: {
    style: {
      padding: "12px", // Adjust padding for cells
    },
  },
};

const Enquiry = () => {
  const { isOpen } = useContext(MyContext); // Get the sidebar state
  const sidebarWidth = isOpen ? 240 : 0; // Adjust width based on sidebar state

  const [enquiries, setEnquiries] = useState([
    { id: uuidv4(), name: "John Doe", email: "john@example.com", message: "Interested in HR software." },
    { id: uuidv4(), name: "Jane Smith", email: "jane@example.com", message: "Need a demo session." }
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setEnquiries(enquiries.map((enq) => (enq.id === editId ? { ...enq, ...formData } : enq)));
      setEditId(null);
      toast.info("Enquiry Updated Successfully");
    } else {
      setEnquiries([...enquiries, { id: uuidv4(), ...formData }]);
      toast.success("Enquiry Submitted Successfully");
    }

    setFormData({ name: "", email: "", message: "" });
    setShowModal(false);
  };

  const handleEdit = (id) => {
    const enquiry = enquiries.find((enq) => enq.id === id);
    setFormData(enquiry);
    setEditId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setEnquiries(enquiries.filter((enq) => enq.id !== id));
    toast.error("Enquiry Deleted Successfully");
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <motion.div
      className="enquiry-container"
      style={{
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        transition: "margin-left 0.3s ease, width 0.3s ease",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="shadow-lg p-3 p-md-4">
        <h2 className="text-primary mb-4">
          <i className="bi bi-envelope-paper"></i> Enquiry Management
        </h2>
        <div className="d-flex justify-content-center">
          <button className="btn btn-sm btn-primary mb-3" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle"></i> Add Enquiry
          </button>
        </div>

        {/* Enquiry Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editId ? "Edit Enquiry" : "Add Enquiry"}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Name</label>
                      <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Message</label>
                      <textarea name="message" className="form-control" rows="3" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-primary"} w-100`}>
                      {editId ? "Update Enquiry" : "Submit Enquiry"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enquiry List */}
        <div className="mt-4">
          <h5 className="mb-3"><i className="bi bi-list-task"></i> Enquiry List</h5>
          <DataTable
            columns={columns}
            data={enquiries}
            pagination
            responsive
            customStyles={customStyles} // Apply custom styles
            highlightOnHover
            striped
            noDataComponent={<div className="text-center text-muted">No enquiries found</div>}
          />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </motion.div>
  );
};

export default Enquiry;