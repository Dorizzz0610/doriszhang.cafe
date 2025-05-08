'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// 现代颜色调色板 - 与背景动画组件使用相同的颜色
const modernColors = [
  { name: 'Warm Beige', bg: '#f9f5f2', text: '#625b71' }, // Sunday
  { name: 'Soft Sky', bg: '#f4f7fb', text: '#7d92b5' }, // Monday
  { name: 'Dusty Rose', bg: '#f7f0f0', text: '#a17a82' }, // Tuesday
  { name: 'Sage', bg: '#f3f6f4', text: '#7a9384' }, // Wednesday
  { name: 'Lavender', bg: '#f6f2f6', text: '#9a7aa4' },   // Thursday
  { name: 'Periwinkle', bg: '#f2f3f8', text: '#7986a8' }, // Friday
  { name: 'Warm Taupe', bg: '#f5f2ef', text: '#9a8778' },  // Saturday
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [today, setToday] = useState({
    date: '',
    day: '',
    colorName: '',
    bgColorHex: '',
    textColorHex: ''
  });

  useEffect(() => {
    // Get current date info
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0-6, 0 is Sunday
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    
    setToday({
      date: dateStr,
      day: dayNames[dayOfWeek],
      colorName: modernColors[dayOfWeek].name,
      bgColorHex: modernColors[dayOfWeek].bg,
      textColorHex: modernColors[dayOfWeek].text
    });

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 relative group"
        >
          <span className="relative z-10">Doris&apos; Homepage</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-700 to-gray-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        
        <div className="flex space-x-10">
          <Link 
            href="/" 
            className="relative group py-2 font-medium"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/gallery" 
            className="relative group py-2 font-medium"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">Gallery</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/journal" 
            className="relative group py-2 font-medium"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">Journal</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center glass-modern px-4 py-2 rounded-full text-sm">
          <div className="flex flex-col items-end">
            <span>{today.date}</span>
            <div className="flex items-center justify-end mt-1 text-xs">
              <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {today.day}'s color: <span className="font-medium" style={{color: today.textColorHex}}>{today.colorName}</span>
              </span>
            </div>
          </div>
          <div 
            className="ml-3 w-5 h-5 rounded-full shadow-inner" 
            style={{ backgroundColor: today.bgColorHex, border: `1px solid ${today.textColorHex}` }}
          ></div>
        </div>
      </div>
      
      {/* 装饰性元素 */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent opacity-0 transition-opacity duration-300" style={{ opacity: scrolled ? 1 : 0 }}></div>
    </nav>
  );
};

export default NavBar; 