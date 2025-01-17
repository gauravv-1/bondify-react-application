import React, { useEffect } from "react";
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
    Logout,
} from "@mui/icons-material";
import { getConnectionStatus, getRequestedUsersProfile, sendConnectionRequest } from "../../Redux/Slices/Profile/profileSlice";
import { fetchPosts } from "../../Redux/Slices/postSlice";
import PostPage from "../../components/Post/PostPage";
import { logout } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ userId, onBack, userProfile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, connectionStatus, loading, error } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(getRequestedUsersProfile(userId));
        dispatch(getConnectionStatus(userId));
        dispatch(fetchPosts(userId));
    }, [dispatch, userId]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

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
        <div className="min-h-screen bg-gray-950 text-white">
            <div className="max-w-4xl mx-auto">
                {/* Logout Button */}
                {userProfile&&
                (
                <div className="flex justify-end m-4">
                    <Button
                        variant="outlined"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            color: "white",
                            borderColor: "red",
                            '&:hover': {
                                borderColor: "darkred",
                                backgroundColor: "rgba(255, 0, 0, 0.1)",
                            },
                        }}
                    >
                        Logout
                    </Button>
                </div>
                )
                }

                {/* Back Button */}
                {!userProfile && (
                    <div className="flex items-center">
                        <IconButton onClick={onBack} className="text-white">
                            <ArrowBack sx={{ color: "white" }} />
                        </IconButton>
                    </div>
                )}

                {profile && (
                    <div className="bg-gray-950 p-6 rounded-lg shadow-lg">
                        {/* User Info Section */}
                        <div className="flex flex-col items-center text-center">
                            {/* Profile Picture */}
                            <Avatar
                                src={profile.userProfiledDto.profilePicUrl}
                                alt={profile.name}
                                sx={{
                                    width: { xs: 100, sm: 150, md: 200 },
                                    height: { xs: 100, sm: 150, md: 200 },
                                }}
                                className="mb-4"
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
                            {!userProfile && connectionStatus && (
                                <>
                                    {connectionStatus.isConnected ? (
                                        <Button
                                            variant="contained"
                                            startIcon={<CheckCircle />}
                                            disabled
                                            fullWidth
                                            sx={{
                                                bgcolor: "green",
                                                "&.Mui-disabled": {
                                                    bgcolor: "green",
                                                    color: "white",
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
                                            sx={{
                                                bgcolor: "#daa520",
                                                "&.Mui-disabled": {
                                                    bgcolor: "#daa520",
                                                    color: "white",
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
                        {!userProfile && (
                            <div className="mt-6">
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    fullWidth
                                    color="secondary"
                                    onClick={onBack}
                                    sx={{
                                        borderColor: "gray",
                                        "&:hover": {
                                            backgroundColor: "gray",
                                            color: "white",
                                        },
                                    }}
                                >
                                    Back to Search
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <PostPage requestedUserProfile={profile} requestedUserUserId={userId} />
        </div>
    );
};

export default ProfilePage;
