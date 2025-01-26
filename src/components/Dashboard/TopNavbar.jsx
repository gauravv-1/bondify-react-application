import React from "react";
import { Notifications, Message, Search } from "@mui/icons-material";
// import AppLogo from './../../assets/logos/AppLogo.png'
// import AppLogo2 from './../../assets/logos/AppLogo2.png'
// import AppLogo3 from './../../assets/logos/AppLogo3.png'
import AppLogo4 from './../../assets/logos/AppLogo4.png'
import AppLogo5 from './../../assets/logos/AppLogo5.png'
import AppLogo6 from './../../assets/logos/AppLogo6.png'
const TopNavbar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { name: "Notifications", icon: <Notifications className="text-white" sx={{fontSize:25,color: activeSection === "Notifications" ? 'orange' : 'white'}}/> },
    { name: "Search", icon: <Search className="text-white"  sx={{fontSize:25,color: activeSection === "Search" ? 'orange' : 'white'}}/> },
   
  ];

  return (
    <div className="z-50 md:hidden flex justify-between items-center bg-gray-950 p-2 sticky top-0 ">
      {/* App Logo */}
      <img src={AppLogo4} width='170px' alt="" />

      {/* Notifications and Messages */}
      <div className="flex space-x-4">
      {menuItems.map((item) => (
        <button
          key={item?.name}
          onClick={() => setActiveSection(item.name)}
          className={`text-white${
            activeSection === item?.name ? "text-blue-400" : "text-gray-400"
          }`}
        >
          {item.icon}
        </button>
      ))}
      </div>
    </div>
  );
};

export default TopNavbar;
