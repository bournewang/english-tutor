import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { getCourseHistory } from '../api/history';

const History = () => {
  const [courseHistory, setCourseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getCourseHistory();
        console.log(data);
        setCourseHistory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Learning History</h1>
        <div className="space-y-4">
          {courseHistory.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
              <div className="text-gray-600">
                {/* <p>Status: {course.completed_at ? 'Completed' : 'In Progress'}</p> */}
                
                  <div>Status: {course.completed_at ? 
                    // <i className="fas fa-check-circle text-green-500"></i> 
                    // show a check emoji
                    <span className="text-green-500">✅</span>
                    : 
                    // <i className="fas fa-times-circle text-red-500"></i>
                    // choose a better emoji for in progress, may be like a clock or a running man
                    <span className="text-red-500">🕒</span>
                    }
                 
                  &nbsp; 
                  { course.completed_at ? <span>Completed on: {new Date(course.completed_at).toLocaleDateString()}</span> : <span>In Progress</span>}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;