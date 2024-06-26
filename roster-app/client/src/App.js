import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './UserContext';
import LogInPage from './LogIn';
import SignUpPage from './SignUp';
import HomePage from './Home';
import ForgotPasswordPage from './ForgotPassword';
import DashboardPassenger from './DashboardPassenger';
import DashboardCrew from './DashboardCrew';
import DashboardAdmin from './DashboardAdmin';

function App() {
    const { user } = useUser();

    const getDashboard = () => {
        console.log("Current user:", user); // Debug: Check the user data
        if (!user || !user.userDetails) {
            console.log("Redirecting to login, no user data available.");
            return <Navigate to="/login" />;
        }

        switch (user.userDetails.userType) {
            case 'passenger':
                return <DashboardPassenger />;
            case 'admin':
                return <DashboardAdmin />;
            case 'crew':
                return <DashboardCrew />;
            default:
                console.log("User type not recognized, redirecting to login.");
                return <Navigate to="/login" />;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/DashBoardA" element={<DashboardAdmin />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/dashboard" element={getDashboard()} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
