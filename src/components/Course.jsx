import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../api/courses';
import { updateCurrentCourse } from '../api/user';
import { getLessonHistoryByCourseId } from '../api/history';
import DashboardLayout from './DashboardLayout';
import { useUser } from '../context/UserContext';

const CoursePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonFinished, setLessonFinished] = useState([]);
  const { user } = useUser();
  
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

    const loadLessonFinished = async () => {
      const lessonHistory = await getLessonHistoryByCourseId(courseId);
      const lessonIds = lessonHistory.map(lesson => lesson.id);
      setLessonFinished(lessonIds); 
    };

    loadLessonFinished();
  }, [courseId]); 

  const startLesson = async (lesson_id) => {
    navigate(`/tutoring?lessonId=${lesson_id}`);
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
        <h1 className="text-4xl font-bold text-center mb-6">{course.name}</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">{course.description}</p>

        <h2 className="text-3xl font-semibold mb-4">Lessons</h2>
        <ul className="space-y-4">
          {course.lessons.map((lesson) => (
            <li key={lesson.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold">{lesson.name}</h3>
                  <p className="text-gray-600">{lesson.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {lessonFinished.includes(lesson.id) && <span className="text-green-500">✅</span>}
                  {user && (
                    <button
                      onClick={() => startLesson(lesson.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      Start Lesson
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage; 