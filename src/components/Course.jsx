import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCourseById } from '../api/courses';
import { getLessonHistoryByCourseId } from '../api/history';
import DashboardLayout from './DashboardLayout';
import { useUser } from '../context/UserContext';

const CoursePage = () => {
  const { t } = useTranslation();
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
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500 text-center mt-4 p-4 bg-red-50 rounded-lg">
          {t('course.error', { error })}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-8 mb-8 shadow-sm">
          <h1 className="text-4xl font-bold text-center mb-4">{course.name}</h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            {course.description}
          </p>
          
          {/* Course Progress */}
          <div className="mt-6 flex justify-center items-center space-x-4">
            <div className="text-sm text-gray-600">
              {t('course.progress', {
                completed: lessonFinished.length,
                total: course.lessons.length
              })}
            </div>
            <div className="w-64 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(lessonFinished.length / course.lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{t('course.lessons')}</h2>
          <ul className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <li 
                key={lesson.id} 
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500 font-medium">
                        {t('course.lesson')} {index + 1}
                      </span>
                      {lessonFinished.includes(lesson.id) && (
                        <span className="text-green-500 bg-green-50 px-2 py-1 rounded-full text-sm">
                          {t('course.completed')} ✓
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mt-1">{lesson.name}</h3>
                    <p className="text-gray-600 mt-1">{lesson.description}</p>
                  </div>
                  {user && (
                    <button
                      onClick={() => startLesson(lesson.id)}
                      className="flex-shrink-0 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                    >
                      {lessonFinished.includes(lesson.id) ? t('course.review') : t('course.start')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage;