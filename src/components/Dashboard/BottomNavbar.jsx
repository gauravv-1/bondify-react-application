import React from "react";
import { Home, Notifications, Message, Person, PostAdd } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const BottomNavbar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { name: "Home", icon: <Home /> },
    { name: "Post", icon: <AddCircleOutlineIcon  /> },
    { name: "Messages", icon: <Message /> },
    { name: "Profile", icon: <Person /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-gray-800 flex justify-around py-4">
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
