'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SpaceImage {
  url: string;
  title: string;
  explanation: string;
  date: string;
  copyright?: string;
}

// 备用的太空图片数据
const fallbackSpaceData: SpaceImage = {
  url: '/images/space/galaxy.jpg',
  title: 'The Wonders of the Universe',
  explanation: 'The universe is filled with countless amazing celestial bodies, including stars, galaxies, and nebulae. Every day, we discover new beautiful scenes in the cosmos.',
  date: new Date().toISOString().split('T')[0],
  copyright: 'Space Enthusiast'
};

export default function SpaceExplorationWidget() {
  const [spaceData, setSpaceData] = useState<SpaceImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const getSpaceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/nasa-apod');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setSpaceData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching space data:', err);
      // 如果API调用失败3次后，使用备用数据
      if (retryCount >= 2) {
        console.log('Using fallback space data after multiple retries');
        setSpaceData(fallbackSpaceData);
        setError(null);
      } else {
        setError((err as Error).message);
        setRetryCount(prev => prev + 1);
      }
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getSpaceData();
    
    // 每天更新一次太空数据
    const intervalId = setInterval(getSpaceData, 86400000);
    return () => clearInterval(intervalId);
  }, []);
  
  // 当错误发生时，使用备用数据
  useEffect(() => {
    if (error && !spaceData) {
      console.log('Setting fallback space data due to error');
      setSpaceData(fallbackSpaceData);
    }
  }, [error, spaceData]);
  
  // 截取长文本
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  if (loading) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Space Exploration
        </h3>
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  
  if (!spaceData) return null;
  
  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        Space Exploration
      </h3>
      <div className="flex flex-col space-y-4">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image 
            src={spaceData.url}
            alt={spaceData.title}
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
        
        <div>
          <h4 className="font-medium text-lg">{spaceData.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{spaceData.date}</p>
          <p className="text-sm mt-2">{truncateText(spaceData.explanation, 150)}</p>
          
          {spaceData.copyright && (
            <p className="text-xs text-gray-500 mt-2">© {spaceData.copyright}</p>
          )}
        </div>
        
        {error && (
          <p className="text-amber-500 text-xs mt-4 text-center">
            Note: Using fallback data (API connection issue)
          </p>
        )}
        
        <div className="text-xs text-gray-500 mt-4 text-center">
          Data source: NASA - Astronomy Picture of the Day
        </div>
      </div>
    </div>
  );
} 