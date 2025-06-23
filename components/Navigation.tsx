"use client";

import { useState, useEffect } from 'react';
import { Menu, X, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            aria-label="Go to home"
          >
            <BarChart3 className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-xl font-bold group-hover:text-primary transition-colors">DataArt</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium"
                aria-label={`Go to ${item.label.toLowerCase()} section`}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-4 pl-4 border-l border-border">
              <Button
                variant="default"
                size="sm"
                onClick={() => scrollToSection('interactive')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Try Demo
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="hover:bg-muted/50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border rounded-b-lg shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg font-medium"
                  aria-label={`Go to ${item.label.toLowerCase()} section`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => scrollToSection('interactive')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  Try Interactive Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}