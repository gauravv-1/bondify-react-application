import React, { useState } from "react";
import TopNavbar from "../../components/Dashboard/TopNavbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import MainContent from "../../components/Dashboard/MainContent";
import BottomNavbar from "../../components/Dashboard/BottomNavbar";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Home"); // Default section

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Navbar for small screens */}
      <TopNavbar />

      <div className="flex flex-1">
        {/* Sidebar for large screens */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main Content */}
        <MainContent section={activeSection} />
      </div>

      {/* Bottom Navbar for small screens */}
      <BottomNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};

export default Dashboard;
