import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { createPost } from "../../Redux/Slices/postSlice"; 
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"; 
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"; 
import LocationOnIcon from "@mui/icons-material/LocationOn"; 
import SendIcon from "@mui/icons-material/Send"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";

const CreatePost = () => { 
    const [content, setContent] = useState(""); 
    const [file, setFile] = useState(null); // For image file
    const [preview, setPreview] = useState(null); // For image preview
    const dispatch = useDispatch(); 
    const { loading, error } = useSelector((state) => state.post);

    const handleImageChange = (e) => { 
        const selectedFile = e.target.files[0]; 
        if (!selectedFile) return;

        // Display image preview
        setPreview(URL.createObjectURL(selectedFile));
        setFile(selectedFile); // Set file for image upload
    };

    const handlePost = async () => { 
        if (!content.trim() && !file) { 
            toast.error("Content or image is required!", { 
                position: "top-right", 
            }); 
            return; 
        }

        try { 
            await dispatch(createPost({ content, file })).unwrap(); 
            toast.success("Post created successfully!", { 
                position: "top-right", 
            });

            // Reset form fields
            setContent(""); 
            setFile(null); 
            setPreview(null);
        } catch (err) { 
            toast.error("Failed to create post. Please try again.", { 
                position: "top-right", 
            });
        } 
    };

    return ( 
        <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md max-w-lg mx-auto my-8"> 
        {/* <p>Create Post</p>   */}
            <div className="flex items-start space-x-4"> 
                {/* User Avatar */} 
                {/* <div className=""> 
                    <Avatar>A</Avatar>
                </div> */}

                {/* Post Content */} 
                
                <div className="flex-1"> 
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="What is happening?!" 
                        className="w-full bg-gray-800 text-white border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none" 
                        rows={6} 
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
