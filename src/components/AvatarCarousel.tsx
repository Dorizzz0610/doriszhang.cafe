'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const AvatarCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAvatar, setActiveAvatar] = useState<number | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 }); // Track visible items

  // Avatar data with images and messages
  const avatarData = [
    { image: '/images/avatar1.png', message: 'Drumming to remind all my limbs they have jobs.' },
    { image: '/images/avatar2.png', message: 'Collecting travel plans (and a few too many souvenirs).' },
    { image: '/images/avatar3.png', message: 'Negotiating peace treaties between my cat and parrots.' },
    { image: '/images/avatar4.png', message: 'On a mission to rate every bubble tea (those with tea+milk).' },
    { image: '/images/avatar5.png', message: 'Juggling at least three windows on the screen.' },
    { image: '/images/avatar6.png', message: 'Serving cocktails that are "happy accidents".' },
    { image: '/images/avatar7.png', message: 'Focusing on cardio as weightlifting remains a distant rumor.' },
    { image: '/images/avatar8.png', message: 'Terrible at gaming, but can be a master of virtual sightseeing.' },
    { image: '/images/avatar9.png', message: 'Browsing bookstores for the smell, not the stories.' },
    { image: '/images/avatar10.png', message: 'Sometimes I love popcorn more than the movie itself.' },
    { image: '/images/avatar11.png', message: 'Cycling only on streets with zero people.' },
    { image: '/images/avatar12.png', message: 'Dancing mostly to the rhythm of my laptop\'s playlist.' },
    { image: '/images/avatar13.png', message: 'Professional at trying on clothes, part-time at buying them.' },
    { image: '/images/avatar14.png', message: 'I take my best photos on other people\'s cameras.' },
    { image: '/images/avatar15.png', message: 'Sunglasses fan with even bringing extras for friends.' },
    { image: '/images/avatar16.png', message: 'An overqualified long-distance commuter.' },
    { image: '/images/avatar17.png', message: 'Learning how to take a nap on grass.' },
    { image: '/images/avatar18.png', message: 'Chatting with GPT to self-reflect (and confirm I\'m not a robot).' },
  ];

  // Handle scroll to update visible items
  const updateVisibleItems = () => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const scrollPosition = containerRef.current.scrollLeft;
    const itemWidth = containerWidth / 4; // Assuming 4 items visible
    
    const startIndex = Math.floor(scrollPosition / itemWidth);
    const endIndex = Math.min(startIndex + 3, avatarData.length - 1);
    
    setVisibleRange({ start: startIndex, end: endIndex });
  };

  // Mouse/touch event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    updateVisibleItems();
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased scroll speed for more dynamic feel
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleAvatarClick = (index: number) => {
    if (activeAvatar === index) {
      setActiveAvatar(null);
    } else {
      setActiveAvatar(index);
    }
  };

  // Scroll to previous/next set of avatars with animation
  const scrollPrev = () => {
    if (!containerRef.current) return;
    const itemWidth = containerRef.current.clientWidth / 4;
    const targetScroll = Math.max(containerRef.current.scrollLeft - itemWidth * 4, 0);
    animateScroll(containerRef.current, targetScroll);
  };

  const scrollNext = () => {
    if (!containerRef.current) return;
    const itemWidth = containerRef.current.clientWidth / 4;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const targetScroll = Math.min(containerRef.current.scrollLeft + itemWidth * 4, maxScroll);
    animateScroll(containerRef.current, targetScroll);
  };

  // Smooth scroll animation function
  const animateScroll = (element: HTMLElement, targetPosition: number) => {
    const startPosition = element.scrollLeft;
    const distance = targetPosition - startPosition;
    const duration = 500; // ms
    let startTime: number | null = null;
    
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      element.scrollLeft = startPosition + distance * easeInOutCubic;
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        updateVisibleItems();
      }
    };
    
    requestAnimationFrame(animation);
  };

  // Close message when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (activeAvatar !== null && !target.closest('.avatar-item')) {
        setActiveAvatar(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeAvatar]);

  // Add event listeners when component mounts and handle scroll updates
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    const handleScroll = () => {
      if (!isDragging) {
        updateVisibleItems();
      }
    };

    updateVisibleItems();
    
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging]);

  // Custom styles for hiding scrollbar across browsers
  const scrollbarHideStyles = {
    scrollbarWidth: 'none' as 'none',
    msOverflowStyle: 'none' as 'none',
    scrollSnapType: 'x mandatory' as 'x mandatory',
    paddingLeft: '0',
    paddingRight: '0',
  } as React.CSSProperties;

  const itemWidth = 100 / 4; // 4 items per view, percentage width
  
  // Add a ::webkit-scrollbar style to the document if not already present
  useEffect(() => {
    const styleId = 'hide-scrollbar-style';
    
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .avatar-bounce {
          animation: avatar-float 5s ease-in-out infinite;
        }
        @keyframes avatar-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes avatar-spin {
          0% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(-5deg); }
        }
        .message-popup {
          animation: fade-in 0.2s ease-out;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <div className="my-12 overflow-hidden flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-2">Different Versions</h3>
      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 text-center mb-6">
        ← Swipe and click them! →
      </p>
      
      <div className="relative w-full max-w-3xl mx-auto">
        <div
          ref={containerRef}
          className="flex gap-3 overflow-x-auto overflow-y-visible pb-24 pt-4 cursor-grab snap-x snap-mandatory hide-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={scrollbarHideStyles}
        >
          {avatarData.map((avatar, index) => (
            <div
              key={index}
              className="avatar-item flex-shrink-0 relative transition-all duration-500 snap-center avatar-bounce"
              style={{ 
                width: `calc(${itemWidth}% - 0.75rem)`,
                animationDelay: `${index * 0.2}s`,
                transform: activeAvatar === index ? 'translateY(-15px) scale(1.05)' : 'none'
              }}
            >
              <div 
                className={`relative rounded-full overflow-hidden transition-all duration-300 
                  ${activeAvatar === index 
                    ? 'ring-4 ring-blue-500 shadow-xl' 
                    : 'hover:shadow-lg hover:scale-105 hover:rotate-3 transition-transform'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAvatarClick(index);
                }}
              >
                <Image
                  src={avatar.image}
                  alt={`Avatar ${index + 1}`}
                  width={150}
                  height={150}
                  className="rounded-full w-full h-auto"
                  draggable="false"
                />
              </div>
              
              {activeAvatar === index && (
                <div className="absolute z-30 top-full left-0 right-0 mx-auto mt-3
                  bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg
                  border border-gray-200 dark:border-gray-700 w-full
                  backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 message-popup">
                  <p className="text-sm">{avatar.message}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAvatar(null);
                    }}
                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation arrows with improved styling */}
        <button 
          onClick={scrollPrev}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg z-10 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none
                    border border-gray-200 dark:border-gray-700"
          aria-label="Previous avatars"
          disabled={visibleRange.start === 0}
          style={{ opacity: visibleRange.start === 0 ? 0.5 : 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={scrollNext}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg z-10 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none
                    border border-gray-200 dark:border-gray-700"
          aria-label="Next avatars"
          disabled={visibleRange.end >= avatarData.length - 1}
          style={{ opacity: visibleRange.end >= avatarData.length - 1 ? 0.5 : 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AvatarCarousel; 