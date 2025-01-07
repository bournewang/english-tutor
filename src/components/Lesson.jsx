import React, { useState, useEffect } from 'react';

const Lesson = (props) => {
    // const slides = lesson.slides;
    const { lesson } = props;
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        console.log("lesson from props: ", lesson);

        setSlides(lesson.slides);
    }, [lesson]);
  // Sample course content slides
//   const slides = [
//     { id: 1, title: 'Introduction', content: "A wave is a pattern of motion that carries energy. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. <br/> A wave is a pattern of motion that carries energy. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. <br/>A wave is a pattern of motion that carries energy. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. <br> When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements." },
//     { id: 2, title: 'Lesson 1', content: 'This is the content for lesson 1.' },
//     { id: 3, title: 'Lesson 2', content: 'This is the content for lesson 2.' },
//     { id: 4, title: 'Conclusion', content: 'Thank you for completing the course!' },
//   ];

  const [currentIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentSlideIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentSlideIndex(currentIndex - 1);
    }
  };

  return (
    slides.length > 0 && 
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-semibold mb-2">{lesson.name}</h1>
      <h2 className="text-lg font-semibold mb-2">{slides[currentIndex].title}</h2>
      <div
        className="flex-grow overflow-y-auto mb-4" style={{ maxHeight: '300px' }}
        dangerouslySetInnerHTML={{ __html: slides[currentIndex].content }}
      />
      <div className="flex justify-between">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
    
  );
};

export default Lesson; 