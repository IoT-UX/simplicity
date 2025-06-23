"use client";

import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  const [dataPoints, setDataPoints] = useState<Array<{ x: number; y: number; opacity: number; size: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate animated data points for background
    const points = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.2,
      size: Math.random() * 3 + 1,
    }));
    setDataPoints(points);

    // Animate points
    const interval = setInterval(() => {
      setDataPoints(prev =>
        prev.map(point => ({
          ...point,
          x: (point.x + 0.05) % 100,
          y: point.y + Math.sin(Date.now() * 0.001 + point.x) * 0.02,
          opacity: Math.sin(Date.now() * 0.002 + point.x) * 0.2 + 0.4,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-16 bg-muted rounded-lg w-96 mb-4"></div>
          <div className="h-8 bg-muted rounded-lg w-80 mb-8"></div>
          <div className="h-12 bg-muted rounded-lg w-40"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className="absolute bg-primary rounded-full animate-pulse-glow"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              opacity: point.opacity,
              width: `${point.size}px`,
              height: `${point.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-float">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Transforming Data into Art</span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-foreground">Simplicity in Data,</span>
          <span className="block gradient-text">Power in Art</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Discover the beautiful intersection where simple data transforms into powerful artistic expression, 
          creating accessible and meaningful ways to understand our complex world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToGallery}
            className="group inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium"
            aria-label="Explore the gallery"
          >
            <span>Explore Gallery</span>
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
          </button>
          
          <button
            onClick={() => document.getElementById('interactive')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center space-x-2 border border-border bg-background/50 backdrop-blur-sm text-foreground px-8 py-4 rounded-xl hover:bg-muted transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium"
            aria-label="Try interactive demo"
          >
            <span>Try Interactive Demo</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}