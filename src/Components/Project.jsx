import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Project.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../context/context";

const Project = () => {
  const { isOpen } = useContext    (MyContext);
  let sidebarWidth = isOpen ? 240 : 0
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ name: "", company: "", enquiry: "", phone: "", status: "Pending", date: "" });
  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState([
    { id: 1, date: "2024-02-15", name: "John Doe", company: "Tech Solutions", enquiry: "Mobile App for college...", phone: "1234567890", status: "Active" },
    { id: 2, date: "2024-02-18", name: "Jane Smith", company: "Creative Minds", enquiry: "Website Development", phone: "9876543210", status: "Pending" },
    { id: 3, date: "2024-02-20", name: "Mike Ross", company: "BuildCorp", enquiry: "Graphic Design", phone: "4567890123", status: "In Progress" },
    { id: 4, date: "2024-02-20", name: "Sarah Lee", company: "Health First", enquiry: "Construction Plan", phone: "3216549870", status: "Completed" }
  ]);

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.enquiry.trim()) errors.enquiry = "Enquiry is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone must be exactly 10 digits";
    if (!formData.status.trim()) errors.status = "Status is required";
    if (!formData.date.trim()) errors.date = "Date is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setFormData({ name: "", company: "", enquiry: "", phone: "", status: "Pending", date: "" });
      setEditIndex(null);
      setErrors({});
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = { ...formData };
      setProjects(updatedProjects);
      toast.success("Project updated successfully!"); // Toast for edit
    } else {
      setProjects([...projects, { ...formData, id: projects.length + 1, date: formData.date || new Date().toISOString().split("T")[0] }]);
      toast.success("Project saved successfully!"); // Toast for save
    }
    toggleModal();
  };

  const handleEdit = (index) => {
    setFormData(projects[index]);
    setEditIndex(index);
    setShowModal(true);
    setErrors({});
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
    toast.error("Project deleted successfully!"); // Toast for delete
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.enquiry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.phone.includes(searchQuery) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4"
        style={{
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}>
        <h2 className="text-center mb-4">Project Details</h2>

        <div className="mb-3 d-flex justify-content-between">
          <input
            type="text"
            className="form-control search-box"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "140px" }}
          />
          <button className="btn btn-primary ms-2" onClick={toggleModal} style={{ width: "140px" }}>
            + Project
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th>S. NO</th>
                <th>DATE</th>
                <th>NAME</th>
                <th>COMPANY</th>
                <th>ENQUIRY FOR</th>
                <th>PHONE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{project.date}</td>
                  <td>{project.name}</td>
                  <td>{project.company}</td>
                  <td>{project.enquiry}</td>
                  <td>{project.phone}</td>
                  <td>{project.status}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>✏️</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{editIndex !== null ? "Edit Project" : "Add Project"}</h5>
                    <button className="btn-close" onClick={toggleModal}></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          className={`form-control ${errors.company ? "is-invalid" : ""}`}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                        {errors.company && <div className="invalid-feedback">{errors.company}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Enquiry For</label>
                        <input
                          type="text"
                          className={`form-control ${errors.enquiry ? "is-invalid" : ""}`}
                          value={formData.enquiry}
                          onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                        />
                        {errors.enquiry && <div className="invalid-feedback">{errors.enquiry}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength={10}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className={`form-control ${errors.status ? "is-invalid" : ""}`}
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Active">Active</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          className={`form-control ${errors.date ? "is-invalid" : ""}`}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={toggleModal}>Close</button>
                    <button className="btn btn-primary" onClick={handleSave}>{editIndex !== null ? "Update" : "Save"}</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-backdrop fade show" onClick={toggleModal}></div>
          </>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </>
  );
};

export default Project;