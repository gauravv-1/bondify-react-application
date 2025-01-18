import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../Redux/Slices/Notification/notificationSlice";
import NotificationCard from "./NotificationCard";
import ProfilePage from "../Profile/ProfilePage";

const NotificationsPage = () => {
    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector((state) => state.notifications);
    const { user } = useSelector((state) => state.auth);
    const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user ID

    const userId = user?.id;

    const handleBackToSearch=()=>{
        setSelectedUserId(null);
    }

    useEffect(() => {
        if (userId) {
            dispatch(fetchNotifications(userId));
        }
    }, [dispatch, userId]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

    // If a user is selected, render only the ProfilePage
    if (selectedUserId) {
        return <ProfilePage userId={selectedUserId} onBack={handleBackToSearch}/>;
    }

    return (
        <div className="min-h-screen p-4 max-w-2xl mx-auto">
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onProfileView={(userId) => setSelectedUserId(userId)} // Pass callback to NotificationCard
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;
