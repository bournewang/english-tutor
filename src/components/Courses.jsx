import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses';
import DashboardLayout from './DashboardLayout';
import { getCourseHistory } from '../api/history';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseCompleted, setCourseCompleted] = useState({});
  const [level, setLevel] = useState('A1/A2');
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
    loadCourseHistory();
  }, [level]);

  async function loadCourses(){
    try {
      const data = await getCourses(level);
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  
  // get course history
  async function loadCourseHistory() {
    const courseHistory = await getCourseHistory();
    console.log("courseHistory: ", courseHistory);
    // Correctly use reduce on the courseHistory array
    const courseMap = courseHistory.reduce((acc, course) => {
      acc[course.id] = course.completed_at || null; // Assuming you want to map course id to completed_at
      return acc;
    }, {});
    console.log("courseMap: ", courseMap);
    setCourseCompleted(courseMap);
  }  

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
        {/* add a level filter */}
        <div className="flex justify-center items-center mb-4"> 
          <span className="mr-2">Level: </span>
          <select className="border border-gray-300 rounded-md p-2" onChange={(e) => setLevel(e.target.value)}>
            <option value="A1/A2">A1/A2</option>
            <option value="B1/B2">B1/B2</option>
            <option value="C1/C2">C1/C2</option>
          </select>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <li
              key={course.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-700">{course.description}</p>
              {courseCompleted[course.id] && <p className="text-green-500"> ✅ </p>}
              {/* if course is not completed, show a running person emoji  */}
              {courseCompleted[course.id] === null && <p className="text-yellow-500"> ⏳ </p>}
              {/* {!courseCompleted[course.id] && <p className="text-gray-500"> ❌ </p>} */}
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage; 