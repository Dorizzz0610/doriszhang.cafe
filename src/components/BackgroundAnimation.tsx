'use client';

import { useEffect, useState, useRef } from 'react';

// 更精致的颜色调色板 - 更柔和的高级色调
const modernColors = [
  { bg: '#f9f5f2', star: '#625b71', line: 'rgba(98, 91, 113, 0.08)' }, // Sunday - Warm Beige
  { bg: '#f4f7fb', star: '#7d92b5', line: 'rgba(125, 146, 181, 0.08)' }, // Monday - Soft Sky
  { bg: '#f7f0f0', star: '#a17a82', line: 'rgba(161, 122, 130, 0.08)' }, // Tuesday - Dusty Rose
  { bg: '#f3f6f4', star: '#7a9384', line: 'rgba(122, 147, 132, 0.08)' }, // Wednesday - Sage
  { bg: '#f6f2f6', star: '#9a7aa4', line: 'rgba(154, 122, 164, 0.08)' }, // Thursday - Lavender
  { bg: '#f2f3f8', star: '#7986a8', line: 'rgba(121, 134, 168, 0.08)' }, // Friday - Periwinkle
  { bg: '#f5f2ef', star: '#9a8778', line: 'rgba(154, 135, 120, 0.08)' }, // Saturday - Warm Taupe
];

