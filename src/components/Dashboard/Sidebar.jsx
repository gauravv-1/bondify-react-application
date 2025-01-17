import React from "react";
import { Home, Search, Notifications, Message, Person, PostAdd, Email } from "@mui/icons-material";
import AppLogo from './../../assets/logos/AppLogo.png'
import { Avatar } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import usePagination from "@mui/material/usePagination/usePagination";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/authSlice";



const Sidebar = ({ activeSection, setActiveSection }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user,userProfile, loading: isLoading } = useSelector((state) => state.auth);
    const menuItems = [
        { name: "Home", icon: <Home sx={{fontSize:32}}/> },
        { name: "Post", icon: <AddCircleOutlineIcon sx={{fontSize:32}}/> },
        { name: "Search", icon: <Search sx={{fontSize:35}}/> },
        { name: "Notifications", icon: <Notifications sx={{fontSize:32}}/> },
        { name: "Messages", icon: <Email sx={{fontSize:32}}/> },
        { name: "Profile", icon: <Person sx={{fontSize:32}}/> },
    ];




    return (
        <div className="hidden md:flex flex-col border-r-2 border-gray-800 w-1/3 max-w-sm p-6 sticky top-0 h-screen">
            {/* App Logo */}
            <div className="flex items-center justify-center mb-8">
                <img src={AppLogo} alt="App Logo" width="100px" className="mr-3" />

            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveSection(item.name)}
                        className={`flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 ${activeSection === item.name ? "bg-gray-700" : ""
                            }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span className="text-xl">{item.name}</span>
                    </button>
                ))}
            </div>

            {/* Username and Logo at Bottom */}
            <div className="mt-auto pb-4 px-4">
                <div className="flex items-center justify-between">
                    {/* Avatar and User Info */}
                    <div className="flex items-center">
                        <Avatar
                            alt="Gaurav Pisal"
                            src={userProfile?.profilePicUrl} // Replace with your avatar image URL
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "#1E40AF", // Fallback background color
                                color: "white",
                            }}
                        />
                        <div className="ml-3 cursor-pointer" onClick={()=>{setActiveSection('Profile')}}>
                            <p className="text-white text-base font-semibold">{user?.name || "Guest"}</p>
                            <p className="text-gray-400 text-sm">{user?.email || "No email provided"}</p>
                        </div>
                    </div>

                    {/* Options (3 dots icon) */}
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-400 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Sidebar;
