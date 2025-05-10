import { NextResponse } from 'next/server';

// 添加静态配置，用于支持静态导出
export const dynamic = 'error';
// 设置重新验证时间
export const revalidate = false;

// NASA APOD API
// 使用演示密钥 DEMO_KEY，每小时限制30次请求，每天限制50次请求
// 也可以在 https://api.nasa.gov/ 申请自己的API密钥
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

export async function GET() {
  try {
    const response = await fetch(`${NASA_API_URL}?api_key=${NASA_API_KEY}`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`NASA API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 过滤数据，只返回需要的字段
    const filteredData = {
      url: data.url,
      title: data.title,
      explanation: data.explanation,
      date: data.date,
      copyright: data.copyright
    };
    
    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching NASA APOD data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NASA APOD data' },
      { status: 500 }
    );
  }
} 