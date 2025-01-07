   // src/context/UserContext.js

   import React, { createContext, useState, useContext, useEffect } from 'react';

   const UserContext = createContext();

   export const UserProvider = ({ children }) => {
     // Initialize user and token from local storage
     const [user, setUser] = useState(() => {
       const storedUser = localStorage.getItem('user');
       return storedUser ? JSON.parse(storedUser) : null;
     });

     const [token, setToken] = useState(() => localStorage.getItem('token'));

     // Update local storage whenever user or token changes
     useEffect(() => {
       if (user) {
         localStorage.setItem('user', JSON.stringify(user));
       } else {
         localStorage.removeItem('user');
       }
     }, [user]);

     useEffect(() => {
       if (token) {
         localStorage.setItem('token', token);
       } else {
         localStorage.removeItem('token');
       }
     }, [token]);

     return (
       <UserContext.Provider value={{ user, setUser, token, setToken }}>
         {children}
       </UserContext.Provider>
     );
   };

   export const useUser = () => {
     const context = useContext(UserContext);
     if (context === undefined) {
       throw new Error('useUser must be used within a UserProvider');
     }
     return context;
   };