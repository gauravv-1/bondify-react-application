import React from "react";
import { Button } from "@mui/material";

const EventCard = ({ title, image }) => {
  return (
    <div className="relative bg-gray-700 rounded-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-36 object-cover opacity-90" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-3 bg-black bg-opacity-40">
        <h3 className="text-white font-semibold"></h3>
        <div className="flex justify-end">
          <Button variant="outlined" size="small" sx={{ color: "orange", borderColor: "orange" }}>
            Know More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
