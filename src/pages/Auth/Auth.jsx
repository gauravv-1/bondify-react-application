import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../Redux/Slices/authSlice"; // Import login and signup actions
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // MUI Icons
import AppLogo from "./../../assets/logos/AppLogo.png";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(""); // Error for mismatched passwords

  // Function to check screen size
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  // useEffect to check screen size
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (e.target.id === "confirmPassword") {
      // Check if passwords match
      setPasswordError(e.target.value !== credentials.password ? "Passwords do not match" : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle Login
      const result = await dispatch(loginUser({ email: credentials.email, password: credentials.password })).unwrap();
      if (result) {
        const token = result.data; // JWT token from response
        localStorage.setItem("jwt", token);
        navigate("/dashboard");
      }
    } else {
      // Handle Signup
      if (credentials.password !== credentials.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      await dispatch(signupUser(credentials));
      if (!error) {
        navigate("/");
      }
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to the Google Login endpoint
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorize/google?redirect_uri=${process.env.REACT_APP_FRONTEND_URL}/oauth2/redirect`;
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4 sm:px-8">
      <div className="bg-gray-900 shadow-lg rounded-lg w-full max-w-md px-4 sm:px-6 py-6 sm:py-8">
        {/* Logo */}
        <div className="flex justify-center items-center h-full mb-3">
          <img src={AppLogo} width={isSmallScreen ? "70px" : "90px"} alt="Logo" />
        </div>

        {/* Header */}
        <h2 className={`text-${isSmallScreen ? "2xl" : "3xl"} font-bold text-center mb-2`}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className={`text-gray-400 text-center mb-4 text-${isSmallScreen ? "sm" : "base"}`}>
          {isLogin ? "Connect with your College friends, clubs, and more!" : "Join us and connect with the world around you!"}
        </p>

        {/* Error/Success Messages */}
        {error && <div className="text-red-700 rounded mb-2 text-center text-sm">{error}</div>}
        {successMessage && !isLogin && <div className="text-green-700 rounded mb-2 text-center text-sm">{successMessage}</div>}
        {passwordError && <div className="text-red-700 rounded mb-2 text-center text-sm">{passwordError}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-300 font-medium mb-1 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={credentials.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-300 font-medium mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3 relative">
            <label htmlFor="password" className="block text-gray-300 font-medium mb-1 text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-3 relative">
              <label htmlFor="confirmPassword" className="block text-gray-300 font-medium mb-1 text-sm">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div
                className="absolute right-3 top-[46px] transform -translate-y-1/2 cursor-pointer flex items-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? <VisibilityOff style={{ color: "white" }} /> : <Visibility style={{ color: "white" }} />}
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } text-sm`}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-4">
          <span className="bg-gray-700 w-full h-px"></span>
          <span className="text-gray-400 text-sm mx-2">OR</span>
          <span className="bg-gray-700 w-full h-px"></span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white font-semibold py-2 px-3 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
        >
          Continue with Google
        </button>

        {/* Toggle Login/Signup */}
        <p className="mt-5 text-center text-gray-400 text-sm">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
