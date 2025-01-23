import React from "react";
import PostPage from "../Post/PostPage";
import SearchPage from "../../pages/Search/SearchPage";
import MyFeed from "../../pages/Feed/MyFeed";
import NotificationsPage from "../../pages/Notification/NotificationsPage";
import ProfilePage from "../../pages/Profile/ProfilePage";
import { useSelector } from "react-redux";
import Message from "../../pages/Message/Message";



const MainContent = ({ section }) => {
  const {user} = useSelector((state) => state?.auth);
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold p-3 border-b-2 border-b-gray-800">{section}</h1>
      {section === 'Post' && <PostPage />} 
      {section === 'Search' && <SearchPage />} 
      {section === 'Home' && <MyFeed />} 
      {section === 'Notifications' && <NotificationsPage />} 
      {section === 'Profile' && <ProfilePage  userId={user?.id} userProfile={true}/>} 
      {section === 'Messages' && <Message/>} 
      
    </div>
  );
};

export default MainContent;
