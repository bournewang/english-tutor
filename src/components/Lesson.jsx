import React, { useState, useEffect } from 'react';

const Lesson = (props) => {
  // const slides = lesson.slides;
  const { lesson } = props;
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    console.log("lesson from props: ", lesson);

    setSlides(lesson.slides);
  }, [lesson]);

  const [currentIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      props.onNextSlide(currentIndex + 1);
      setCurrentSlideIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    props.onFinishLesson();
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      props.onPreviousSlide(currentIndex - 1);
      setCurrentSlideIndex(currentIndex - 1);
    }
  };

  return (
    slides.length > 0 &&
    <div className="flex flex-col h-full bg-white rounded shadow">
      {/* <h1 className="text-xl font-semibold mb-2">Lesson: {lesson.name}</h1> */}
      <h1 className='bg-blue-200 text-2xl p-2 font-bold mb-2'>Course: {lesson.course.name} / {lesson.name}</h1>
      <h2 className="text-lg font-semiboldp-2 p-2 mb-2">{slides[currentIndex].title}</h2>
      <div
        className="flex-grow overflow-y-auto p-2 mb-4" style={{ maxHeight: '300px' }}
        dangerouslySetInnerHTML={{ __html: slides[currentIndex].content }}
      />
      <div className="flex justify-between border-t border-gray-300 p-2 mt-auto">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <p className="text-gray-500 text-sm">
          {currentIndex + 1} / {slides.length}
        </p>

        {currentIndex === slides.length - 1 ?
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={handleFinish}
          >
            Finish
          </button>
          :
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        }
      </div>
    </div>

  );
};

export default Lesson; 