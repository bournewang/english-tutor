import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { FaBook, FaChalkboardTeacher, FaUser, FaTimes, FaBars, FaClock, FaSignOutAlt } from 'react-icons/fa';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useUser();
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: t('courses.title'), href: '/courses', icon: FaBook },
        { name: t('profile.title'), href: '/profile', icon: FaUser },
        { name: t('billing.title'), href: '/billing', icon: FaChalkboardTeacher },
        { name: t('history.title'), href: '/history', icon: FaClock },
    ];

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header - visible on all screen sizes */}
            <div className="lg:pl-64">
                <Header />
            </div>

            {/* Mobile menu button */}
            <button
                className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-blue-600 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
                        <h1 className="text-xl font-bold text-white">{t('header.dashboard')}</h1>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                                    flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                                    ${location.pathname === item.href
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'}
                                `}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        ))}
                        <button onClick={handleLogout} className="flex items-center px-4 py-3 text-sm rounded-lg transition-colors bg-red-500 text-white hover:bg-red-600">
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            {t('header.logout')}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="lg:pl-64 min-h-screen">
                <main className="py-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout; 