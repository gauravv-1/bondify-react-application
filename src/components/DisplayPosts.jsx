import React, { useEffect, useState } from 'react';
import api from "../services/api.js";

const DisplayPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/api/v1/posts/core/users/1/allPosts');
                if (response.data && Array.isArray(response.data.data)) {
                    setPosts(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-center">All Posts</h2>
            <div className="flex flex-col items-center space-y-6">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                        <div
                            key={post.id}
                            className="bg-gray-950 shadow-lg rounded-lg overflow-hidden w-full flex flex-col "
                        >
                            <div className="p-4 flex-grow">
                                {/* Post Content */}
                                <p className="text-lg text-white-800 truncate">{post.content}</p>

                                {/* Conditional rendering for images */}
                                {post.imageUrl && Array.isArray(post.imageUrl) && post.imageUrl.length > 0 ? (
                                    <div className="post-image mt-4">
                                        {post.imageUrl.length === 1 ? (
                                            <img
                                                src={post.imageUrl[0]}
                                                alt="Post"
                                                className="w-full h-48 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="carousel-container relative h-48">
                                                <div className="flex overflow-x-scroll space-x-2 h-full">
                                                    {post.imageUrl.map((url, index) => (
                                                        <div key={index} className="flex-shrink-0">
                                                            <img
                                                                src={url}
                                                                alt={`Post image ${index}`}
                                                                className="w-48 h-48 object-cover rounded-md"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-4 text-gray-500">No images attached</p>
                                )}
                            </div>
                            <div className="p-4 border-t text-sm text-gray-500">
                                Posted on: {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
};

export default DisplayPosts;
