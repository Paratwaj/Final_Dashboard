import { useState } from "react";
import DataTable from "react-data-table-component";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Leavemanagement.css";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      name: "Sethu",
      type: "Sick Leave",
      startDate: "2024-02-20",
      endDate: "2024-02-22",
      days: 3,
      status: "Pending",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateLeaveDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateLeaveDays(formData.startDate, formData.endDate);
    const newLeave = { ...formData, id: Date.now(), days };
    setLeaves([...leaves, newLeave]);
    setFormData({
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
    setShowPopup(false);
  };

  const handleDelete = (id) => {
    setLeaves(leaves.filter((leave) => leave.id !== id));
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Type", selector: (row) => row.type },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "End Date", selector: (row) => row.endDate },
    { name: "Days", selector: (row) => row.days, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span className="badge bg-warning text-dark">{row.status}</span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button> 
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <motion.div
      className="container-fluid mt-4"
      style={{ padding: "10px" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          marginLeft: window.innerWidth > 1024 ? "240px" : "0px",
          maxWidth: window.innerWidth > 1024 ? "calc(100% - 240px)" : "100%",
        }}
      >
        <h2 className="text-primary mb-4">
          <i className="bi bi-calendar-check"></i> Leave Management
        </h2>
        <button
          className="btn btn-sm btn-primary addbtn mb-3"
          onClick={() => setShowPopup(true)}
          style={{ width: "120px", marginLeft: "90%" }}
        >
          <i className="bi bi-plus-circle"></i> Add Leave
        </button>

        {/* React DataTable */}
        <DataTable
          title="Enquiry List"
          columns={columns}
          data={leaves}
          pagination
          highlightOnHover
        />
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center containerr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-4 rounded shadow-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: "600px" }}
            >
              <h4 className="text-center mb-3">Add Leave</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-2">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success btn-sm">
                    Submit
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="btn btn-danger btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LeaveManagement;
