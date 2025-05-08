'use client';

import { useState, useEffect, useCallback } from 'react';

interface Event {
  name: string;
  date: string;
  icon: string;
  location: string;
  color: string;
}

// 计算下一个农历新年的日期
const getNextChineseNewYear = (): string => {
  // 未来几年的农历新年日期
  const chineseNewYears: {[key: number]: string} = {
    2025: '2025-01-29',
    2026: '2026-02-17',
    2027: '2027-02-06',
    2028: '2028-01-26',
    2029: '2029-02-13',
    2030: '2030-02-03'
  };
  
  const currentYear = new Date().getFullYear();
  const today = new Date();
  
  // 优先检查今年的农历新年是否已过
  if (chineseNewYears[currentYear] && new Date(chineseNewYears[currentYear]) > today) {
    return chineseNewYears[currentYear];
  }
  
  // 如果今年的已过或没有数据，则返回下一年的
  return chineseNewYears[currentYear + 1] || '2025-01-29'; // 默认值
};

// 计算下一个圣诞节的日期
const getNextChristmas = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // 今年的圣诞节
  const thisYearChristmas = new Date(`${currentYear}-12-25`);
  
  // 如果今年的圣诞节已经过了，则返回明年的
  if (currentDate > thisYearChristmas) {
    return `${currentYear + 1}-12-25`;
  }
  
  // 否则返回今年的
  return `${currentYear}-12-25`;
};

// 重要事件列表
const events: Event[] = [
  {
    name: 'Chinese New Year',
    date: getNextChineseNewYear(),
    icon: '🧧',
    location: 'Global',
    color: 'from-red-50 to-yellow-50 dark:from-red-900/30 dark:to-yellow-900/30'
  },
  {
    name: 'Christmas',
    date: getNextChristmas(),
    icon: '🎄',
    location: 'Global',
    color: 'from-red-50 to-green-50 dark:from-red-900/30 dark:to-green-900/30'
  },
  {
    name: 'Los Angeles Olympic Games',
    date: '2028-07-21',
    icon: '🏅',
    location: 'Los Angeles, USA',
    color: 'from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30'
  },
  {
    name: 'Halloween',
    date: new Date().getMonth() >= 9 && new Date().getDate() > 31 ? `${new Date().getFullYear() + 1}-10-31` : `${new Date().getFullYear()}-10-31`,
    icon: '🎃',
    location: 'Global',
    color: 'from-orange-50 to-purple-50 dark:from-orange-900/30 dark:to-purple-900/30'
  }
];

export default function CountdownWidget() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // 下一个事件
  const nextEvent = () => {
    setSelectedEventIndex((prev) => (prev + 1) % events.length);
  };
  
  // 前一个事件
  const prevEvent = () => {
    setSelectedEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };
  
  // 计算剩余时间
  const calculateTimeRemaining = useCallback(() => {
    const targetDate = new Date(events[selectedEventIndex].date);
    const currentDate = new Date();
    
    // 获取两个日期之间的毫秒差
    const differenceInTime = targetDate.getTime() - currentDate.getTime();
    
    // 计算天、小时、分钟、秒
    const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);
    
    setTimeRemaining({ days, hours, minutes, seconds });
  }, [selectedEventIndex]);
  
  useEffect(() => {
    // 初始化
    calculateTimeRemaining();
    
    // 每秒更新一次剩余时间
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);
  
  // 根据事件返回不同颜色的渐变
  const getGradientClass = () => {
    return events[selectedEventIndex].color;
  };
  
  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        Event Countdown
      </h3>
      <div className={`flex flex-col items-center p-6 bg-gradient-to-br ${getGradientClass()} rounded-lg`}>
        <div className="text-5xl mb-4">
          {events[selectedEventIndex].icon}
        </div>
        <h4 className="text-xl font-bold text-center mb-1">
          {events[selectedEventIndex].name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {events[selectedEventIndex].location}
        </p>
        
        <div className="grid grid-cols-4 gap-2 w-full mb-6">
          <div className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 py-2 px-1 rounded-lg">
            <span className="text-2xl font-bold">{timeRemaining.days}</span>
            <span className="text-xs text-gray-500">DAYS</span>
          </div>
          <div className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 py-2 px-1 rounded-lg">
            <span className="text-2xl font-bold">{timeRemaining.hours}</span>
            <span className="text-xs text-gray-500">HOURS</span>
          </div>
          <div className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 py-2 px-1 rounded-lg">
            <span className="text-2xl font-bold">{timeRemaining.minutes}</span>
            <span className="text-xs text-gray-500">MINS</span>
          </div>
          <div className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 py-2 px-1 rounded-lg">
            <span className="text-2xl font-bold">{timeRemaining.seconds}</span>
            <span className="text-xs text-gray-500">SECS</span>
          </div>
        </div>
        
        <div className="flex justify-between w-full">
          <button 
            onClick={prevEvent}
            className="bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-sm text-center">
            <div className="font-medium">Save the Date</div>
            <div className="text-gray-500">{events[selectedEventIndex].date}</div>
          </div>
          <button 
            onClick={nextEvent}
            className="bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 