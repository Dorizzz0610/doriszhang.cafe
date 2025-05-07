'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Morandi color palette for each day of the week
const morandiColors = [
  { name: 'Soft Beige', hex: '#e8d5c4' }, // Sunday
  { name: 'Dusty Blue', hex: '#b7c4cf' }, // Monday
  { name: 'Blush Pink', hex: '#d5b0ac' }, // Tuesday
  { name: 'Sage Green', hex: '#c9d2c5' }, // Wednesday
  { name: 'Lavender', hex: '#e0cdce' },   // Thursday
  { name: 'Powder Blue', hex: '#c5cad3' }, // Friday
  { name: 'Taupe', hex: '#d3bfb7' },      // Saturday
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [today, setToday] = useState({
    date: '',
    day: '',
    colorName: '',
    colorHex: ''
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
      colorName: morandiColors[dayOfWeek].name,
      colorHex: morandiColors[dayOfWeek].hex
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
          ? 'glass-effect py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-lg font-bold tracking-wider gradient-text relative group"
        >
          <span className="relative z-10">Doris&apos; Homepage</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        
        <div className="flex space-x-8">
          <Link 
            href="/" 
            className="relative group py-2"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-500 dark:bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/gallery" 
            className="relative group py-2"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">Gallery</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-500 dark:bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center glass-effect px-4 py-2 rounded-full text-sm">
          <div className="flex flex-col items-end">
            <span>{today.date}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{today.day}</span>
          </div>
          <div 
            className="ml-3 w-5 h-5 rounded-full" 
            style={{ backgroundColor: today.colorHex }}
            title={`Today's color: ${today.colorName}`}
          ></div>
        </div>
      </div>
      
      {/* 装饰性元素 */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent opacity-0 transition-opacity duration-300" style={{ opacity: scrolled ? 1 : 0 }}></div>
    </nav>
  );
};

export default NavBar; 