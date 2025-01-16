import { useDispatch, useSelector } from "react-redux";
import { acceptConnectionRequest, getConnectionStatus, sendConnectionRequest } from "../../Redux/Slices/Profile/profileSlice";
import { useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import moment from "moment/moment";

const NotificationCard = ({ notification, onConnect }) => {
    const { userName, message, createdAt, senderId } = notification;
    const { connectionStatus } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    console.log("notification: ", notification);
    // console.log("Sender Id: ", notification);
    console.log("Connection Status for username and userId: ",userName," ",senderId, connectionStatus);

    useEffect(() => {
        dispatch(getConnectionStatus(senderId));
    }, [senderId, dispatch]);

    const handleAcceptRequest = () => {
        dispatch(acceptConnectionRequest(senderId));
    };

    const renderActionButton = () => {
        if (connectionStatus?.isConnected) {
            return (
                <span className="text-green-600 font-semibold">Connected</span>
            );
        } else if (connectionStatus?.isRequested) {
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
        }

        else if (!connectionStatus?.isConnected) {
            return (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(sendConnectionRequest(senderId))}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Connect
                </Button>
            );
        }

    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 shadow rounded-lg">
            <div className="flex items-center">
                <Avatar className="mr-4">{userName ? userName[0] : 'A'}</Avatar>
                <div>
                    <h3 className="font-bold">{userName || "Null"}</h3>
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
