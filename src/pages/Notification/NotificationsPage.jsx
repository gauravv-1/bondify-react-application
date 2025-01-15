import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchNotifications,
    sendConnectionRequest,
} from '../../Redux/Slices/Notification/notificationSlice';
import { getConnectionStatus } from '../../Redux/Slices/Profile/profileSlice';
import NotificationCard from './NotificationCard';

const NotificationsPage = () => {
    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector((state) => state.notifications);
    const { user } = useSelector((state) => state.auth);
    const { connectionStatus } = useSelector((state) => state.profile);

    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            dispatch(fetchNotifications(userId));
            // dispatch(getConnectionStatus(userId)); // Fetch connection status once
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (notifications.length > 0) {
            notifications.forEach((notification) => {
                dispatch(getConnectionStatus(notification.userId));
            });
        }
    }, [notifications, dispatch]);
    

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <NotificationCard
                        key={notification.userName}
                        notification={notification}
                        onConnect={(notificationUserId) =>
                            dispatch(sendConnectionRequest(notificationUserId))
                        }
                        connectionStatus={connectionStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;
