import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FeedIcon from '@mui/icons-material/RssFeed';
import {
  checkForNewPosts,
  fetchInitialPosts,
  fetchSeenPosts,
  markPostsAsSeen,
  refreshPosts,
} from '../../Redux/Slices/Feed/feedSlice';

const MyFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, showRefreshButton, hasMore } = useSelector((state) => state.feed);
  const observerRef = useRef(null);
  const pageRef = useRef(0);

  useEffect(() => {
    dispatch(fetchInitialPosts());
    const interval = setInterval(() => dispatch(checkForNewPosts()), 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(refreshPosts());
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      dispatch(fetchSeenPosts({ page: pageRef.current, size: 10 }));
      pageRef.current += 1; // Increment page after fetching
    }
  };

  const handleFetchOlderPosts = () => {
    if (!loading && hasMore) {
      dispatch(fetchSeenPosts({ page: pageRef.current, size: 10 }));
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

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-10">
      <div className="max-w-3xl mx-auto p-4 relative">
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
        {loading && posts.length === 0 ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch posts: {error}</p>
        ) : posts.length === 0 && !loading ? (
          hasMore ? (
            <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
              <FeedIcon style={{ fontSize: '4rem' }} />
              <p className="mt-4">You've seen all current posts! Check older posts.</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={handleFetchOlderPosts}
              >
                Load Older Posts
              </button>
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
