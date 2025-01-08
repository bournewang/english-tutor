// src/components/Tutoring.js
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from './Header';
import ChatHistory from './ChatHistory';
import Lesson from './Lesson';
import { TutorService } from '../services/TutorService';
import { useUser } from '../context/UserContext';
import { getLessonById } from '../api/lessons.js';
import { createLessonHistory, createCourseHistory } from '../api/history.js';

const Tutoring = () => {
  const [chatMessages, setChatMessages] = useState([
    // { id: 1, sender: 'Tutor', message: 'Hello! How can I help you today?' },
  ]);
  // 
  const [searchParams] = useSearchParams();
  let lessonId = searchParams.get('lessonId');
  const { user, setUser } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [tutorService] = useState(() => new TutorService());
  // the current slide index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);


  useEffect(() => {
    if (!lessonId) {
      lessonId = user.current_lesson_id;
    }
    console.log("lesson id: ", lessonId);
    if (lessonId) {
      getLessonById(lessonId).then(setLesson);
    }
  }, [lessonId]);

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

  const sendTagMessage = (tag) => {
    setNewMessage(tag);
    handleSend();
  }

  const startHandler = async () => {
    console.log("====== startHandler: ", lesson);
    tutorService.connectToWebsocket();
    setIsConnected(true);
    console.log("start lesson: ", lesson);
    if (lesson) {
      console.log("send prompt after 500ms ");
      setTimeout(() => {
        let prompt = "In this lesson we will learn " + lesson.course.name + " " + lesson.name + ". "
          + "Let's follow the lesson plan, Unless I aske to change the topic. "
          + "When a slide is finished, you can ask me to switch to the next slide. "
          + "The current slide content is: " + lesson.slides[currentSlideIndex].content + "";
        if (currentSlideIndex === 0) {
          prompt += "Now introduce yourself and start the lesson.";
        } else {
          prompt += "I just lost the connection a few seconds ago, now continue the lesson.";
        }
        console.log("prompt: ", prompt);
        tutorService.sendMessage(prompt);
      }, 500);

      // not the last course, create a course history
      if (user.current_course_id !== lesson.course.id) {
        setTimeout(() => {
          const result = createCourseHistory({
            courseId: lesson.course.id,
            courseName: lesson.course.name,
            completedAt: null, // not completed
          });
          console.log("result: ", result);
          if (result.user) {
            setUser(result.user);
          }
        }, 60 * 1000);
      }
    }
  }

  const endHandler = () => {
    tutorService.disconnectFromWebsocket();
    setIsConnected(false);
  }

  const micHandler = () => {
    if (micOn) {
      tutorService.micOff();
    } else {
      tutorService.micOn();
    }
    setMicOn(!micOn);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  const handleNextSlide = (index) => {
    console.log("next slide: ", index);
    setCurrentSlideIndex(index);
    const prompt = "just for your reference, I just switched to the next slide, the content is: "
      + lesson.slides[index].content
      + ". You don't need to stop your conversation and start a new one, you can continue.";
    tutorService.sendMessage(prompt);
  }

  const handlePreviousSlide = (index) => {
    setCurrentSlideIndex(index);
    const prompt = "just for your reference, I just switched to the previous slide, the content is: "
      + lesson.slides[index].content
      + ". You don't need to stop your conversation and start a new one, you can continue.";
    tutorService.sendMessage(prompt);
    console.log("previous slide: ", index);
  }

  const finishLesson = () => {
    console.log("finish lesson");
    const result = createLessonHistory({
      courseId: lesson.course.id,
      courseName: lesson.course.name,
      lessonId: lesson.id,
      lessonName: lesson.name,
    });
    if (result.user) {
      setUser(result.user);
    }
  }

  const captureScreen = () => {
    tutorService.captureElementScreenshot('lesson');
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <Header />
      </div>
      <div className="flex-grow flex p-4 bg-gray-100 overflow-y-auto">
        <div className="w-2/3 flex flex-col">
          {/* <h1 className="text-2xl font-bold mb-4">Tutoring Session</h1> */}
          <div className="flex justify-center items-center mb-4">
            <img src="/images/teacher.jpg" alt="Teacher" className="w-32 h-32 object-cover rounded-full mr-4" />
            <div className="flex flex-col space-y-2">
              <p className="text-gray-500 text-sm">When you ready, click the start button to continue.</p>
              {isConnected ?
                <button className="bg-red-500 text-white px-4 py-2 rounded w-" onClick={endHandler}>End</button>
                :
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-" onClick={startHandler}>Start</button>
              }
              <button className={`px-4 py-2 rounded w- ${micOn ? 'bg-red-500 text-white' : 'bg-gray-300'}`} onClick={micHandler}>
                {micOn ? 'Mic Off' : 'Mic On'}
              </button>
            </div>

          </div>

          {/* add a button to capture the screen */}
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded w-1/3" onClick={captureScreen}>Capture Screen</button> */}
          <div id="lesson" className="h-3/5 flex-grow mb-4 overflow-y-auto border-t border-gray-300 rounded-lg p-4" style={{ maxHeight: '400px' }}>
            {lesson ? (
              // <div className='h-full'>
                <Lesson lesson={lesson} onNextSlide={handleNextSlide} onPreviousSlide={handlePreviousSlide} onFinishLesson={finishLesson} />
              // </div>
            ) : (
              <div className='flex justify-center items-center h-full'>
                <div className="flex flex-col space-y-4">
                  <p className="">Free talk, or choose a <Link className='text-blue-500' to="/courses">Courses</Link></p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 h-full ml-4 flex flex-col">
          {/* I want the char history container can expend by default */}
          <div className="border bg-white flex-grow overflow-y-scroll" >
            <ChatHistory chatMessages={chatMessages} />
          </div>
          <div className="flex justify-center items-center space-x-4 hidden">
            <button className="px-4 py-2 rounded w-1/3" onClick={() => sendTagMessage('tell a joke')}>Tell a joke</button>
            <button className="px-4 py-2 rounded w-1/3" onClick={() => sendTagMessage('tell a poem')}>Tell a poem</button>
            <button className="px-4 py-2 rounded w-1/3" onClick={() => sendTagMessage('tell a song')}>Tell a song</button>
          </div>
          <div className="mt-auto h-16 flex items-center mt-4">
            <input
              type="text"
              className="border p-2 flex-grow"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutoring;