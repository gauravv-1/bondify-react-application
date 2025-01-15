import React from 'react';
import { Avatar, Button } from '@mui/material';
import moment from 'moment';

const NotificationCard = ({ notification, onConnect, connectionStatus }) => {
    const { userName, message, createdAt } = notification;

    const renderActionButton = () => {
        if (connectionStatus?.isConnected) {
            return <span className="text-green-600 font-semibold">Connected</span>;
        } else if (connectionStatus?.isRequested) {
            return <span className="text-gray-500 font-semibold">Requested</span>;
        }
        return (
            <Button
                variant="contained"
                size="small"
                onClick={() => onConnect(notification?.userId)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
            >
                Connect
            </Button>
        );
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
