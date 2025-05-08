'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  current: {
    temp: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  };
  daily: {
    dt: number;
    temp: {
      day: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
  }[];
}

// 备用的天气数据
const fallbackWeatherData: WeatherData = {
  current: {
    temp: 23.5,
    weather: [
      {
        main: "Clouds",
        description: "partly cloudy",
        icon: "02d"
      }
    ]
  },
  daily: [
    {
      dt: new Date().getTime() / 1000 + 86400,
      temp: { day: 24 },
      weather: [{ main: "Rain", icon: "09d" }]
    },
    {
      dt: new Date().getTime() / 1000 + 172800,
      temp: { day: 26 },
      weather: [{ main: "Clouds", icon: "02d" }]
    },
    {
      dt: new Date().getTime() / 1000 + 259200,
      temp: { day: 28 },
      weather: [{ main: "Clear", icon: "01d" }]
    },
    {
      dt: new Date().getTime() / 1000 + 345600,
      temp: { day: 27 },
      weather: [{ main: "Clouds", icon: "02d" }]
    }
  ]
};

type WeatherIcon = {
  [key: string]: string;
};

const weatherIcons: WeatherIcon = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '⛅',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️',
};

export default function WeatherWidget({ location }: { location: string }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const getWeatherData = async (city: string) => {
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Weather API error:', error);
      throw new Error('无法获取天气数据');
    }
  };

  const getDayOfWeek = (timestamp: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(location);
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      // 如果API调用失败3次后，使用备用数据
      if (retryCount >= 2) {
        console.log('Using fallback weather data after multiple retries');
        setWeatherData(fallbackWeatherData);
        setError(null);
      } else {
        setError((err as Error).message);
        setRetryCount(prev => prev + 1);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // 每小时更新一次天气数据
    const intervalId = setInterval(fetchData, 3600000);
    return () => clearInterval(intervalId);
  }, [location]);

  // 当错误发生时，使用备用数据
  useEffect(() => {
    if (error && !weatherData) {
      console.log('Setting fallback weather data due to error');
      setWeatherData(fallbackWeatherData);
    }
  }, [error, weatherData]);

  if (loading) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
          Weather Widget
        </h3>
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
          Weather Widget
        </h3>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
          <p className="text-red-500">Error: {error}</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
          <button 
            onClick={fetchData}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium flex items-center transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
        Weather Widget
      </h3>
      <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
        <div className="text-5xl mb-2">
          {weatherData.current.weather[0].icon ? 
            weatherIcons[weatherData.current.weather[0].icon] : '🌤️'}
        </div>
        <div className="text-2xl font-bold">{Math.round(weatherData.current.temp)}°C</div>
        <div className="text-gray-600 dark:text-gray-300">{location}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {weatherData.current.weather[0].description.charAt(0).toUpperCase() + 
           weatherData.current.weather[0].description.slice(1)}
        </div>
        <div className="grid grid-cols-4 gap-2 w-full mt-4">
          {weatherData.daily.slice(0, 4).map((day, index) => (
            <div className="text-center" key={index}>
              <div>{getDayOfWeek(day.dt)}</div>
              <div>{weatherIcons[day.weather[0].icon]}</div>
              <div className="text-xs">{Math.round(day.temp.day)}°</div>
            </div>
          ))}
        </div>
        {error && (
          <p className="text-amber-500 text-xs mt-4 text-center">
            注意: 使用备用数据显示（API连接问题）
          </p>
        )}
      </div>
    </div>
  );
} 