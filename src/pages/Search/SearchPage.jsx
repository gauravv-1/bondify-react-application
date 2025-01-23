import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { fetchSearchResults } from "../../Redux/Slices/Search/searchSlice";
import ProfilePage from "../Profile/ProfilePage";
import { HelpOutline } from "@mui/icons-material"; // Icon for no results

const SearchPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchSearchResults(searchTerm));
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID to load ProfilePage
  };

  const handleBackToSearch = () => {
    setSelectedUserId(null); // Reset selected user ID to show SearchPage again
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white mb-16">
      <div className="max-w-3xl mx-auto p-4">
        {/* Conditionally Render SearchPage or ProfilePage */}
        {selectedUserId ? (
          <ProfilePage userId={selectedUserId} onBack={handleBackToSearch} />
        ) : (
          <>
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-900 rounded-lg p-2 mb-6"
            >
              <input
                type="text"
                placeholder="Search for users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <SearchIcon />
              </button>
            </form>

            {/* Search Results */}
            {loading ? (
              <p>Loading results...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : results.length === 0 ? (
              <div className="flex items-center space-x-2 text-gray-400">
                <HelpOutline />
                <p>No search results found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results
                .map((user) => (
                  
                  <div
                    key={user?.userId}
                    className="bg-gray-850 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleUserClick(user?.userId)} // Handle user click
                  >
                    {/* User Avatar */}
                    <Avatar
                      src={user.profilePicUrl || ""}
                      alt={user.name}
                      className="w-12 h-12"
                    />

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="font-bold">{user?.name}</h3>
                      <p className="text-gray-400 text-sm">
                        @{user.username} • {user?.institute}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
