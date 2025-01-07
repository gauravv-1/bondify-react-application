import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Slices/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import MUI Icons
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
        navigate("/dashboard");
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 sm:px-8">
            {/* Container */}
            <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-md px-6 sm:px-8 py-8 sm:py-10">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-4">
                    Connect with your friends and the world around you!
                </p>

                {/* Error Message */}
                {error && (
                    <div className=" text-red-700 rounded mb-2 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password types
                            id="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {/* Eye Icon for password visibility */}
                        <div
                            className="absolute right-4 top-[50px] transform -translate-y-1/2 cursor-pointer flex items-center"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <VisibilityOff style={{ color: "white" }} /> : <Visibility style={{ color: "white" }} />}
                        </div>
                    </div>


                    {/* Remember Me Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="remember" className="ml-2 text-gray-400">
                            Remember Me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                {/* Google Login */}
                <div className="mt-6 flex items-center justify-center">
                    <button
                        type="button"
                        className="w-full bg-white text-gray-900 font-medium py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="30px"
                                height="30px"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                />
                            </svg>
                            <span className="ml-2">Log in with Google</span>
                        </div>
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="mt-6 text-center text-gray-400">
                    Don’t have an account?{" "}
                    <Link to="/signup">
                        <span className="text-blue-500 hover:underline">Sign up</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
