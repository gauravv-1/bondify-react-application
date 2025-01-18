import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptConnectionRequest, getConnectionStatus } from "../../Redux/Slices/Profile/profileSlice";
import { Avatar, Button } from "@mui/material";
import moment from "moment/moment";
import ProfilePage from "../Profile/ProfilePage";

const NotificationCard = ({ notification, onProfileView }) => {
    const { userName, message, createdAt, senderId, eventType: initialEventType } = notification;
    const [eventType, setEventType] = useState(initialEventType); // Local state for UI updates
    const dispatch = useDispatch();
    const connectionStatus = useSelector((state) => state.profile.connectionStatus); // Individual connection status

    useEffect(() => {
        // Fetch connection status when component mounts
        if (senderId) {
            dispatch(getConnectionStatus(senderId));
        }
    }, [senderId, dispatch]);

    const handleAcceptRequest = async () => {
        try {
            // Accept connection request
            await dispatch(acceptConnectionRequest(senderId)).unwrap();
            setEventType("ACCEPT_CONNECTION"); // Update local state for UI
        } catch (error) {
            console.error("Failed to accept connection request:", error);
        }
    };

    const handleUserClick = () => {
        // Trigger the parent callback to show ProfilePage
        onProfileView(senderId);
    };

    const renderActionButton = () => {
        if (eventType === "SEND_CONNECTION" && !connectionStatus?.isConnected) {
            return (
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleAcceptRequest}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Accept
                </Button>
            );
        } else if (connectionStatus?.isConnected) {
            return <span className="text-green-600 font-semibold">Connected</span>;
        } else if (eventType === "POST_EVENT") {
            return null; // No button or action for POST_EVENT
        }
    };

    return (
        <div className="flex items-center justify-between p-2 bg-gray-900 shadow rounded-lg border-b-2 border-b-gray-800 sm:p-4">
            {/* User Info Section */}
            <div className="flex items-center">
                <Avatar className="mr-4">{userName ? userName[0] : "A"}</Avatar>
                <div>
                    <h3
                        onClick={handleUserClick}
                        className="font-bold cursor-pointer hover:underline"
                    >
                        {userName || "Null"}
                    </h3>
                    <p className="text-gray-400 text-sm">{message}</p>
                </div>
            </div>

            {/* Timestamp and Action Section */}
            <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">{moment(createdAt).fromNow()}</p>
                {renderActionButton()}
            </div>
        </div>
    );
};

export default NotificationCard;
