import { NextResponse } from 'next/server';
import destinations from '@/data/destinations';

// 添加静态配置，用于支持静态导出
export const dynamic = 'error';
export const revalidate = false;

export async function GET() {
  try {
    // 随机选择一个目的地
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const destination = destinations[randomIndex];
    
    // 为目的地添加坐标信息
    // 使用一些有代表性的坐标（实际应用中应该从地理数据库获取）
    const enhancedDestination = {
      ...destination,
      lat: getDestinationLatitude(destination.name),
      lon: getDestinationLongitude(destination.name)
    };
    
    return NextResponse.json(enhancedDestination, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('Error in trip suggestion API:', error);
    return NextResponse.json(
      { error: 'Failed to get trip suggestion' },
      { status: 500 }
    );
  }
}

// 根据目的地名称获取大致纬度
function getDestinationLatitude(name: string): number {
  const destinations: {[key: string]: number} = {
    'Kyoto': 35.0116,
    'Bali': -8.3405,
    'Seoul': 37.5665,
    'Hoi An': 15.8801,
    'Chiang Mai': 18.7883,
    'Santorini': 36.3932,
    'Paris': 48.8566,
    'Prague': 50.0755,
    'Amalfi Coast': 40.6333,
    'Reykjavik': 64.1466,
    'New York City': 40.7128,
    'Vancouver': 49.2827,
    'Vermont': 44.5588,
    'Mexico City': 19.4326,
    'Banff': 51.1784,
    'Sydney': -33.8688,
    'Queenstown': -45.0312,
    'Rio de Janeiro': -22.9068,
    'Machu Picchu': -13.1631,
    'Patagonia': -41.8101,
    'Cape Town': -33.9249,
    'Marrakech': 31.6295,
    'Serengeti': -2.3333,
    'Swiss Alps': 46.8182,
    'Maldives': 3.2028,
    'Grand Canyon': 36.0544,
    'Northern Lights': 68.3587, // 挪威特罗姆瑟
    'Great Barrier Reef': -18.2871,
  };
  
  // 从名称中提取第一个单词来匹配
  const firstWord = name.split(',')[0].trim().split(' ')[0];
  
  // 尝试匹配完整名称，如果没有再尝试第一个单词
  return destinations[name] || 
         destinations[name.split(',')[0].trim()] || 
         destinations[firstWord] || 
         (Math.random() * 80 - 40); // 如果没有匹配项，返回随机值
}

// 根据目的地名称获取大致经度
function getDestinationLongitude(name: string): number {
  const destinations: {[key: string]: number} = {
    'Kyoto': 135.7681,
    'Bali': 115.0920,
    'Seoul': 126.9780,
    'Hoi An': 108.3380,
    'Chiang Mai': 98.9853,
    'Santorini': 25.4615,
    'Paris': 2.3522,
    'Prague': 14.4378,
    'Amalfi Coast': 14.6027,
    'Reykjavik': -21.9426,
    'New York City': -74.0060,
    'Vancouver': -123.1207,
    'Vermont': -72.5778,
    'Mexico City': -99.1332,
    'Banff': -115.5708,
    'Sydney': 151.2093,
    'Queenstown': 168.6626,
    'Rio de Janeiro': -43.1729,
    'Machu Picchu': -72.5450,
    'Patagonia': -68.9184,
    'Cape Town': 18.4241,
    'Marrakech': -7.9811,
    'Serengeti': 34.8333,
    'Swiss Alps': 8.2275,
    'Maldives': 73.2207,
    'Grand Canyon': -112.1401,
    'Northern Lights': 18.6356, // 挪威特罗姆瑟
    'Great Barrier Reef': 147.6992,
  };
  
  // 从名称中提取第一个单词来匹配
  const firstWord = name.split(',')[0].trim().split(' ')[0];
  
  // 尝试匹配完整名称，如果没有再尝试第一个单词
  return destinations[name] || 
         destinations[name.split(',')[0].trim()] || 
         destinations[firstWord] || 
         (Math.random() * 360 - 180); // 如果没有匹配项，返回随机值
} 