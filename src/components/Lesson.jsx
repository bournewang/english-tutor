import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createLessonHistory } from '../api/history';
import { useUser } from '../context/UserContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const Lesson = ({ lesson, onNextSlide, onPreviousSlide }) => {
  const { t } = useTranslation();
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentSlideIndex] = useState(0);
  const { setUser } = useUser();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setSlides(lesson.slides);
  }, [lesson]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      onNextSlide(currentIndex + 1);
      setCurrentSlideIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onPreviousSlide(currentIndex - 1);
      setCurrentSlideIndex(currentIndex - 1);
    }
  };

  const onFinishLesson = () => {
    createLessonHistory({
      courseId: lesson.course.id,
      courseName: lesson.course.name,
      lessonId: lesson.id,
      lessonName: lesson.name,
    }).then(result => {
      if (result.user) setUser(result.user);
      setIsFinished(true);
    });
  };

  if (!slides.length) return null;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-t-lg">
        <h1 className="text-white text-xl font-bold">
          {lesson.course.name} / {lesson.name}
        </h1>
      </div>
      
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <h2 className="text-lg font-semibold text-blue-900">
          {slides[currentIndex].title}
        </h2>
      </div>

      <div 
        className="flex-grow overflow-y-auto p-6 prose prose-blue max-w-none"
        style={{ maxHeight: '400px' }}
        dangerouslySetInnerHTML={{ __html: slides[currentIndex].content }}
      />

      <div className="flex items-center justify-between border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentIndex === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <div className="flex items-center">
            <FaArrowLeft className="mr-2"/>
            {t('lesson.previous')}
          </div>
        </button>

        <span className="text-sm font-medium text-gray-600">
          {t('lesson.progress', { current: currentIndex + 1, total: slides.length })}
        </span>

        {currentIndex === slides.length - 1 ? (
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              isFinished
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            onClick={onFinishLesson}
            disabled={isFinished}
          >
            {t('lesson.finish')}
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={handleNext}
          >
            <div className="flex items-center">
              {t('lesson.next')}
              <FaArrowRight className="ml-2"/>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Lesson; 