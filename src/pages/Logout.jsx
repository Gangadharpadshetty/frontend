import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
        navigate('/login');
    }, [logoutUser, navigate]);

    return null; // Return null because no UI is rendered by this component
}

export default Logout;
