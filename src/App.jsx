// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tutoring from './components/Tutoring';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Courses from './components/Courses';
import Course from './components/Course';
import Billing from './components/Billing';
import History from './components/History';
// import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectToTutoring from './components/RedirectToTutoring';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import FAQ from './components/FAQ';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<RedirectToTutoring />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutoring" element={<ProtectedRoute><Tutoring /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} /> */}
        {/* <Route path="/courses/:courseId" element={<ProtectedRoute><Course /></ProtectedRoute>} /> */}
        <Route path="/courses" element={<Courses/>} />
        <Route path="/courses/:courseId" element={<Course/>} />        
        <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/faq" element={<FAQ/>} />
      </Routes>
    </Router>
  );
};

export default App;