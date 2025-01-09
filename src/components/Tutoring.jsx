// src/components/Tutoring.js
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import ChatHistory from './ChatHistory';
import Lesson from './Lesson';
import { TutorService } from '../services/TutorService';
import { useUser } from '../context/UserContext';
import { getLessonById } from '../api/lessons.js';
import { createLessonHistory, createCourseHistory } from '../api/history.js';

const Tutoring = () => {
  const { t } = useTranslation();
  const [chatMessages, setChatMessages] = useState([]);
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lessonId');
  const { user, setUser } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [tutorService] = useState(() => new TutorService());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const currentLessonId = lessonId || user.current_lesson_id;
    if (currentLessonId) {
      getLessonById(currentLessonId).then(setLesson);
    }
  }, [lessonId, user.current_lesson_id]);

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      tutorService.sendMessage(newMessage);
      const newChatMessage = {
        id: chatMessages.length + 1,
        sender: 'Student',
        message: newMessage,
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');
    }
  };

  const startHandler = async () => {
    tutorService.connectToWebsocket();
    setIsConnected(true);
    
    if (lesson) {
      setTimeout(() => {
        const prompt = `In this lesson we will learn ${lesson.course.name} ${lesson.name}. 
          Let's follow the lesson plan, Unless I ask to change the topic. 
          When a slide is finished, you can ask me to switch to the next slide. 
          The current slide content is: ${lesson.slides[currentSlideIndex].content}
          Do not repeat the content of the slide before you start teaching.
          You can use teaching methods such as role play, conversation, etc. 
          You can also use the content of the slide to help you teach.
          ${currentSlideIndex === 0 ? 'Now introduce yourself and start the lesson. You can start with "Hi, ..."' : 'Now continue the lesson.'}`;
        
        tutorService.sendMessage(prompt);
      }, 500);

      if (user.current_course_id !== lesson.course.id) {
        setTimeout(() => {
          createCourseHistory({
            courseId: lesson.course.id,
            courseName: lesson.course.name,
            completedAt: null,
          }).then(result => {
            if (result.user) setUser(result.user);
          });
        }, 60 * 1000);
      }
    } else {
      // prompt about free talk
      setTimeout(() => {
        const prompt = `I just want to try a free talk. 
        If I ask questions, do not repeat the question, just answer it like a huamn talking, unless you hardly hear me.
        Do not start with "OK, xxx", just start with "Hi, I'm ..." like a normal conversation.`;
        tutorService.sendMessage(prompt);
      }, 500);
    }
  };

  const endHandler = () => {
    tutorService.disconnectFromWebsocket();
    setIsConnected(false);
  };

  const micHandler = () => {
    if (micOn) {
      tutorService.micOff();
    } else {
      tutorService.micOn();
    }
    setMicOn(!micOn);
  };

  const handleSlideChange = (index, direction) => {
    setCurrentSlideIndex(index);
    const prompt = `just for your reference, I just switched to the ${direction} slide, the content is: 
      ${lesson.slides[index].content}. 
      You don't need to stop your conversation and start a new one, you can continue.`;
    
    tutorService.sendMessage(prompt);
    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      sender: 'Student',
      message: `${direction} slide`,
    }]);
  };

  const finishLesson = () => {
    createLessonHistory({
      courseId: lesson.course.id,
      courseName: lesson.course.name,
      lessonId: lesson.id,
      lessonName: lesson.name,
    }).then(result => {
      if (result.user) setUser(result.user);
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex p-4 bg-gray-100 overflow-y-auto">
        <div className="w-2/3 flex flex-col">
          <div className="flex justify-center items-center mb-4 bg-white rounded-lg p-6 shadow-sm">
            <img 
              src="/images/teacher.jpg" 
              alt="Teacher" 
              className="w-24 h-24 object-cover rounded-full mr-6 border-4 border-blue-100"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-gray-600">
                {t('tutoring.readyPrompt')}
              </p>
              <div className="flex space-x-3">
                {isConnected ? (
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    onClick={endHandler}
                  >
                    {t('tutoring.buttons.end')}
                  </button>
                ) : (
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    onClick={startHandler}
                  >
                    {t('tutoring.buttons.start')}
                  </button>
                )}
                <button 
                  className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                    micOn 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  onClick={micHandler}
                >
                  {t(micOn ? 'tutoring.buttons.micOff' : 'tutoring.buttons.micOn')}
                </button>
              </div>
            </div>
          </div>

          <div id="lesson" className="flex-grow">
            {lesson ? (
              <Lesson 
                lesson={lesson}
                onNextSlide={(index) => handleSlideChange(index, 'next')}
                onPreviousSlide={(index) => handleSlideChange(index, 'previous')}
                onFinishLesson={finishLesson}
              />
            ) : (
              <div className="flex justify-center items-center h-full bg-white rounded-lg shadow-sm p-8">
                <p className="text-gray-600">
                  {t('tutoring.freeTalk')}{' '}
                  <Link to="/courses" className="text-blue-500 hover:text-blue-600">
                    {t('tutoring.courses')}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/3 ml-4 flex flex-col">
          <div className="flex-grow bg-white rounded-lg shadow-sm overflow-hidden">
            <ChatHistory chatMessages={chatMessages} />
          </div>

          <div className="mt-4 flex items-center bg-white rounded-lg shadow-sm p-3">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('tutoring.inputPlaceholder')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="ml-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              onClick={handleSend}
            >
              {t('tutoring.buttons.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutoring;