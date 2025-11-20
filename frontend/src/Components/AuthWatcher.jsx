import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Add here routes that require login
const protectedRoutes = ['/body']

function AuthWatcher () {
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const token = localStorage.getItem('access_token');

        const isProtected = protectedRoutes.includes(currentPath);

        if (!isProtected && token) {
            localStorage.removeItem("access_token");
        }
    }, [location]);

    return null;
}

export default AuthWatcher;