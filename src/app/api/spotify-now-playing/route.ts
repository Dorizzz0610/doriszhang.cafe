import { NextResponse } from 'next/server';

// 这个函数会处理对 /api/spotify-now-playing 的GET请求
export async function GET() {
  try {
    // 在真实应用中，您需要进行Spotify API认证
    // 以下为模拟Spotify API调用的示例代码:

    // const clientId = process.env.SPOTIFY_CLIENT_ID;
    // const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    // const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    
    // 获取访问令牌
    // const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    // const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Basic ${basicAuth}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     grant_type: 'refresh_token',
    //     refresh_token: refreshToken,
    //   }),
    // });
    
    // const tokenData = await tokenResponse.json();
    // const accessToken = tokenData.access_token;
    
    // 获取当前播放曲目
    // const nowPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    
    // 如果没有在播放任何内容，返回空数据
    // if (nowPlayingResponse.status === 204) {
    //   return NextResponse.json({ isPlaying: false });
    // }
    
    // const nowPlayingData = await nowPlayingResponse.json();
    
    // 整理并返回数据
    // const track = {
    //   name: nowPlayingData.item.name,
    //   artist: nowPlayingData.item.artists.map(artist => artist.name).join(', '),
    //   album: nowPlayingData.item.album.name,
    //   albumArt: nowPlayingData.item.album.images[0]?.url,
    //   duration: Math.floor(nowPlayingData.item.duration_ms / 1000),
    //   progress: Math.floor(nowPlayingData.progress_ms / 1000),
    //   isPlaying: nowPlayingData.is_playing,
    // };
    
    // 模拟数据（演示用）
    const track = {
      name: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      albumArt: "/images/spotify-placeholder.jpg",
      duration: 235, // 总秒数
      progress: 130, // 当前播放位置（秒）
      isPlaying: true
    };
    
    return NextResponse.json(track);
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
} 