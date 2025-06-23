"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="relative">
        <Hero />
        <Gallery />
        <InteractiveDemo />
        <About />
      </main>
      <Footer />
    </div>
  );
}