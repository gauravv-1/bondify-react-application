import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../Redux/Slices/Notification/notificationSlice";
import NotificationCard from "./NotificationCard";

const NotificationsPage = () => {
    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector((state) => state.notifications);
    const { user } = useSelector((state) => state.auth);

    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            dispatch(fetchNotifications(userId));
        }
    }, [dispatch, userId]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen p-4 max-w-2xl mx-auto">
            {/* <h1 className="text-2xl font-bold mb-4">Notifications</h1> */}
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;
