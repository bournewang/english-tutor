import React from 'react';
// import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-700">Here you can manage your profile, courses, and billing information.</p>
        {/* Add more content or components here */}
      </main>
      </DashboardLayout>
  );
};

export default Dashboard; 