'use client';

import { useState, useEffect } from 'react';

interface ClockProps {
  city: string;
  country: string;
  timezone: string;
  isHome?: boolean;
}

const clocks: ClockProps[] = [
  { city: 'Hong Kong', country: 'Home', timezone: 'Asia/Hong_Kong', isHome: true },
  { city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { city: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles' },
];

export default function WorldClockWidget() {
  const [times, setTimes] = useState<string[]>(Array(clocks.length).fill(''));
  
  useEffect(() => {
    const updateTimes = () => {
      const newTimes = clocks.map(clock => {
        return new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: clock.timezone,
          hour12: true
        });
      });
      setTimes(newTimes);
    };
    
    // 立即更新一次
    updateTimes();
    
    // 每分钟更新一次
    const interval = setInterval(updateTimes, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        World Clock
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {clocks.map((clock, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg">
            <div>
              <div className="font-medium">{clock.city}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{clock.country}</div>
            </div>
            <div className="text-xl font-bold">{times[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 