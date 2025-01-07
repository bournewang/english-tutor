import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaUser, FaHome } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { user, setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('User logged out');
        setUser(null);
        setToken(null);

        navigate('/login');
    };

    const handleMenuVisibility = (e) => {
        // if (!e.target.closest('.relative')) {
            setMenuVisible(false);
        // }   
    };

    useEffect(() => {
        document.addEventListener('click', handleMenuVisibility);
        return () => document.removeEventListener('click', handleMenuVisibility);
    }, []);

    return (
        <header className="flex justify-between items-center p-4 bg-blue-600 text-white relative">
            <div
                className="relative"
                onMouseEnter={() => setMenuVisible(true)}
            >
                <div className="flex items-center cursor-pointer">
                    <FaHome className="mr-2" />
                    <Link to="/"><span>English Tutoring</span></Link>
                </div>
            </div>
            {/* <h1 className="text-xl font-bold">English Tutoring</h1> */}
            <div className="flex-grow items-center">
                
            </div>
            <div className="mr-4">
                {/* add an Icon for Learning */}
                <div className="flex items-center cursor-pointer">
                    <FaBookOpen className="mr-2" />
                    <Link to='/tutoring'><span>Start Learning</span></Link>
                </div>

                
            </div>
            {user && (
            <div
                className="relative"
                onMouseEnter={() => setMenuVisible(true)}
            >
                <div className="flex items-center cursor-pointer">
                    {/* choose a suitable icon for dashboard */}
                    <FaUser className="mr-2" />
                    <span>Dashboard</span>
                </div>
                {menuVisible && (
                    <div className="absolute text-center right-0 mt-2 w-48 bg-white text-black shadow-lg rounded z-10">
                        <ul>
                            {/* should be a link to /profile */}
                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
                            {/* add other links here */}
                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/courses')}>Courses</li>
                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/billing')}>Billings</li>

                            <li className="p-2 bg-red-500 text-white cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
            )}
        </header>
    );
};

export default Header; 