// Color names for display
const colorNames = [
  'Warm Beige',  // Sunday
  'Soft Sky',    // Monday
  'Dusty Rose',  // Tuesday
  'Sage',        // Wednesday
  'Lavender',    // Thursday
  'Periwinkle',  // Friday
  'Warm Taupe',  // Saturday
];

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  shape: 'circle' | 'star' | 'diamond';
  speed: number;
  rotation: number;
  rotationSpeed: number;
  layer: number;
  direction: { x: number; y: number };
  pulseSpeed: number;
  pulseDirection: number;
  connected: boolean;
  connections: number[];
  nebula?: {
    radius: number;
    color: string;
    opacity: number;
  };
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bgColor, setBgColor] = useState('');
  const [starColor, setStarColor] = useState('');
  const [lineColor, setLineColor] = useState('');

  useEffect(() => {
    // Get current day of week and set background color accordingly
    const today = new Date();
    const dayIndex = today.getDay(); // 0-6, 0 is Sunday
    
    setBgColor(modernColors[dayIndex].bg);
    setStarColor(modernColors[dayIndex].star);
    setLineColor(modernColors[dayIndex].line);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !starColor) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full screen with pixel ratio for retina displays
    const handleResize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Create star particles
    const particles: StarParticle[] = [];
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 120);

    // Create stars
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : 3;
      const hasNebula = Math.random() < 0.15; // 15% chance to have a nebula
      
      const shape = Math.random() < 0.7 ? 'circle' : 
                    Math.random() < 0.85 ? 'star' : 'diamond';
      
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + (4 - layer) * 0.6, // Size based on layer
        opacity: Math.random() * 0.6 + 0.2,
        shape,
        speed: 0.05 + Math.random() * 0.1 / layer, // Speed related to layer
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        layer,
        direction: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseDirection: 1,
        connected: false,
        connections: [],
        ...(hasNebula ? {
          nebula: {
            radius: Math.random() * 40 + 20,
            color: starColor,
            opacity: Math.random() * 0.04 + 0.01
          }
        } : {})
      });
    }
    
    // Create star connections (constellations)
    // We'll connect some stars to create a constellation effect
    const maxConnections = Math.floor(particleCount * 0.3); // Connect about 30% of stars
    const maxDistance = 150; // Maximum connection distance
    let connectionCount = 0;
    
    // Choose some stars to be "connector" stars
    const connectorStars = particles
      .filter(p => p.layer === 1 || p.layer === 2) // Only use brighter stars as connectors
      .sort(() => Math.random() - 0.5) // Shuffle
      .slice(0, Math.floor(particles.length * 0.4)); // Take 40% of them
    
    connectorStars.forEach(star => {
      star.connected = true;
      
      // Find nearby stars to connect to
      const nearbyStars = particles
        .filter(p => p.id !== star.id && !p.connections.includes(star.id) && 
                   Math.hypot(p.x - star.x, p.y - star.y) < maxDistance)
        .sort((a, b) => 
          Math.hypot(a.x - star.x, a.y - star.y) - 
          Math.hypot(b.x - star.x, b.y - star.y))
        .slice(0, 2); // Connect to at most 2 nearby stars
      
      nearbyStars.forEach(nearby => {
        if (connectionCount < maxConnections) {
          star.connections.push(nearby.id);
          nearby.connections.push(star.id);
          connectionCount++;
        }
      });
    });

    // Draw a star shape
    const drawStar = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.beginPath();
      
      // Draw a 5-pointed star
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const innerAngle = angle + Math.PI / 5;
        
        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * size, Math.sin(angle) * size);
        } else {
          ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        }
        
        ctx.lineTo(
          Math.cos(innerAngle) * (size * 0.4),
          Math.sin(innerAngle) * (size * 0.4)
        );
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    
    // Draw a diamond shape
    const drawDiamond = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.beginPath();
      
      // Draw a diamond
      ctx.moveTo(0, -size);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size, 0);
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw nebula effects first (they should be below stars)
      particles.forEach(particle => {
        if (particle.nebula) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.nebula.radius
          );
          
          gradient.addColorStop(0, `${particle.nebula.color}${Math.floor(particle.nebula.opacity * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.nebula.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Draw connections between stars (constellations)
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      
      particles.forEach(particle => {
        if (particle.connections.length) {
          particle.connections.forEach(connectedId => {
            const connectedParticle = particles.find(p => p.id === connectedId);
            if (connectedParticle && connectedParticle.id > particle.id) { // Only draw once
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(connectedParticle.x, connectedParticle.y);
              ctx.stroke();
            }
          });
        }
      });

      // Draw each particle
      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = starColor;
        
        // Draw shape based on type
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'star') {
          drawStar(particle.x, particle.y, particle.size * 1.2, particle.rotation);
        } else if (particle.shape === 'diamond') {
          drawDiamond(particle.x, particle.y, particle.size, particle.rotation);
        }
        
        ctx.restore();
        
        // Update position
        particle.x += particle.direction.x * particle.speed;
        particle.y += particle.direction.y * particle.speed;
        
        // Update rotation for non-circle shapes
        if (particle.shape !== 'circle') {
          particle.rotation += particle.rotationSpeed;
        }
        
        // Boundary check with smooth wrap-around
        if (particle.x < -particle.size * 2) particle.x = window.innerWidth + particle.size;
        if (particle.x > window.innerWidth + particle.size * 2) particle.x = -particle.size;
        if (particle.y < -particle.size * 2) particle.y = window.innerHeight + particle.size;
        if (particle.y > window.innerHeight + particle.size * 2) particle.y = -particle.size;
        
        // Subtle pulsing for particle size
        particle.size += particle.pulseDirection * particle.pulseSpeed;
        const baseSize = (4 - particle.layer) * 0.6;
        const minSize = baseSize * 0.7;
        const maxSize = baseSize * 1.3;
        
        if (particle.size > maxSize || particle.size < minSize) {
          particle.pulseDirection *= -1;
        }
        
        // Subtle opacity variation
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        
        // Update nebula if exists
        if (particle.nebula) {
          particle.nebula.opacity += (Math.random() - 0.5) * 0.002;
          particle.nebula.opacity = Math.max(0.01, Math.min(0.05, particle.nebula.opacity));
          
          particle.nebula.radius += (Math.random() - 0.5) * 0.3;
          particle.nebula.radius = Math.max(20, Math.min(60, particle.nebula.radius));
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [starColor, lineColor]);

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10 transition-colors duration-1000" 
      style={{ backgroundColor: bgColor }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default BackgroundAnimation; 