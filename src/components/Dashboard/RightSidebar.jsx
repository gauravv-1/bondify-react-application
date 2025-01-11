import React from "react";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block w-4/12 bg-gray-900 p-4 sticky top-0 h-screen">
      <h2 className="text-lg font-semibold mb-4">Event Sidebar</h2>
      {/* Add content like user info, notifications, or other details */}
      <div className="space-y-4 flex flex-col h-full justify-evenly pb-6">
        <div className="bg-gray-700 p-3 rounded-md h-36">Widget 1</div>
        <div className="bg-gray-700 p-3 rounded-md h-36">Widget 1</div>
        <div className="bg-gray-700 p-3 rounded-md h-36">Widget 1</div>


      </div>
    </div>
  );
};

export default RightSidebar;
