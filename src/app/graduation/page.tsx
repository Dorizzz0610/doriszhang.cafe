"use client";

import Image from "next/image";
import Link from "next/link";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import NavBar from "../../components/NavBar";
import { useRef } from "react";

type MemoryItem =
  | {
      type: "video";
      src: string;
      caption: string;
      className?: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      className?: string;
      isPlaceholder?: boolean;
    };

function VideoPlayer({ src, caption, className }: { src: string; caption: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative w-full group ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-2xl bg-black"
        playsInline
        preload="metadata"
        controls
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="text-white text-sm font-medium drop-shadow-md">{caption}</p>
      </div>
    </div>
  );
}

export default function Graduation() {
  const memories: MemoryItem[] = [
    {
      type: "video",
      src: "/images/graduation/walking-congregation.mp4",
      caption: "下次毕业我一定360度自信挥手",
      className: "md:col-span-2 aspect-video md:aspect-auto md:h-full",
    },
    {
      type: "image",
      src: "/images/graduation/flower-face.jpg",
      alt: "Flower Power",
      caption: "这个花花超配工院的橙色领子",
      className: "md:col-span-1 aspect-[5/6] md:aspect-auto md:h-full",
    },
    {
      type: "image",
      src: "/images/graduation/Flower plus flower.jpg",
      alt: "Flowers Collection",
      caption: "花与花的组合💐",
      className: "md:col-span-1 aspect-[3/4]",
    },
    {
      type: "image",
      src: "/images/graduation/fire-bird.JPG",
      alt: "Red Bird Statue",
      caption: "晚上的火鸡被我掌控了",
      className: "md:col-span-1 aspect-[3/4]",
    },


    {
      type: "image",
      src: "/images/graduation/Stairs.jpg",
      alt: "Stairs to Future",
      caption: "向上走，别回头🤏",
      className: "md:col-span-1 aspect-[3/4]",
    },
    {
      type: "image",
      src: "/images/graduation/desmond-cse.jpg",
      alt: "With Desmond",
      caption: "与 CSE Legend Desmond🥹",
      className: "md:col-span-1 aspect-[8/9] md:aspect-auto md:h-full",
    },
    {
      type: "video",
      src: "/images/graduation/hat-toss.mp4",
      caption: "扔起毕业帽就是把4年的快乐和烦恼都丢在脑后👋",
      className: "md:col-span-2 aspect-video md:h-full",
    },

    {
      type: "image",
      src: "/images/graduation/cpu-gift.jpg",
      alt: "CSE CPU Gift",
      caption: "拿着真CPU走掉，学校别想再CPU我🥔",
      className: "md:col-span-2 aspect-[8/5]",
    },
    {
      type: "image",
      src: "/images/graduation/escape-mushroom.jpg",
      alt: "Need Vertical Photo",
      caption: "大步逃离蘑菇🍄",
      className: "md:col-span-1 aspect-[3/4]",
    },
    {
      type: "image",
      src: "/images/graduation/Nightish.jpg",
      alt: "Night Moment",
      caption: "过去在海边留下夜话和思绪...",
      className: "md:col-span-2 aspect-[11/8]",
    },
    {
      type: "image",
      src: "/images/graduation/sea-polaroid.jpg",
      alt: "Polaroid by the sea",
      caption: "今天也把此刻永远留在这里🌊",
      className: "md:col-span-1 aspect-[2/3]",
    },
    {
      type: "image",
      src: "/images/graduation/blind-box.jpg",
      alt: "Jelly Cat Blind Box",
      caption: "Jelly Bird 一发入魂🔥",
      className: "md:col-span-1 aspect-[8/9] md:aspect-auto md:h-full",
    },
    {
      type: "image",
      src: "/images/graduation/friend-wide.jpg",
      alt: "With My Amazing Friend",
      caption: "见到一些人就像回到了UG时光🥹她说：短短几步路，居然就走完了整整4年",
      className: "md:col-span-2 aspect-video md:h-full",
    },
  ];

  return (
    <>
      <BackgroundAnimation />
      <NavBar />

      <div className="min-h-screen pt-28 pb-20">
        <main className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="scale-90 origin-top mx-auto">
            <div className="modern-card p-8 animate-fadeIn">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text tracking-tight">
                  Graduation & Goodbyes
                </h1>
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 border border-gray-200/70 dark:border-gray-700/60 text-sm font-medium">
                    2025 Nov 16
                  </span>
                </div>
                <div className="max-w-2xl mx-auto px-4">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Bachelor of Engineering in Computer Science. <br />
                    在毕业典礼，用它们带走我的4年
                  </p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-6 text-center mx-auto">
                <p className="text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed max-w-2xl mx-auto">
                  "Congregation 仪式感太足了，听到校歌时和朋友都想疯狂落泪……<br />
                  <span className="text-sm text-gray-400 not-italic">
                    (哦在读的时候听到是无感的 😑)
                  </span>"
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-12 text-center mx-auto">
                 <a
                  href="https://youtube.com/clip/Ugkx2kO7yqRBFDp0wx6V16rUqQJFB9BfKm_v?si=gmRN2GdgAZScFMAK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-700/90 hover:bg-slate-800 text-slate-50 rounded-full transition-all hover:scale-105 hover:shadow-lg no-underline border border-white/10"
                >
                  <span className="font-medium text-white">校歌 Clip 🎵</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {memories.map((item, index) => (
                  <div
                    key={index}
                    className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full ${item.className}`}
                  >
                    {item.type === "video" ? (
                      <VideoPlayer src={item.src} caption={item.caption} className="h-full" />
                    ) : item.isPlaceholder ? (
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs text-center">{item.caption}</span>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-full h-full">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-2xl object-cover"
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
                  <span className="text-gray-700 dark:text-gray-300">Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
