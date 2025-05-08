import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Hong Kong';
    
    // 在真实应用中，您需要使用OpenWeatherMap API
    // 以下为示例代码:
    
    // 1. 获取城市坐标
    // const geoResponse = await fetch(
    //   `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    // );
    // const geoData = await geoResponse.json();
    
    // if (!geoData.length) {
    //   return NextResponse.json(
    //     { error: 'City not found' },
    //     { status: 404 }
    //   );
    // }
    
    // const { lat, lon } = geoData[0];
    
    // 2. 获取天气数据
    // const weatherResponse = await fetch(
    //   `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    // );
    // const weatherData = await weatherResponse.json();
    
    // 返回模拟数据（演示用）
    const mockData = {
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
    
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 