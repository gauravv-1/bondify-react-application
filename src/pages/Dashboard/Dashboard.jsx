import React, { useEffect, useState } from "react";
import TopNavbar from "../../components/Dashboard/TopNavbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import RightSidebar from "../../components/Dashboard/RightSidebar";
import MainContent from "../../components/Dashboard/MainContent";
import BottomNavbar from "../../components/Dashboard/BottomNavbar";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slices/authSlice";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Home"); // Default section
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Top Navbar for small screens */}
      <TopNavbar />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main Content */}
        <div className="flex-1 w-4/12 p-4 overflow-y-auto">
          <MainContent section={activeSection} />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Bottom Navbar for small screens */}
      <BottomNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};

export default Dashboard;
