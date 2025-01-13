import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, IconButton } from "@mui/material";
import {
    ArrowBack,
    LocationOn,
    School,
    Cake,
    PersonAdd,
    CheckCircle,
    HourglassEmpty,
} from "@mui/icons-material";
import { getConnectionStatus, getRequestedUsersProfile, sendConnectionRequest } from "../../Redux/Slices/Profile/profileSlice";
import { fetchPosts } from "../../Redux/Slices/postSlice";
import PostPage from "../../components/Post/PostPage";

const ProfilePage = ({ userId, onBack }) => {
    const dispatch = useDispatch();
    const { profile, connectionStatus, loading, error } = useSelector(
        (state) => state.profile
    );
    console.log("User Id at Profile Page: ",userId);

    useEffect(() => {
        dispatch(getRequestedUsersProfile(userId));
        dispatch(getConnectionStatus(userId));
        console.log("Dispatching req from ProfilePage with user id : ",userId," to Fetch Posts");
        dispatch(fetchPosts(userId));
    }, [dispatch, userId]);



    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-950 text-white">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <div className="flex items-center">
                        <IconButton onClick={onBack} className="text-white">
                            <ArrowBack sx={{ color: 'white' }} />
                        </IconButton>
                    </div>

                    {profile && (
                        <div className="bg-gray-950 p-6 rounded-lg shadow-lg">
                            {/* User Info Section */}
                            <div className="flex flex-col items-center text-center">
                                {/* Profile Picture */}
                                <Avatar
                                    src={profile.userProfiledDto.profilePicUrl}
                                    alt={profile.name}
                                    className="w-40 h-40 mb-4"
                                    sx={{ width: '200px', height: '200px' }}
                                />
                                {/* Name and Username */}
                                <h2 className="text-2xl font-bold">{profile.name}</h2>
                                <p className="text-gray-400 text-lg">@{profile?.userProfiledDto.username}</p>
                            </div>

                            {/* Additional Info Section */}
                            <div className="mt-6 space-y-4 text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <School fontSize="small" />
                                    <p className="text-lg">
                                        {profile?.userProfiledDto.instituteDto.name},{" "}
                                        {profile?.userProfiledDto.instituteDto.location}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <LocationOn fontSize="small" />
                                    <p className="text-lg">{profile?.userProfiledDto.instituteDto.location}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Cake fontSize="small" />
                                    <p className="text-lg">{profile?.userProfiledDto.birthDate}</p>
                                </div>
                            </div>

                            {/* Connection Status Section */}
                            <div className="mt-8 flex justify-center">
                                {connectionStatus && (
                                    <>
                                        {connectionStatus.isConnected ? (
                                            <Button
                                                variant="contained"
                                                startIcon={<CheckCircle />}
                                                disabled
                                                fullWidth
                                                // className="bg-green-600 hover:bg-green-500"
                                                sx={{
                                                    bgcolor: 'green',
                                                    '&.Mui-disabled': {
                                                        bgcolor: 'green', // Lighter green color for the disabled state
                                                        color: 'white', // Text color when disabled
                                                    },
                                                }}

                                            >
                                                Connected
                                            </Button>
                                        ) : connectionStatus.isRequested ? (
                                            <Button
                                                variant="contained"
                                                startIcon={<HourglassEmpty />}
                                                disabled
                                                fullWidth
                                                // className="bg-yellow-600 hover:bg-yellow-500"
                                                sx={{
                                                    bgcolor: '#daa520',
                                                    '&.Mui-disabled': {
                                                        bgcolor: '#daa520', // Lighter yellow for disabled state
                                                        color: 'white',
                                                    },
                                                }}
                                            >
                                                Request Sent
                                            </Button>

                                        ) : (
                                            <Button
                                                variant="contained"
                                                startIcon={<PersonAdd />}
                                                fullWidth
                                                color="primary"
                                                onClick={() => {
                                                    dispatch(sendConnectionRequest(userId));
                                                }}
                                                className="bg-blue-600 hover:bg-blue-500"
                                            >
                                                Add Connection
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Back to Search Button */}
                            <div className="mt-6">
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    fullWidth
                                    color="secondary"
                                    onClick={onBack}
                                    className="text-gray-300 border-gray-600 hover:bg-gray-700"
                                >
                                    Back to Search
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PostPage requestedUserProfile={profile} requestedUserUserId={userId}/>
        </>
    );
};

export default ProfilePage;
