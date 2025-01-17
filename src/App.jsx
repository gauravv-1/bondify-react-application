import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import CompleteProfile from './components/Profile/CompleteProfile';
import { ToastContainer } from 'react-toastify/unstyled';
import ProfilePage from './pages/Profile/ProfilePage';
import Auth from './pages/Auth/Auth';


const App = () => {

  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>

    </>
  );
};

export default App;
