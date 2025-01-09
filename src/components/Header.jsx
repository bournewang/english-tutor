import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaUser, FaBars } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { user, setUser, setToken } = useUser();
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        <header className="flex h-16 justify-between items-center p-4 bg-blue-600 text-white relative">
            <div
                className="relative"
                onMouseEnter={() => setMenuVisible(true)}
            >
                <div className="flex items-center cursor-pointer">
                    {/* <FaHome className="mr-2" /> */}
                    <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
                    <Link to="/"><span>{t('header.title')}</span></Link>
                </div>
            </div>
            {/* <h1 className="text-xl font-bold">English Tutoring</h1> */}
            <div className="flex-grow items-center">
                
            </div>
            <LanguageSwitcher />

            {/* <div className="ml-6 mr-4">
                <div className="flex items-center cursor-pointer">
                    <FaBookOpen className="mr-2" />
                    <Link to='/tutoring'><span>{t('header.startLearning')}</span></Link>
                </div>
            </div> */}
            {user && (
            <div
                className="relative ml-4"
                onMouseEnter={() => setMenuVisible(true)}
            >
                <div className="flex items-center cursor-pointer">
                    {/* choose a suitable icon for dashboard */}
                    {/* <FaUser className="mr-2" /> */}
                    {/* <span>{t('header.dashboard')}</span> */}
                    <Link to='/dashboard'><FaBars className="mr-2" /></Link>
                </div>
            </div>
            )}
            
        </header>
    );
};

export default Header; 