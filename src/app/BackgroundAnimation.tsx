'use client';

import { useEffect, useState, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Morandi color palette for each day of the week
  const morandiColors = [
    { gradient: 'rgba(232, 213, 196, 0.3)', particles: 'rgba(232, 213, 196, 0.6)' }, // Sunday - Soft Beige
    { gradient: 'rgba(183, 196, 207, 0.3)', particles: 'rgba(183, 196, 207, 0.6)' }, // Monday - Dusty Blue
    { gradient: 'rgba(213, 176, 172, 0.3)', particles: 'rgba(213, 176, 172, 0.6)' }, // Tuesday - Blush Pink
    { gradient: 'rgba(201, 210, 197, 0.3)', particles: 'rgba(201, 210, 197, 0.6)' }, // Wednesday - Sage Green
    { gradient: 'rgba(224, 205, 206, 0.3)', particles: 'rgba(224, 205, 206, 0.6)' }, // Thursday - Lavender
    { gradient: 'rgba(197, 202, 211, 0.3)', particles: 'rgba(197, 202, 211, 0.6)' }, // Friday - Powder Blue
    { gradient: 'rgba(211, 191, 183, 0.3)', particles: 'rgba(211, 191, 183, 0.6)' }, // Saturday - Taupe
  ];

  useEffect(() => {
    // Get current day of week (0-6, Sunday is 0)
    const now = new Date();
    setDayOfWeek(now.getDay());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Track mouse position for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      shape: 'circle' | 'square' | 'triangle' | 'line';
      rotation: number;
      rotationSpeed: number;
      pulseSpeed: number;
      pulseAmount: number;
      originalSize: number;
      timeOffset: number;
    }[] = [];

    // Create different shapes of particles
    const shapes = ['circle', 'square', 'triangle', 'line'];
    
    // Create more particles with varied properties
    for (let i = 0; i < 80; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)] as 'circle' | 'square' | 'triangle' | 'line';
      const size = Math.random() * 4 + (shape === 'line' ? 10 : 2);
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        originalSize: size,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.4 + 0.1,
        shape: shape,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.01 - 0.005) * (shape !== 'circle' ? 1 : 0),
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseAmount: Math.random() * 0.5 + 0.5,
        timeOffset: Math.random() * 1000,
      });
    }

    const colors = morandiColors[dayOfWeek];
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background with soft fade
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(249, 250, 251, 0.95)');
      gradient.addColorStop(0.5, colors.gradient);
      gradient.addColorStop(1, 'rgba(249, 250, 251, 0.98)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between particles that are close to each other
      ctx.strokeStyle = colors.particles;
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw lines between particles that are close to each other
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Gentle pulsing size effect based on time
        const pulse = Math.sin((time + particle.timeOffset) * particle.pulseSpeed) * particle.pulseAmount;
        particle.size = particle.originalSize + pulse * 0.5;

        // Update position with slight drift
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Add subtle mouse interaction
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseDistance < 150) {
          const force = 0.2 * (1 - mouseDistance / 150);
          particle.x -= (dx / mouseDistance) * force;
          particle.y -= (dy / mouseDistance) * force;
        }

        // Wrap around edges with smooth transition
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Update rotation
        particle.rotation += particle.rotationSpeed;

        // Draw different shapes
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;
        
        switch (particle.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.particles;
            ctx.fill();
            break;
            
          case 'square':
            ctx.fillStyle = colors.particles;
            ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            break;
            
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(particle.size, particle.size);
            ctx.lineTo(-particle.size, particle.size);
            ctx.closePath();
            ctx.fillStyle = colors.particles;
            ctx.fill();
            break;
            
          case 'line':
            ctx.beginPath();
            ctx.moveTo(-particle.size/2, 0);
            ctx.lineTo(particle.size/2, 0);
            ctx.strokeStyle = colors.particles;
            ctx.lineWidth = 1;
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      });

      // Draw soft vignette effect for depth
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      radialGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      radialGradient.addColorStop(0.85, 'rgba(0, 0, 0, 0)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dayOfWeek]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default BackgroundAnimation; 