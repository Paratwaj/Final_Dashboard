import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { BsFillPeopleFill } from 'react-icons/bs';
import { LuMessageSquareText } from 'react-icons/lu';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdPayment } from 'react-icons/md';
import { GoProject } from 'react-icons/go';
import './SideBar1.css';
import { MyContext } from '../context/context';


const Sidebar = () => {
    const { isOpen } = useContext(MyContext)

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ background: "white" }}>

            <div className="sidebar-content">
                <ul>
                    
                    <li>
                        <div className="icon-link">
                            <BsFillPeopleFill className="icon" />
                            <Link to="/">Employees</Link>
                        </div>
                    </li>
                    <li>
                        <div className="icon-link">
                            <FaRegCircleCheck className="icon" />
                            <Link to="/leave-management">Leave Management</Link>
                        </div>
                    </li>
                    <li>
                        <div className="icon-link">
                            <LuMessageSquareText className="icon" />
                            <Link to="/enquiry">Enquiry</Link>
                        </div>
                    </li>
                    <li>
                        <div className="icon-link">
                            <MdPayment className="icon" />
                            <Link to="/payment">Payment</Link>
                        </div>
                    </li>
                    <li>
                        <div className="icon-link">
                            <GoProject className="icon" />
                            <Link to="/project">Project</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;