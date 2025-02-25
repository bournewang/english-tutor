import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createLessonHistory } from '../api/history';
import { useUser } from '../context/UserContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const Lesson = ({ lesson, onNextSlide, onPreviousSlide, onFinalSlide }) => {
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
      if (currentIndex + 1 === slides.length - 1) {
        onFinalSlide();
      }
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-1 sm:p-2 rounded-t-lg">
        <h1 className="text-white text-lg sm:text-xl font-bold break-words">
          {lesson.name}
        </h1>
        <h2 className="text-white text-sm sm:text-base">
          {lesson.course.name}
        </h2>
      </div>
      
      <div className="p-1 sm:p-2 bg-blue-50 border-b border-blue-100">
        <h2 className="text-base sm:text-lg font-semibold text-blue-900">
          {slides[currentIndex].title}
        </h2>
      </div>

      <div 
        className="flex-grow overflow-y-auto p-4 sm:p-6 prose prose-sm sm:prose-base prose-blue max-w-none"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
        dangerouslySetInnerHTML={{ __html: slides[currentIndex].content }}
      />

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between border-t border-gray-200 p-1 sm:p-2 bg-gray-50 rounded-b-lg">
        <button
          className={`w-full sm:w-auto px-3 sm:px-4 py-1 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
            currentIndex === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          {t('lesson.previous')}
        </button>

        <span className="text-xs sm:text-sm font-medium text-gray-600 order-first sm:order-none">
          {t('lesson.progress', { current: currentIndex + 1, total: slides.length })}
        </span>

        {currentIndex === slides.length - 1 ? (
          <button
            className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base ${
              isFinished ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            onClick={onFinishLesson}
            disabled={isFinished}
          >
            {t('lesson.finish')}
          </button>
        ) : (
          <button
            className="w-full sm:w-auto px-3 sm:px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
            onClick={handleNext}
          >
            {t('lesson.next')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Lesson; 