import React from "react";
import DisplayPosts from "../DisplayPosts";

const MainContent = ({ section }) => {
  return (
    <div className="flex-1 bg-gray-700 p-6">
      <h1 className="text-3xl font-bold mb-4">{section}</h1>
      <p className="text-gray-300">Content for {section} section goes here.</p>
      {/* <DisplayPosts/> */}
    </div>
  );
};

export default MainContent;
