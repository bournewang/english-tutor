import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../api/courses'; // Ensure these functions are correctly named and exported
// import { getLessonsByCourseId } from '../api/lessons';
import { updateCurrentCourse } from '../api/user';
import DashboardLayout from './DashboardLayout';
import { useUser } from '../context/UserContext';

const CoursePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user} = useUser();
  
  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [courseId]);

  const handleUpdateCurrentCourse = async () => {
    await updateCurrentCourse(courseId);
    navigate(`/tutoring?lessonId=${course.lessons[0].id}`);
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
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <p className="text-gray-700 mb-8">{course.description}</p>

        {user && <button onClick={handleUpdateCurrentCourse} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Start Course</button>}

        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        <ul className="list-disc pl-5">
          {course.lessons.map((lesson) => (
            <li key={lesson.id} className="mb-2">
              <h3 className="text-xl font-semibold">{lesson.name}</h3>
              <p className="text-gray-600">{lesson.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage; 