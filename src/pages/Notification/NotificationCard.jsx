import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptConnectionRequest, getConnectionStatus } from "../../Redux/Slices/Profile/profileSlice";
import { Avatar, Button } from "@mui/material";
import moment from "moment/moment";
import ProfilePage from "../Profile/ProfilePage";

const NotificationCard = ({ notification }) => {
    const { userName, message, createdAt, senderId, eventType: initialEventType } = notification;
    const [eventType, setEventType] = useState(initialEventType); // Local state for UI update
    const dispatch = useDispatch();
    const connectionStatus = useSelector((state) => state.profile.connectionStatus); // Individual connection status
    // console.log("Connection Stautus for userName: ",userName," UserId: ",senderId, " ",connectionStatus," and Notification is ",notification);




    useEffect(() => {
        dispatch(getConnectionStatus(senderId));
    }, [senderId, dispatch]);

    const handleAcceptRequest = async () => {
        try {
            await dispatch(acceptConnectionRequest(senderId)).unwrap();
            
            // Update local state and global notification state for both users
            setEventType("ACCEPT_CONNECTION");
        } catch (error) {
            console.error("Failed to accept connection request:", error);
        }
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
        } else if (connectionStatus?.isConnected ) {
            return (
                <span className="text-green-600 font-semibold">Connected</span>
            );
        } else if (eventType === "POST_EVENT") {
            return null; // Do not show any button or text
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 shadow rounded-lg">
            <div className="flex items-center">
                <Avatar className="mr-4">{userName ? userName[0] : "A"}</Avatar>
                <div>
                    <h3 className="font-bold cursor-pointer">{userName || "Null"}</h3>
                    <p className="text-gray-400 text-sm">{message}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">{moment(createdAt).fromNow()}</p>
                {renderActionButton()}
            </div>
        </div>
    );
};

export default NotificationCard;
