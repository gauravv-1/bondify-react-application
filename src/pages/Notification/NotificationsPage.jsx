import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../Redux/Slices/Notification/notificationSlice";
import { fetchConnectionStatuses } from "../../Redux/Slices/Profile/profileSlice";
import NotificationCard from "./NotificationCard";
import ProfilePage from "../Profile/ProfilePage";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const { connectionStatuses } = useSelector((state) => state.profile);
  console.log("Connection Statuses ",connectionStatuses);
  const { user } = useSelector((state) => state.auth);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotifications(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (notifications.length > 0) {
      const userIds = notifications.map((n) => n.senderId);
      console.log("userIds:- ",userIds);
      dispatch(fetchConnectionStatuses(userIds));
    }
  }, [dispatch, notifications]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  if (selectedUserId) {
    return <ProfilePage userId={selectedUserId} onBack={() => setSelectedUserId(null)} />;
  }

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <div className="space-y-4">
        {notifications.map((notification) => (
            
          <NotificationCard
            key={notification.id}
            notification={notification}
            connectionStatus={connectionStatuses[notification.senderId]}
            onProfileView={(userId) => setSelectedUserId(userId)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
