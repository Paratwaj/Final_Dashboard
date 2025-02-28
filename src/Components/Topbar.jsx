import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaUserAlt } from "react-icons/fa";
import { useContext } from "react";
import { MyContext } from "../context/Context";
import "./Topbar.css";

const Topbar = () => {
  const { isOpen, setIsOpen } = useContext(MyContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="topbar">
      {/* Left Side - Hamburger Menu */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Right Side - Notifications & User */}
      <div className="topbar-right">
        {/* Notification Icon */}
        <button className="notif-btn">
          <i className="bi bi-bell"></i>
          <span className="notif-badge">3</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="user-profile" ref={dropdownRef}>
          <div
            className="user-info"
            onClick={() => setDropdownOpen((prev) => !prev)} // Correct toggling
          >
            <FaUserAlt size={30} className="user-icon" />
            <span className="user-name">BK</span>
            <i className="bi bi-chevron-down dropdown-icon"></i>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <i className="bi bi-person-circle"></i> Profile
              </a>
              <a href="#" className="dropdown-item">
                <i className="bi bi-gear"></i> Settings
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item logout">
                <i className="bi bi-box-arrow-right"></i> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
