"use client";

import Image from "next/image";
import Link from "next/link";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import NavBar from "../../components/NavBar";
import { useState, useRef } from "react";

function VideoPlayer({ src, caption }: { src: string; caption: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video load error:", e);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-auto group">
      <video
        ref={videoRef}
        className="w-full h-auto object-contain rounded-2xl bg-black"
        playsInline
        preload="metadata"
        onError={handleError}
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <p className="text-sm text-gray-500">视频加载失败，请刷新页面重试</p>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="text-white text-sm font-medium">
          {caption}
        </p>
      </div>
    </div>
  );
}

export default function Graduation() {
  const memories = [
    {
      type: "video",
      src: "/images/graduation/walking-congregation.mp4",
      alt: "Congregation Walk",
      caption: "下次毕业我一定自信360°无死角挥手",
      className: "md:col-span-2",
    },
    {
      type: "image",
      src: "/images/graduation/Stairs.jpg",
      alt: "Stairs to Future",
      caption: "向上走，别回头！",
      className: "md:col-span-1",
    },

    {
      type: "image",
      src: "/images/graduation/desmond-cse.jpg",
      alt: "With Desmond",
      caption: "与 CSE Legend Desmond",
      className: "md:col-span-1",
    },
    {
      type: "image",
      src: "/images/graduation/cpu-gift.jpg",
      alt: "CSE CPU Gift",
      caption: "拿走真CPU，学校别想再CPU我！🥔",
      className: "md:col-span-1",
    },
    {
      type: "image",
      src: "/images/graduation/fire-bird.JPG",
      alt: "Red Bird Statue",
      caption: "晚上的火鸡才是氛围感爆棚。谢谢晚间摄影师宝子🫶",
      className: "md:col-span-1",
    },

    {
      type: "video",
      src: "/images/graduation/hat-toss.mp4",
      alt: "Hat Toss",
      caption: "扔起毕业帽，把4年的快乐和烦恼都丢在脑后啦👋",
      className: "md:col-span-2",
    },
    {
      type: "image",
      src: "/images/graduation/flower-face.jpg",
      alt: "Flower Power",
      caption: "这位摄影师可以接写真了",
      className: "md:col-span-1",
    },

    {
      type: "image",
      src: "/images/graduation/Nightish.jpg",
      alt: "Night Moment",
      caption: "过去有烦恼都会来的海边...",
      className: "md:col-span-1",
    },
    {
      type: "image",
      src: "/images/graduation/sea-polaroid.jpg",
      alt: "Polaroid by the sea",
      caption: "今天把此刻永远留在这里 🌊",
      className: "md:col-span-1",
    },
    {
      type: "image",
      src: "/images/graduation/Flower plus flower.jpg",
      alt: "Flowers Collection",
      caption: "花与花的组合 💐",
      className: "md:col-span-1",
    },

    {
      type: "image",
      src: "/images/graduation/blind-box.jpg",
      alt: "Jelly Cat Blind Box",
      caption: "Jelly Cat 小小火鸡 一发入魂🔥",
      className: "md:col-span-1",
    },
    {
      type: "image",
      isPlaceholder: false,
      src: "/images/graduation/friend-wide.jpg",
      alt: "With My Amazing Friend",
      caption: "见到一些人就像回到了UG时光🥹她说：短短几步路，就这么走完了整整4年",
      className: "md:col-span-2",
    },
  ];

  return (
    <>
      <BackgroundAnimation />
      <NavBar />

      <div className="min-h-screen pt-28 pb-20">
        <main className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="modern-card p-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text tracking-tight">
                Graduation & Goodbyes
              </h1>
              <div className="max-w-2xl mx-auto px-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bachelor of Engineering in Computer Science. <br />
                  在毕业典礼，用它们带走我的4年
                </p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-12 text-center mx-auto">
              <p className="text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed max-w-2xl mx-auto mb-6">
                "Congregation 仪式感太足了，听到校歌时和朋友都想疯狂落泪……<br/>
                <span className="text-sm text-gray-400 not-italic">
                  (哦在读的时候听到是无感的 😑)
                </span>"
              </p>

              <a
                href="https://youtube.com/clip/Ugkx2kO7yqRBFDp0wx6V16rUqQJFB9BfKm_v?si=gmRN2GdgAZScFMAK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-700/90 hover:bg-slate-800 text-slate-50 rounded-full transition-all hover:scale-105 hover:shadow-lg no-underline border border-white/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-medium">校歌 Clip 🎵</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {memories.map((item, index) => (
                <div
                  key={index}
                  className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${item.className}`}
                >
                  {item.type === "video" ? (
                    <VideoPlayer src={item.src} caption={item.caption} />
                  ) : item.isPlaceholder ? (
                     <div className="w-full h-64 md:h-80 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">待上传朋友合照</span>
                        <span className="text-xs mt-1 opacity-70">(文件: friends-group-wide.jpg)</span>
                     </div>
                  ) : (
                    <>
                      <div className="relative w-full">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={600}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full h-auto rounded-2xl"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-2xl">
                        <p className="text-white text-sm font-medium backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
                          {item.caption}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Back to Home</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
