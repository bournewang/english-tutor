import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ChatHistory = ({ chatMessages }) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-t-lg">
        <h2 className="text-white text-lg font-semibold">
          {t('chat.title')}
        </h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'Student' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender !== 'Student' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.sender === 'Student'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="whitespace-pre-wrap">{msg.message}</p>
            </div>

            {msg.sender === 'Student' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory; 