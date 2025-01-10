import React from "react";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block w-3/12 bg-gray-900 p-4 sticky top-0 h-screen">
      <h2 className="text-lg font-semibold mb-4">Right Sidebar</h2>
      {/* Add content like user info, notifications, or other details */}
      <div className="space-y-4">
        <div className="bg-gray-700 p-3 rounded-md">Widget 1</div>
        <div className="bg-gray-700 p-3 rounded-md">Widget 2</div>
        <div className="bg-gray-700 p-3 rounded-md">Widget 3</div>
      </div>
    </div>
  );
};

export default RightSidebar;
