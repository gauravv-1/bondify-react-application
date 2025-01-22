import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FeedIcon from '@mui/icons-material/RssFeed';
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import { Autorenew } from '@mui/icons-material';
import {
  checkForNewPosts,
  fetchInitialPosts,
  fetchSeenPosts,
  markPostsAsSeen,
  refreshPosts,
} from '../../Redux/Slices/Feed/feedSlice';
import ProfilePage from '../Profile/ProfilePage';

const MyFeed = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [postType, setPostType] = useState('NORMAL');
  const { posts, loading, error, showRefreshButton, hasMore } = useSelector((state) => state.feed);
  const observerRef = useRef(null);
  const pageRef = useRef(0);

  useEffect(() => {
    console.log("Fetching initial Post of type: ",postType);
    dispatch(fetchInitialPosts({ postType, page: pageRef.current, size: 10 }));
    const interval = setInterval(() => dispatch(checkForNewPosts()), 30000);
    return () => clearInterval(interval);
  }, [dispatch, postType]);

  const handleRefresh = () => {
    dispatch(refreshPosts({ postType }));
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      dispatch(fetchSeenPosts({ page: pageRef.current, size: 10, postType }));
      pageRef.current += 1;
    }
  };

  const handleFetchOlderPosts = () => {
    if (!loading && hasMore) {
      console.log("Fetching Older Post of type: ",postType);
      dispatch(fetchSeenPosts({ page: pageRef.current, size: 10, postType }));
      pageRef.current += 1;
    }
  };

  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMorePosts();
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (posts.length > 0) {
      const unseenPostIds = posts.filter((post) => !post.seen).map((post) => post.id);
      if (unseenPostIds.length > 0) {
        dispatch(markPostsAsSeen(unseenPostIds));
      }
    }
  }, [posts, dispatch]);

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
    pageRef.current = 0;
  };

  const handleUserProfileClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBackToFeed = () => {
    setSelectedUserId(null);
  };

  if (selectedUserId) {
    return <ProfilePage userId={selectedUserId} onBack={handleBackToFeed} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-10">
      <div className="max-w-3xl mx-auto p-4 relative">
        {/* Post Type Selector */}
        <div className="flex justify-between items-center mb-6">
          <ToggleButtonGroup
            value={postType}
            exclusive
            onChange={(event, newPostType) => {
              if (newPostType !== null) {
                setPostType(newPostType); // Update the state only when a valid selection is made
                pageRef.current = 0; // Reset pagination when post type changes
              }
            }}
            size="small"
            color="primary"
            aria-label="post type"
            sx={{
              border: "none",
              "& .MuiToggleButton-root": {
                color: "white", // Default color for buttons
                transition: "color 0.3s, background-color 0.3s", // Smooth transitions
                "&.Mui-selected": {
                  color: "orange", // Selected button text color
                  backgroundColor: "rgba(255, 165, 0, 0.2)", // Light orange background for selected
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Light hover effect
                },
              },
            }}
          >
            <ToggleButton value="NORMAL" aria-label="normal post">
              <PublicIcon />
              <span className='ml-2 font-semibold text-white'>Public</span>
            </ToggleButton> 
            <ToggleButton value="INSTITUTE" aria-label="institute post">
              <SchoolIcon />
              <span className='ml-2 font-semibold text-white'>Institute</span>
            </ToggleButton>
            
          </ToggleButtonGroup>

        </div>

        {/* Refresh Button */}
        {showRefreshButton && (
          <div
            className="mt-6 fixed top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2"
            onClick={handleRefresh}
          >
            <RefreshIcon />
            New posts available - Refresh
          </div>
        )}

        {/* Posts Section */}
        {loading && posts.length === 0 ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch posts: {error}</p>
        ) : posts.length === 0 && !loading ? (
          hasMore ? (
            <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
              <FeedIcon style={{ fontSize: '4rem' }} />
              <p className="mt-4">You've seen all current posts! Check older posts.</p>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  color: 'orange',
                  borderColor: 'orange',
                  marginTop: '12px',
                  '&:hover': {
                    backgroundColor: 'orange',
                    color: 'white',
                  },
                }}
                onClick={handleFetchOlderPosts}
                startIcon={<Autorenew />}
              >
                Load Older Posts
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
              <FeedIcon style={{ fontSize: '4rem' }} />
              <p className="mt-4">No more posts available.</p>
            </div>
          )
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 rounded-lg p-4 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar src={post?.profilePicUrl} />
                  <div>
                    <h3
                      onClick={() => handleUserProfileClick(post.userId)}
                      className="font-semibold cursor-pointer"
                    >
                      {post.userName}
                    </h3>
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

            {/* Loader for infinite scrolling */}
            {hasMore && (
              <div ref={observerRef} className="text-center text-gray-500">
                Loading more posts...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeed;
