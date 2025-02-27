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
import { createCourseHistory } from '../api/history.js';
import { getUserInfo, updateRemainingHours } from '../api/user.js';
import { FaPlay, FaStop, FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import Timer from './Timer';

const Tutoring = () => {
  const { t } = useTranslation();
  const [chatMessages, setChatMessages] = useState([]);
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lessonId');
  const { user, setUser } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  // const [micOn, setMicOn] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [tutorService] = useState(() => new TutorService());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('lesson');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [shouldResetTimer, setShouldResetTimer] = useState(false);
  const [isManualDisconnect, setIsManualDisconnect] = useState(false);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  useEffect(() => {
    const currentLessonId = lessonId || user.current_lesson_id;
    if (currentLessonId) {
      getLessonById(currentLessonId).then(setLesson);
    }

    getUserInfo().then(setUser);
  }, [lessonId, user.current_lesson_id]);

  const sendInitialMessage = () => {
    if (lesson) {
      const prompt = `In this lesson we will learn ${lesson.course.name} ${lesson.name}. 
        Let's follow the lesson plan, Unless I ask to change the topic. 
        There are ${lesson.slides.length} slides in this lesson.
        When a slide is finished, you can ask me to switch to the next slide. 
        I will send every slide content to you.
        Do not repeat the content of the slide before you start teaching.
        You can use teaching methods such as role play, conversation, etc. 
        You can also use the content of the slide to help you teach.
        When all the slides are finished, you can ask me to finish the lesson.
        The current slide content is: ${lesson.slides[currentSlideIndex].content}. 
        ${currentSlideIndex === 0 ? 'Now introduce yourself and start the lesson. You can start with "Hi, ..."' : 'Now continue the lesson.'}`;
      
      tutorService.sendMessage(prompt);
    } else {
      // prompt about free talk
      const prompt = `I just want to try a free talk. 
      If I ask questions, do not repeat the question, just answer it like a huamn talking, unless you hardly hear me.
      Do not start with "OK, xxx", just start with "Hi, I'm ..." like a normal conversation.`;
      tutorService.sendMessage(prompt);
    }
  };

  useEffect(() => {
    // Set up connection state change handler
    tutorService.onConnectionStateChange = (isConnected) => {
      setIsConnected(isConnected);
      console.log("isConnected: ", isConnected);
      console.log("isManualDisconnect: ", isManualDisconnect);
      if (isConnected) {
        sendInitialMessage();
      } else if (!isManualDisconnect) {
        // Attempt to reconnect after a short delay if it wasn't a manual disconnect
        setTimeout(() => {
          tutorService.connectToWebsocket();
        }, 3000);
      }
    };
    
    // Clean up the callback when component unmounts
    return () => {
      tutorService.onConnectionStateChange = null;
    };
  }, [tutorService, lesson, currentSlideIndex, isManualDisconnect]);

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
    setIsManualDisconnect(false);
    tutorService.connectToWebsocket();
    setIsConnected(true);    
    // tutorService.micOn();
    // setMicOn(true);
    setIsTimerActive(true);
    setShouldResetTimer(true);    
    
    if (lesson && user.current_course_id !== lesson.course.id) {
      setTimeout(() => {
        createCourseHistory({
          courseId: lesson.course.id,
          courseName: lesson.course.name,
          completedAt: null,
        }).then(result => {
          if (result.user) setUser(result.user);
        });
      }, 6 * 1000);
    }
  };

  const endHandler = async () => {
    setIsManualDisconnect(true);
    tutorService.disconnectFromWebsocket();
    setIsConnected(false);
    // tutorService.micOff();
    // setMicOn(false);

    setIsTimerActive(false);
    setShouldResetTimer(false);
    // Convert seconds to minutes and update remaining hours
    const usedMinutes = Math.ceil(sessionTime / 60);
    try {
      const updatedUser = await updateRemainingHours(usedMinutes);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update remaining hours:', error);
    }
  };

  const handleSlideChange = (index, direction) => {
    setCurrentSlideIndex(index);
    
    // If this is the final slide, send a completion message
    if (lesson && index === lesson.slides.length - 1) {
      const prompt = `We've reached the final slide. Let's wrap up the lesson with a summary of what we've learned.`;
      tutorService.sendMessage(prompt);
    } else {
      const prompt = `just for your reference, I just switched to the ${direction} slide, the content is: 
        ${lesson.slides[index].content}. 
        You don't need to stop your conversation and start a new one, you can continue.`;
      tutorService.sendMessage(prompt);
    }
    
    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      sender: 'Student',
      message: `${direction} slide`,
    }]);
  };

  const handleTimeUpdate = (seconds) => {
    setSessionTime(seconds);
  };

  const formatRemainingTime = (hours) => {
    const totalMinutes = Math.floor(hours * 60);
    const remainingHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${remainingHours}h ${remainingMinutes}m`;
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header className="flex-shrink-0" />
      
      <div className="bg-white px-4 py-2 flex justify-between items-center shadow-sm">
        <div className="text-sm">
          <span className="font-medium">{t('tutoring.remainingHours')}:</span>
          <span className="ml-2">{formatRemainingTime(user.remaining_hours || 0)}</span>
        </div>
          <Timer 
            isActive={isTimerActive}
            initialSeconds={sessionTime}
            onTimeUpdate={handleTimeUpdate}
            shouldReset={shouldResetTimer}
          />
      </div>

      {/* Mobile tabs - fixed height */}
      <div className="lg:hidden flex border-b bg-white flex-shrink-0">
        <button
          onClick={() => setActiveTab('lesson')}
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'lesson' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          {t('lesson.title')}
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          {t('chat.title')}
        </button>
      </div>

      {/* Main content area - take remaining height */}
      <div className="flex-1 min-h-0"> {/* min-h-0 is crucial here */}
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-100 overflow-hidden">
          {/* Left column - Lesson */}
          <div className={`lg:col-span-2 flex flex-col min-h-0 ${
            activeTab === 'chat' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Teacher info - fixed height */}
            <div className="flex justify-center items-center mb-4 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              {/* make the image align center on vertical    */}
              <div className="flex-col justify-center items-center">
                <img 
                  src="/images/teacher.jpg" 
                  alt="Teacher" 
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full border-4 border-blue-100"
                />
              </div>
            
              <div className="flex flex-col ml-4 space-y-3 text-center sm:text-left">
                {!isConnected && (
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t('tutoring.readyPrompt')}
                  </p>
                )}
                <div className="flex flex-col justify-center items-center sm:flex-row gap-3 sm:space-x-5">
                  {isConnected ? (
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 w-48"
                      onClick={endHandler}
                    >
                      <div className="flex items-center justify-center">
                        {t('tutoring.buttons.end')} <FaStop className="ml-2"/>
                      </div>
                    </button>
                  ) : (
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 w-48"
                      onClick={startHandler}
                    >
                      <div className="flex items-center justify-center">
                        {t('tutoring.buttons.start')} <FaPlay className="ml-2"/>
                      </div>
                    </button>
                  )}
                  {/* <button 
                    className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                      micOn 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={micHandler}
                  >
                    <div className="flex items-center justify-center"> 
                      {t(micOn ? 'tutoring.buttons.micOff' : 'tutoring.buttons.micOn')} <FaMicrophone className="ml-2"/>
                    </div>
                  </button> */}
                </div>
              </div>
            </div>

            {/* Lesson content - scrollable */}
            <div className="flex-1 min-h-0 overflow-auto">
              {lesson ? (
                <Lesson 
                  lesson={lesson}
                  onNextSlide={(index) => handleSlideChange(index, 'next')}
                  onPreviousSlide={(index) => handleSlideChange(index, 'previous')}
                  onFinalSlide={() => {}}
                />
              ) : (
                <div className="h-full flex justify-center items-center bg-white rounded-lg shadow-sm p-4">
                  <p className="text-gray-600 text-sm sm:text-base text-center">
                    {t('tutoring.freeTalk')}{' '}
                    <Link to="/courses" className="text-blue-500 hover:text-blue-600">
                      {t('tutoring.courses')}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Chat */}
          <div className={`flex flex-col min-h-0 ${
            activeTab === 'lesson' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Chat messages - scrollable */}
            <div className="flex-1 min-h-0 bg-white rounded-lg shadow-sm overflow-hidden">
              <ChatHistory chatMessages={chatMessages} />
            </div>

            {/* Chat input - fixed height */}
            <div className="flex-shrink-0 mt-4 bg-white rounded-lg shadow-sm p-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={t('tutoring.inputPlaceholder')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleSend}
                >
                  <div className="flex items-center">
                    <span className="hidden sm:inline">{t('tutoring.buttons.send')}</span>
                    <FaPaperPlane className="sm:ml-2"/>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutoring;