'use client';

import { useEffect, useState, useRef } from 'react';

// Morandi color palette for each day of the week
const morandiColors = [
  '#e8d5c4', // Sunday - Soft Beige
  '#b7c4cf', // Monday - Dusty Blue
  '#d5b0ac', // Tuesday - Blush Pink
  '#c9d2c5', // Wednesday - Sage Green
  '#e0cdce', // Thursday - Lavender
  '#c5cad3', // Friday - Powder Blue
  '#d3bfb7', // Saturday - Taupe
];

// Color names for display
const colorNames = [
  'Soft Beige',  // Sunday
  'Dusty Blue',  // Monday
  'Blush Pink',  // Tuesday
  'Sage Green',  // Wednesday
  'Lavender',    // Thursday
  'Powder Blue', // Friday
  'Taupe',       // Saturday
];

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  shape: 'circle' | 'square';
  speed: number;
  rotation: number;
  rotationSpeed: number;
  layer: number;
  direction: { x: number; y: number };
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bgColor, setBgColor] = useState('');
  const [colorName, setColorName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    // Get current day of week and set background color accordingly
    const today = new Date();
    const dayIndex = today.getDay(); // 0-6, 0 is Sunday
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    setBgColor(morandiColors[dayIndex]);
    setColorName(colorNames[dayIndex]);
    setDayOfWeek(days[dayIndex]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Create star particles
    const particles: StarParticle[] = [];
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 200);

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : 3;
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + (4 - layer), // Size based on layer
        opacity: Math.random() * 0.5 + 0.2,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
        speed: 0.1 + Math.random() * 0.2 / layer, // Speed related to layer
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        layer,
        direction: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each particle
      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Apply displacement
        ctx.translate(particle.x, particle.y);
        
        // Apply rotation (only for squares)
        if (particle.shape === 'square') {
          ctx.rotate((particle.rotation * Math.PI) / 180);
        }
        
        // Draw shape
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }
        
        ctx.restore();
        
        // Update position
        particle.x += particle.direction.x * particle.speed;
        particle.y += particle.direction.y * particle.speed;
        
        // Update rotation
        if (particle.shape === 'square') {
          particle.rotation += particle.rotationSpeed;
        }
        
        // Boundary check
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        // Randomly change opacity
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        
        // Randomly change size
        particle.size += (Math.random() - 0.5) * 0.05;
        const minSize = 1 + (4 - particle.layer) * 0.5;
        const maxSize = 4 + (4 - particle.layer);
        particle.size = Math.max(minSize, Math.min(maxSize, particle.size));
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10 transition-colors duration-1000" 
      style={{ backgroundColor: bgColor }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute bottom-4 right-4 glass-effect rounded-lg px-3 py-2 text-xs opacity-60 hidden md:block">
        <p>Today is <span className="font-medium">{dayOfWeek}</span></p>
        <p>Today&apos;s color: <span className="font-medium">{colorName}</span></p>
      </div>
    </div>
  );
};

export default BackgroundAnimation; 