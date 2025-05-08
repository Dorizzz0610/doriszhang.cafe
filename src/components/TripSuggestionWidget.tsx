'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Destination {
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  tags: string[];
  osmLink: string;
}

// 备用目的地
const fallbackDestination: Destination = {
  name: 'Kyoto',
  country: 'Japan',
  description: 'Ancient temples, traditional gardens, and beautiful cherry blossoms in spring. Experience authentic Japanese culture with tea ceremonies and geisha performances.',
  imageUrl: '/images/destinations/kyoto.jpg',
  coordinates: {
    lat: 35.0116,
    lon: 135.7680
  },
  tags: ['Spring', 'Culture', 'Nature'],
  osmLink: 'https://www.openstreetmap.org/?mlat=35.0116&mlon=135.7680&zoom=12'
};

// 备用图片库 - 适用于图片加载失败的情况
const fallbackImages = [
  'https://images.unsplash.com/photo-1528164344705-47542687000d',  // 京都
  'https://images.unsplash.com/photo-1532186651327-6ac23687d189',  // 通用旅行
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',  // 旅行风景
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',  // 旅行冒险
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0',  // 世界建筑
];

// 获取随机备用图片
const getRandomFallbackImage = () => {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

// 处理图片URL，确保在静态导出时能正确显示图片
const getImageUrl = (url: string) => {
  // 如果是完整URL，直接返回
  if (url && url.startsWith('http')) {
    return url;
  }
  
  // 如果URL为空，使用备用图片
  if (!url || url.trim() === '') {
    return getRandomFallbackImage();
  }
  
  // 检查本地图片路径是否存在 '/images/destinations/'
  if (url.includes('destinations')) {
    // 确保开头有/
    return url.startsWith('/') ? url : `/${url}`;
  }
  
  // 尝试构建完整的本地图片路径
  const formattedPath = url.startsWith('/') ? url : `/images/destinations/${url}`;
  return formattedPath;
};

export default function TripSuggestionWidget() {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  const fetchDestination = async () => {
    try {
      const response = await fetch('/api/trip-suggestion');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch trip suggestion:', error);
      throw new Error('Unable to fetch trip suggestion');
    }
  };
  
  const getNewDestination = async () => {
    try {
      setLoading(true);
      setError(null);
      setImageError(false);
      const data = await fetchDestination();
      
      // 提取地点和国家信息
      let placeName = data.name || 'Unknown destination';
      let countryName = 'Unknown location';
      
      if (placeName.includes(',')) {
        const parts = placeName.split(',');
        placeName = parts[0].trim();
        countryName = parts.slice(1).join(',').trim(); // 处理有多个逗号的情况
      }
      
      // 准备经纬度坐标 - 使用真实数据或合理默认值
      const lat = typeof data.lat === 'number' ? data.lat : (Math.random() * 80 - 40);
      const lon = typeof data.lon === 'number' ? data.lon : (Math.random() * 360 - 180);
      
      // 确定适当的季节标签
      let seasonTag = data.season || 'All seasons';
      
      // 转换API数据到应用所需的格式
      const formattedDestination: Destination = {
        name: placeName,
        country: countryName,
        description: data.description || 'No description available',
        imageUrl: data.image || '',  // API返回的image字段
        coordinates: {
          lat: lat,
          lon: lon
        },
        tags: [seasonTag, 'Travel', 'Explore'],
        osmLink: `https://www.openstreetmap.org/#map=12/${lat}/${lon}`
      };
      
      setDestination(formattedDestination);
      setLoading(false);
    } catch (err) {
      console.error('Error in getNewDestination:', err);
      // After 3 failed attempts, use fallback data
      if (retryCount >= 2) {
        console.log('Using fallback destination after multiple retries');
        setDestination(fallbackDestination);
        setError(null);
      } else {
        setError((err as Error).message);
        setRetryCount(prev => prev + 1);
      }
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getNewDestination();
  }, []);
  
  // Use fallback data when error occurs
  useEffect(() => {
    if (error && !destination) {
      console.log('Setting fallback destination due to error');
      setDestination(fallbackDestination);
    }
  }, [error, destination]);
  
  // 处理图片加载错误
  const handleImageError = () => {
    console.log('Image failed to load, using fallback image');
    setImageError(true);
  };
  
  // 获取目的地图片URL
  const getDestinationImageUrl = () => {
    if (!destination || !destination.imageUrl || imageError) {
      return getRandomFallbackImage();
    }
    return getImageUrl(destination.imageUrl);
  };
  
  if (loading) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Trip Suggestion
        </h3>
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  if (error && !destination) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Trip Suggestion
        </h3>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg">
          <p className="text-red-500">Error: {error}</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
          <button 
            onClick={getNewDestination}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full text-sm font-medium flex items-center transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  if (!destination) return null;
  
  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Trip Suggestion
      </h3>
      <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg">
        <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
          <a href={destination.osmLink} target="_blank" rel="noopener noreferrer">
            <Image 
              src={getDestinationImageUrl()} 
              alt={`${destination.name} image`} 
              fill
              className="object-cover"
              onError={handleImageError}
              unoptimized={true}
            />
          </a>
          <a 
            href={destination.osmLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 px-2 py-1 rounded text-xs font-medium hover:bg-white dark:hover:bg-black transition-colors"
          >
            {destination.coordinates.lat.toFixed(2)}, {destination.coordinates.lon.toFixed(2)}
          </a>
        </div>
        <div>
          <div className="font-bold text-lg flex items-center justify-between">
            <span>{destination.name}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{destination.country}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xs mt-2 line-clamp-4 leading-relaxed">
            {destination.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {destination.tags.map((tag, index) => (
              <span key={index} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 w-full mt-2">
          <a 
            href={destination.osmLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-full text-sm font-medium flex items-center justify-center transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            View Map
          </a>
          <button 
            onClick={getNewDestination}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-full text-sm font-medium flex items-center justify-center transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            New Destination
          </button>
        </div>
        {(error || imageError) && (
          <p className="text-amber-500 text-xs mt-2 text-center">
            Note: Using fallback {imageError ? 'image' : 'data'} {error ? `(API issue: ${error})` : ''}
          </p>
        )}
      </div>
    </div>
  );
} 