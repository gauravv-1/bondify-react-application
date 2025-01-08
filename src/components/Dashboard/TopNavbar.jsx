import React from "react";
import { Notifications, Message } from "@mui/icons-material";
import AppLogo from './../../assets/logos/AppLogo.png'
import AppLogo2 from './../../assets/logos/AppLogo2.png'
import AppLogo3 from './../../assets/logos/AppLogo3.png'
import AppLogo4 from './../../assets/logos/AppLogo4.png'
import AppLogo5 from './../../assets/logos/AppLogo5.png'
import AppLogo6 from './../../assets/logos/AppLogo6.png'
const TopNavbar = () => {
  return (
    <div className="md:hidden flex justify-between items-center bg-gray-800 p-4">
      {/* App Logo */}
      <img src={AppLogo6} width='200px' alt="" />

      {/* Notifications and Messages */}
      <div className="flex space-x-4">
        <button>
          <Notifications className="text-white" />
        </button>
        <button>
          <Message className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
