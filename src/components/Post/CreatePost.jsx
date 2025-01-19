import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import { createPost } from "../../Redux/Slices/postSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null); // For image file
    const [preview, setPreview] = useState(null); // For image preview
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.post);

    const { user, userProfile, loading: isLoading } = useSelector((state) => state.auth);


    const userName = user.name;
    const profilePicUrl = user.userProfiledDto.profilePicUrl;

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Display image preview
        setPreview(URL.createObjectURL(selectedFile));
        setFile(selectedFile); // Set file for image upload
    };

    const handlePost = async () => {
        if (!content.trim() && !file) {
            
            return;

        }

        try {
            console.log("Dispatching createPost");
            await dispatch(createPost({ content, file, userName, profilePicUrl })).unwrap();
            console.log("Post dispatched successfully");
            toast.success('Post Created successful!');
            // Reset form fields
            setContent("");
            setFile(null);
            setPreview(null);

        } catch (err) {
            console.error("Error in handlePost:", err);
        }
    };

    return (
        <div className="p-2 bg-gray-900 text-white rounded-xl max-w-lg mx-auto">
            {/* User Avatar  */}
            <div className="flex items-center justify-between mb-4">
                {/* Avatar and User Info */}
                <div className="flex items-center">
                    <Avatar
                        alt="Gaurav Pisal"
                        src={userProfile?.profilePicUrl} // Replace with your avatar image URL
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "#1E40AF", // Fallback background color
                            color: "white",
                        }}
                    />
                    <div className="ml-3 cursor-pointer" onClick={() => { setActiveSection('Profile') }}>
                        <p className="text-white text-base font-semibold">{user?.name || "Guest"}</p>
                        <p className="text-gray-400 text-sm">{user?.email || "No email provided"}</p>
                    </div>
                </div>
            </div>
            {/* <p>Create Post</p>   */}
            <div className="flex items-start space-x-4">


                {/* Post Content */}

                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What is happening?!"
                        className="w-full bg-gray-800 text-white border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
                        rows={7}
                    />

                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-2">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-h-40 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                            {/* Image Upload */}
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <AddPhotoAlternateIcon className="text-gray-400 hover:text-blue-500" />
                            </label>
                            {/* Placeholder icons */}
                            <EmojiEmotionsIcon className="text-gray-400 hover:text-yellow-400" />
                            <LocationOnIcon className="text-gray-400 hover:text-red-500" />
                        </div>

                        {/* Post Button */}
                        <button
                            onClick={handlePost}
                            className={`bg-blue-500 text-white px-5 py-2 rounded-full flex items-center hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Posting..." : <SendIcon className="mr-2" />}
                            Post
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
