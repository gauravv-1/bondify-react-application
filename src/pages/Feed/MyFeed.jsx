import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FeedIcon from '@mui/icons-material/RssFeed';
import { checkForNewPosts, fetchInitialPosts, markPostsAsSeen, refreshPosts } from '../../Redux/Slices/Feed/feedSlice';


const MyFeed = () => {
  const dispatch = useDispatch();
  const { posts, newPosts, loading, error, showRefreshButton } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchInitialPosts());
    const interval = setInterval(() => dispatch(checkForNewPosts()), 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(refreshPosts());
  };

  useEffect(() => {
    if (posts.length > 0) {
      const postIds = posts.map((post) => post.id); // Collect all post IDs
      dispatch(markPostsAsSeen(postIds)); // Dispatch markPostsAsSeen with post IDs
    }
  }, [posts, dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-10">
      <div className="max-w-3xl mx-auto p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Feed</h1>
        </div>

        {/* Refresh Button */}
        {showRefreshButton && (
          <div
            className="fixed top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2"
            onClick={handleRefresh}
          >
            <RefreshIcon />
            New posts available - Refresh
          </div>
        )}

        {/* Posts Section */}
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch posts: {error}</p>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
            <FeedIcon style={{ fontSize: '4rem' }} />
            <p className="mt-4">You've gone through all posts! Check older posts.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => dispatch(fetchInitialPosts())}
            >
              Load Older Posts
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 rounded-lg p-4 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar src={post?.profilePicUrl} />
                  <div>
                    <h3 className="font-semibold">{post.userName}</h3>
                    <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
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
      </div>
    </div>
  );
};

export default MyFeed;
