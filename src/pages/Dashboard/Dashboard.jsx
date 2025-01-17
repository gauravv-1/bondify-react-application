import React, { useEffect, useState } from "react";
import TopNavbar from "../../components/Dashboard/TopNavbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import RightSidebar from "../../components/Dashboard/RightSidebar";
import MainContent from "../../components/Dashboard/MainContent";
import BottomNavbar from "../../components/Dashboard/BottomNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const [activeSection, setActiveSection] = useState("Home"); // Default section
  const { user, loading: isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchData = async () => {

      dispatch(fetchUserProfile());

    };

    fetchData();
  }, [dispatch], navigate);

  
  useEffect(() => {
    if (!isLoading && user && !user.isProfileComplete) {
      navigate("/complete-profile");
    }
  }, [isLoading, user, navigate]);



  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white ">
      {/* Top Navbar for small screens */}
      <TopNavbar activeSection={activeSection} setActiveSection={setActiveSection}/>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main Content */}
        <div className="flex-1 w-4/12 overflow-y-auto">
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
