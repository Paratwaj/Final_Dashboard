import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./Components/Topbar";
import Employ from "./Components/Employ"; // Ensure the filename matches

import Project from "./Components/Project";
import SideBar1 from "./Components/SideBar1";
import "bootstrap-icons/font/bootstrap-icons.css";
import Enquiry from "./Components/Enquiry";
import { MyProvider } from "./context/Context";
import LeaveManagement from "./Components/Leavemanagement";
import Payment from "./Components/Payment";

function App() {
  return (
    <>
      <MyProvider>
        <BrowserRouter>
          <SideBar1 />
          <Topbar />
          <Routes>
            <Route path="/" element={<Employ />} /> {/* Fixed Route */}
            <Route path="/project" element={<Project />} /> {/* Fixed Route */}
            <Route path="/enquiry" element={<Enquiry />} /> {/* Fixed Route */}
            <Route path="/leave-management" element={<LeaveManagement />} />
            <Route path="/payment" element={<Payment/>} />

            {/* Fixed Route */}

          </Routes>
        </BrowserRouter>
      </MyProvider>
    </>
  );
}

export default App;
