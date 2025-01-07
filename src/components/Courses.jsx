import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../api/courses';
import DashboardLayout from './DashboardLayout';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Courses</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <li
              key={course.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-700">{course.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage; 