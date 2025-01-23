import React from "react";
import { Button } from "@mui/material";
import { ErrorOutline, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white text-center px-4">
            <ErrorOutline style={{ fontSize: 100, color: "red" }} />
            <h1 className="text-4xl font-bold mt-4">Something Went Wrong</h1>
            <p className="text-gray-400 mt-2 text-lg">
                We encountered an unexpected error. Please try refreshing the page or go back to the home screen.
            </p>
            <div className="mt-6">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Home />}
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-500"
                >
                    Go to Home
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
