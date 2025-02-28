import React, { useState, useEffect , useContext} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from 'react-data-table-component';
import './Payment.css';
import { MyContext} from "../context/context"; // Import the context
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";




const Payment = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [traineeName, setTraineeName] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [amount, setAmount] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPopup, setShowPopup] = useState(false);
  const [viewType, setViewType] = useState('table'); // 'table' or 'card'

  const { isOpen } = useContext(MyContext); // Get the sidebar state
  // Courses and payment modes
  const courses = ['React', 'Django', 'Flutter', 'Data Analyst'];
  const paymentModes = ['Online', 'Cash', 'Cheque', 'Bank Transfer'];
  const sidebarWidth = isOpen ? 240 : 0; // Adjust width based on sidebar state

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto switch to card view on small screens
      if (window.innerWidth < 768) {
        setViewType('card');
      } else {
        setViewType('table');
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate report handler
  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (startDate && endDate && selectedCourse && traineeName && paymentMode && amount) {
      const newRow = {
        sno: tableData.length + 1,
        date: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        name: traineeName,
        course: selectedCourse,
        paymentMode: paymentMode,
        receivedBy: 'Admin', // You can modify this as needed
        amount: `₹${amount}`,
      };
      setTableData([...tableData, newRow]);
      // Reset fields
      resetForm();
      setShowPopup(false); // Close the modal after submission
    } else {
      alert('Please fill all fields before generating the report.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedCourse('');
    setTraineeName('');
    setPaymentMode('');
    setAmount('');
  };

  // Delete row handler
  const handleDeleteRow = (sno) => {
    setTableData(tableData.filter(row => row.sno !== sno));
  };

  // Edit row handler
  const handleEditRow = (row) => {
    setEditingRow(row.sno);
    const dateParts = row.date.split(' - ');
    setStartDate(new Date(dateParts[0]));
    setEndDate(new Date(dateParts[1]));
    setSelectedCourse(row.course || '');
    setTraineeName(row.name);
    setPaymentMode(row.paymentMode);
    setAmount(row.amount.replace('₹', ''));
    setShowPopup(true); // Open the modal for editing
  };

  // Save edit handler
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedData = tableData.map(row => {
      if (row.sno === editingRow) {
        return {
          ...row,
          date: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
          name: traineeName,
          course: selectedCourse,
          paymentMode: paymentMode,
          amount: `₹${amount}`,
        };
      }
      return row;
    });
    setTableData(updatedData);
    setEditingRow(null);
    resetForm();
    setShowPopup(false); // Close the modal after saving
  };

  // Toggle view handler
  const toggleView = () => {
    setViewType(viewType === 'table' ? 'card' : 'table');
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: 'S.No',
      selector: row => row.sno,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Course',
      selector: row => row.course || '-',
      sortable: true,
    },
    {
      name: 'Payment Mode',
      selector: row => row.paymentMode,
      sortable: true,
    },
    {
      name: 'Received By',
      selector: row => row.receivedBy,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex gap-2">
          <a
            
            onClick={() => handleEditRow(row)}
          >
            <MdEdit />

          </a>
          <a
            
            onClick={() => handleDeleteRow(row.sno)}
          >
            <MdDelete />
          </a>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Render payment cards
  const renderPaymentCards = () => {
    if (tableData.length === 0) {
      return (
        <div className="col-12 text-center p-4 bg-white rounded shadow-sm">
          <p className="text-muted">No payment data available. Fill the form and generate a report.</p>
        </div>
      );
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {tableData.map(row => (
          <div key={row.sno} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="m-0 fs-6">#{row.sno} - {row.name}</h5>
                <span className="badge bg-success">{row.amount}</span>
              </div>
              <div className="card-body">
                <p className="card-text mb-1"><strong>Date:</strong> {row.date}</p>
                <p className="card-text mb-1"><strong>Course:</strong> {row.course || '-'}</p>
                <p className="card-text mb-1"><strong>Payment:</strong> {row.paymentMode}</p>
                <p className="card-text mb-1"><strong>Received By:</strong> {row.receivedBy}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleEditRow(row)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteRow(row.sno)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render payment table using DataTable
  const renderPaymentTable = () => {
    return (
      <DataTable
        columns={columns}
        data={tableData}
        pagination
        highlightOnHover
        responsive
        noDataComponent={
          <div className="text-center text-muted p-3">
            No payment data available. Fill the form and generate a report.
          </div>
        }/*  */
      />
    );
  };

  return (
    <div className="payment-container" style={{
      maxWidth: "1200px",
      marginLeft: windowWidth < 1024 ? "auto" : `${sidebarWidth}px`,
      marginRight: windowWidth < 1024 ? "auto" : "0",
      width: windowWidth < 1024 ? "90%" : `calc(100% - ${sidebarWidth}px)`,
      transition: "margin-left 0.3s ease, width 0.3s ease",
    }}>
      <div className="p-3 p-md-4 bg-light rounded shadow mx-auto my-3" style={{ maxWidth: '1200px',width:"120%", marginLeft: `${sidebarWidth}px`,
      width: `calc(100% - 60px)`,
      transition: "margin-left 0.3s ease, width 0.3s ease", }}>
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-left align-items-md-center mb-4">
          <h2 className="h4 mb-3 mb-md-0">Payment Report</h2>
          <div className="d-flex gap-2 flex-column flex-sm-row">
            <button
              className="btn btn-primary"
              onClick={() => setShowPopup(true)}
            >
              Generate Report
            </button>
            <button className="btn btn-outline-secondary d-none d-md-block" onClick={toggleView}>
              {viewType === 'table' ? 'Card View' : 'Table View'}
            </button>
          </div>
        </div>

        {/* View Toggle Button (Mobile Only) */}
        <button className="btn btn-outline-secondary mb-3 d-md-none" onClick={toggleView}>
          Switch to {viewType === 'table' ? 'Card' : 'Table'} View
        </button>

        {/* Content Section */}
        <div className="responsive-content">
          {viewType === 'table' ? renderPaymentTable() : renderPaymentCards()}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded shadow-lg"
              style={{ width: windowWidth < 576 ? '100%' : '400px', maxHeight: '100vh', overflowY: 'auto' }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="m-0">
                    {editingRow ? 'Edit Payment' : 'Add Payment'}
                  </h4>
                  <button
                    className="btn-close"
                    onClick={() => setShowPopup(false)}
                    aria-label="Close"
                  ></button>
                </div>

                <form onSubmit={editingRow ? handleSaveEdit : handleGenerateReport}>
                  <div className="mb-3">
                    <label className="form-label">Start Date:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select start date"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={date => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select end date"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course Name:</label>
                    <select
                      value={selectedCourse}
                      onChange={e => setSelectedCourse(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trainee Name:</label>
                    <input
                      type="text"
                      value={traineeName}
                      onChange={e => setTraineeName(e.target.value)}
                      className="form-control"
                      placeholder="Enter Trainee Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Mode:</label>
                    <select
                      value={paymentMode}
                      onChange={e => setPaymentMode(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select Payment Mode</option>
                      {paymentModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (₹):</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="form-control"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between mt-4">
                    <button type="submit" className="btn btn-success">
                      {editingRow ? 'Save Changes' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;