import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useUser();
    const { t } = useTranslation();
    const handleLogout = () => {
        setUser(null);
        setToken(null);
        navigate('/login');
    }
    return (
        <div className='h-screen'>
            <Header />
            <div className="flex  bg-gray-100">
            { user && (
                <nav className="w-64 bg-white shadow-md">
                    <div className="p-6">
                        <h1 className="text-xl font-bold mb-4">{t('header.dashboard')}</h1>
                        <ul>
                            <li className="mb-2">
                                <Link to="/profile" className="block p-2 rounded hover:bg-gray-200">
                                    {t('header.profile')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/courses" className="block p-2 rounded hover:bg-gray-200">
                                    {t('header.courses')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/billing" className="block p-2 rounded hover:bg-gray-200">
                                    {t('header.billings')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/history" className="block p-2 rounded hover:bg-gray-200">
                                    {t('header.history')}
                                </Link>
                            </li>
                            {/* <li className="mb-2">
                                <button className="block p-2 rounded bg-red-500 text-white cursor-pointer" onClick={handleLogout}>Logout</button>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            )}
                <main className="flex-grow p-6">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout; 