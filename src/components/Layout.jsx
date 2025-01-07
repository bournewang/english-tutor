import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    // const navigate = useNavigate();
    // const { user, setUser, setToken } = useUser();

    return (
        <div>
            <Header />
                <div className="flex-grow p-6">
                    {children}
                </div>
            <Footer />
        </div>
    );
};

export default Layout; 