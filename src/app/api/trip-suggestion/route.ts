import { NextResponse } from 'next/server';
import destinations from '@/data/destinations';

// 添加静态配置，用于支持静态导出
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    // 随机选择一个目的地
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const destination = destinations[randomIndex];
    
    return NextResponse.json(destination);
  } catch (error) {
    console.error('Error in trip suggestion API:', error);
    return NextResponse.json(
      { error: 'Failed to get trip suggestion' },
      { status: 500 }
    );
  }
} 