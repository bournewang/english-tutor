// src/components/Tutoring.js
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from './Header';
import ChatHistory from './ChatHistory';
import Lesson from './Lesson';
import { TutorService } from '../services/TutorService';
import { useUser } from '../context/UserContext';
import { getLessonById } from '../api/lessons.js';

const Tutoring = () => {
  const [chatMessages, setChatMessages] = useState([
    // { id: 1, sender: 'Tutor', message: 'Hello! How can I help you today?' },
  ]);
// 
  const [searchParams] = useSearchParams();
  let lessonId = searchParams.get('lessonId');
  const {user} = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [tutorService] = useState(() => new TutorService());


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

  const startHandler = async () => {
    tutorService.connectToWebsocket();
    setIsConnected(true);
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
          
          <div className="flex-grow mb-4 overflow-y-auto border-t border-gray-300 rounded-lg p-4">
            {lesson ? <Lesson lesson={lesson} /> : 
            <div className='flex justify-center items-center h-full'>
              {/* <h1 className='text-2xl font-bold'>Free Talk</h1> */}
            <div className="flex flex-col space-y-4">
              <p className="">Free talk, or choose a <Link className='text-blue-500' to="/courses">Courses</Link></p>
              
            </div>
            </div>
            }
          </div>
        </div>
        <div className="w-1/3 h-full ml-4 flex flex-col">
        {/* I want the char history container can expend by default */}
          <div className="border bg-white flex-grow overflow-y-scroll" >
            <ChatHistory chatMessages={chatMessages} />
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