import React from "react";
import { Home, Notifications, Message, Person, PostAdd } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const BottomNavbar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { name: "Home", icon: <Home sx={{fontSize:30, color: activeSection === "Home" ? 'orange' : 'white'}}/> },
    { name: "Post", icon: <AddCircleOutlineIcon  sx={{fontSize:30, color: activeSection === "Post" ? 'orange' : 'white'}}/> },
    { name: "Messages", icon: <Message sx={{fontSize:30, color: activeSection === "Messages" ? 'orange' : 'white'}}/> },
    { name: "Profile", icon: <Person sx={{fontSize:30, color: activeSection === "Profile" ? 'orange' : 'white'}}/> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-gray-950 flex justify-around py-4">
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveSection(item.name)}
          className={`text-white${
            activeSection === item.name ? "text-blue-400" : "text-gray-400"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar;
