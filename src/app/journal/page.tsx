'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BackgroundAnimation from "../../components/BackgroundAnimation";
import NavBar from "../../components/NavBar";

export default function Journal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 淡入动画
    const timeout = setTimeout(() => {
      const content = document.getElementById('journal-content');
      if (content) {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <BackgroundAnimation />
      <NavBar />
      
      <div className="min-h-screen pt-28 pb-10">
        <main className="container mx-auto px-4 sm:px-6">
          <div 
            id="journal-content"
            className="max-w-4xl mx-auto transition-all duration-700 opacity-0 transform translate-y-4"
          >
            <h2 className="text-2xl font-bold mb-8 gradient-text inline-block">Journal</h2>
            
            <div className="card-modern">
              <div className="flex items-center justify-center flex-col py-16">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">Stay Tuned</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl text-center">
                 I’m currently negotiating with my thoughts. Once they agree, I’ll share my ideas and reflections here.
                </p>
                
                <div className="relative">
                  <Link 
                    href="/"
                    className="btn-modern-minimal"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* 页脚 */}
        <footer className="container mx-auto px-4 sm:px-6 mt-20 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="modern-divider mb-8"></div>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Sitemap</h3>
              <div className="flex gap-4 justify-center">
                <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</Link>
                <Link href="/gallery" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Gallery</Link>
                <Link href="/journal" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Journal</Link>
              </div>
            </div>
            
            <div className="text-center">
              <p>© 2025 Doris Zhang. Powered by Next.js</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 