import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // MUI icon for create post
import { Avatar } from "@mui/material";
import { fetchPosts } from "../../Redux/Slices/postSlice"; // Redux action to fetch posts
import CreatePost from "./CreatePost";

const PostPage = ({ requestedUserProfile, requestedUserUserId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const { user, userProfile, loading: isLoading } = useSelector((state) => state.auth);
  // console.log("User Id:- ", user.id);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Fetch user posts on component mount
  useEffect(() => {
    dispatch(fetchPosts(`${requestedUserUserId ? requestedUserUserId : user.id}`));
  }, [dispatch],handleCloseModal);

  
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-10">
      <div className="max-w-3xl mx-auto p-4 relative">
        {/* Header */}
        {requestedUserProfile &&
        (
          <div className="flex justify-between items-center text-2xl font-bold p-3 border-b-2 border-b-gray-800 mb-6">
          <h1 className="text-xl font-bold">{requestedUserProfile ? "Users Post" : "Your Posts"}</h1>
        </div>
        )

        }
        

        {/* Posts Section */}
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch posts: {error}</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 rounded-lg p-4 shadow-md">
                {/* Post Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar src={requestedUserProfile ? requestedUserProfile.userProfiledDto.profilePicUrl : userProfile?.profilePicUrl} />
                  <div>
                    <h3 className="font-semibold">{requestedUserProfile ? requestedUserProfile.name : user?.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="mb-4">{post.content}</p>

                {/* Post Image */}
                {post.imageUrl && post.imageUrl.length > 0 && (
                  <img
                    src={post.imageUrl[0]}
                    alt="Post"
                    className="w-full max-h-60 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* CreatePost Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </button>
              <CreatePost />
            </div>
          </div>
        )}

        {/* Floating Create Post Button */}

        {!requestedUserProfile &&
          <button
            onClick={handleOpenModal}
            className="absolute bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all z-50"
            style={{ position: 'fixed', bottom: '6rem', right: '2rem' }} // Fixed position with respect to the screen
          >
            <AddCircleIcon fontSize="large" />
          </button>
        }
      </div>
    </div>
  );
};

export default PostPage;
