'use client';

import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
  category?: string;
}

// 备用名言数据
const fallbackQuotes: Quote[] = [
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Happiness"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "Motivation"
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    category: "Friendship"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience"
  }
];

export default function QuoteWidget() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/random-quote');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setQuote(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching quote:', err);
      // 使用备用数据
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      setQuote(fallbackQuotes[randomIndex]);
      setError((err as Error).message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getRandomQuote();
    
    // 每小时更新一次名言
    const intervalId = setInterval(getRandomQuote, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  // 生成随机背景渐变色
  const getRandomGradient = () => {
    const gradients = [
      'from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30',
      'from-pink-50 to-blue-50 dark:from-pink-900/30 dark:to-blue-900/30',
      'from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30',
      'from-amber-50 to-red-50 dark:from-amber-900/30 dark:to-red-900/30',
      'from-teal-50 to-green-50 dark:from-teal-900/30 dark:to-green-900/30'
    ];
    
    const index = Math.floor(Math.random() * gradients.length);
    return gradients[index];
  };
  
  if (loading) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          Inspirational Quotes
        </h3>
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  if (!quote) return null;
  
  const gradientClass = getRandomGradient();
  
  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Inspirational Quotes
      </h3>
      <div className={`flex flex-col items-center p-6 bg-gradient-to-br ${gradientClass} rounded-lg`}>
        <div className="text-4xl text-indigo-500 mb-4">"</div>
        <p className="text-center mb-4 font-medium">{quote.text}</p>
        <p className="text-right w-full italic text-gray-600 dark:text-gray-300">
          — {quote.author || "Unknown"}
        </p>
        
        {quote.category && (
          <div className="mt-4 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-xs">
            {quote.category}
          </div>
        )}
        
        <button 
          onClick={getRandomQuote}
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full text-sm font-medium flex items-center transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          New Quote
        </button>
      </div>
      
      {error && (
        <p className="text-amber-500 text-xs mt-4 text-center">
          Note: Using fallback quotes (API connection issue)
        </p>
      )}
    </div>
  );
} 