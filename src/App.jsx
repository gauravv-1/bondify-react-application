import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import CompleteProfile from './components/Profile/CompleteProfile';
import { ToastContainer } from 'react-toastify/unstyled';
import ProfilePage from './pages/Profile/ProfilePage';
import Auth from './pages/Auth/Auth';
import ProtectedRoute from './routes/ProtectedRoute';
import { useDispatch } from 'react-redux';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Load auth state from localStorage
    const token = localStorage.getItem('jwt');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(loginSuccess({ token, user }));
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}  >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/profile/:userProfileId" element={<ProfilePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

    </>
  );
};

export default App;
