import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptConnectionRequest, getConnectionStatus } from "../../Redux/Slices/Profile/profileSlice";
import { Avatar, Button } from "@mui/material";
import moment from "moment/moment";
import { CheckCircle, ConnectWithoutContact } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';

const NotificationCard = ({ notification, onProfileView, connectionStatus }) => {
    console.log("Notification Whole: -",notification);
    const { userName, message, createdAt, senderId, eventType: initialEventType, userProfileUrl } = notification;
    const [eventType, setEventType] = useState(initialEventType); // Local state for UI updates
    // const [connectionStatus, setConnectionStatus] = useState(null);
    const dispatch = useDispatch();
    // const connectionStatus = useSelector((state) => state.profile.connectionStatus);
    console.log("Connection status for userName: -", senderId, " ", connectionStatus, "eventType:- ", eventType, "userProfileUrl: ",userProfileUrl);



    // useEffect(() => {
    //     // Fetch connection status when component mounts
    //     if (senderId) {
    //         dispatch(getConnectionStatus(senderId));
    //     }
    // }, [senderId, dispatch]);

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
        // Logic for rendering the button or status based on eventType and connectionStatus
        if (eventType === "SEND_CONNECTION" && connectionStatus && !connectionStatus?.isConnected) {
            return (

                <Button variant="outlined"
                    size="small"
                    className="text-orange-400"
                    sx={{color:"orange", borderColor:"orange"}}
                    onClick={handleAcceptRequest}
                    startIcon={<CheckCircle />}>
                    Accept
                </Button>
                // <Button
                //     variant="contained"
                //     size="small"
                //     o
                //     className="bg-blue-500 hover:bg-blue-600 text-white"
                // >
                //     {/* <CheckCircle sx={{marginRight:"5px",fontSize:"20px"}}/>  */}
                //     Accept
                // </Button>
            );
        } else if (connectionStatus && connectionStatus?.isConnected) {
            return <span className="text-green-600 font-semibold"><ConnectWithoutContact sx={{ fontSize: 30 }} /></span>;
        }
        // No action for other event types or conditions
        return null;
    };

    return (
        <div className="flex items-center justify-between p-2 bg-gray-900 shadow rounded-lg border-b-2 border-b-gray-800 sm:p-4">
            {/* User Info Section */}
            <div className="flex items-center">
                <Avatar
                src={userProfileUrl}
                 className="mr-4"
                 alt={userName ? userName[0] : "A"}
                 />
                    
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
