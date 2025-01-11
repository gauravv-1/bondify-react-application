import React, { useEffect, useState } from "react";
import TopNavbar from "../../components/Dashboard/TopNavbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import RightSidebar from "../../components/Dashboard/RightSidebar";
import MainContent from "../../components/Dashboard/MainContent";
import BottomNavbar from "../../components/Dashboard/BottomNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slices/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchInstitutes } from "../../Redux/Slices/Institute/fethInstituteSlice";

const Dashboard = () => {

  const [activeSection, setActiveSection] = useState("Home"); // Default section
  const userProfile = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Wait for the fetchUserProfile action to complete
      const userProfileData = await dispatch(fetchUserProfile());
      console.log("User Profile: ", userProfileData.payload.data.isProfileComplete);
      setIsProfileComplete(userProfileData.payload.data.isProfileComplete);

      
      // Wait for the fetchInstitutes action to complete
      
    };

    fetchData();
  }, [dispatch],navigate);

  useEffect(() => {
    if (!isProfileComplete) {
      navigate("/complete-profile");
    }
  }, [isProfileComplete, navigate]);

  console.log("State: ",userProfile);



  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* Top Navbar for small screens */}
      <TopNavbar />

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
