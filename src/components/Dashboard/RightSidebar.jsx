import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventCard from "./EventCard";
import Event from './../../assets/event.png'
import { useSelector } from "react-redux";
import { School } from "@mui/icons-material";

const events = [
  { title: "Alacrity 2025", image: Event },
  { title: "Alacrity 2025", image: Event },
  { title: "Alacrity 2025", image: Event },
];

const RightSidebar = () => {
  const { profile } = useSelector(
    (state) => state?.profile
  );
  return (
    <div className="hidden lg:block w-4/12 bg-gray-900 p-4 sticky top-0 h-screen">
      <h2 className="text-lg font-semibold mb-2 text-white justify-self-center">
        Events <EmojiEventsIcon sx={{ color: "orange" }} />
      </h2>
      <div className="flex items-center space-x-2 border-b-2 border-b-gray-600">
        <School fontSize="small" sx={{color:"orange"}}/>
        <p className="text-lg">
          {profile?.userProfiledDto.instituteDto.name},{" "}
          {profile?.userProfiledDto.instituteDto.location}
        </p>
      </div>
      <div className="space-y-4 flex flex-col h-full justify-evenly pb-6">
        {events.map((event, index) => (
          <EventCard key={index} title={event.title} image={event.image} />
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
