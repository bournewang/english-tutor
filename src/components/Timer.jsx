import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = ({ isActive, initialSeconds = 0, onTimeUpdate, shouldReset }) => {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (shouldReset) {
      setSeconds(0);
    }
  }, [shouldReset]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          if (onTimeUpdate) {
            setTimeout(() => onTimeUpdate(newSeconds), 0);
          }
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, onTimeUpdate]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="font-medium">{t('tutoring.timer')}:</span>
      <span className="font-mono">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer; 