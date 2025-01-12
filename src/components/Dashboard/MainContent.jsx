import React from "react";
import DisplayPosts from "../DisplayPosts";
import CreatePost from "../Post/CreatePost";
import PostPage from "../Post/PostPage";

const MainContent = ({ section }) => {
  return (
    <div className="flex-1 ">
      <h1 className="text-3xl font-bold p-3">{section}</h1>
      {/* <p className="text-gray-300">Content for {section} section goes here.</p> */}
      
      {/* <CreatePost/> */}
      {/* <DisplayPosts/> */}
      <PostPage/>
      
    </div>
  );
};

export default MainContent;
