"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Download, Settings } from 'lucide-react';

export function InteractiveDemo() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [dataSize, setDataSize] = useState([50]);
  const [complexity, setComplexity] = useState([3]);
  const [speed, setSpeed] = useState([5]);
  const [colorMode, setColorMode] = useState(0);
  const [dataPoints, setDataPoints] = useState<Array<{ x: number; y: number; size: number; color: string; vx: number; vy: number }>>([]);

  const colorPalettes = [
    ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'],
    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2ECC71', '#F39C12'],
  ];

  const generateDataPoints = () => {
    const points = Array.from({ length: dataSize[0] }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * complexity[0] + 1,
      color: colorPalettes[colorMode][Math.floor(Math.random() * colorPalettes[colorMode].length)],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setDataPoints(points);
  };

  useEffect(() => {
    generateDataPoints();
  }, [dataSize, complexity, colorMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setDataPoints(prev =>
          prev.map(point => {
            let newX = point.x + point.vx * speed[0] * 0.1;
            let newY = point.y + point.vy * speed[0] * 0.1;
            let newVx = point.vx;
            let newVy = point.vy;

            // Bounce off walls
            if (newX <= 0 || newX >= 100) {
              newVx = -newVx;
              newX = Math.max(0, Math.min(100, newX));
            }
            if (newY <= 0 || newY >= 100) {
              newVy = -newVy;
              newY = Math.max(0, Math.min(100, newY));
            }

            return {
              ...point,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
            };
          })
        );
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnimating, speed]);

  const handleReset = () => {
    setIsAnimating(false);
    generateDataPoints();
  };

  const handleExport = () => {
    // Simulate export functionality
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 800, 600);
      
      dataPoints.forEach(point => {
        ctx.fillStyle = point.color;
        ctx.beginPath();
        ctx.arc(
          (point.x / 100) * 800,
          (point.y / 100) * 600,
          point.size * 3,
          0,
          2 * Math.PI
        );
        ctx.fill();
      });
      
      const link = document.createElement('a');
      link.download = 'data-art-creation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <section id="interactive" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Settings className="h-4 w-4" aria-hidden="true" />
            <span>Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Create Your Data Art</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience how data parameters transform into living art. 
            Adjust the controls to see how different variables create unique visual expressions and discover your own artistic style.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Controls */}
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Creative Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label htmlFor="data-size-slider" className="block text-sm font-medium mb-3">
                  Data Points: <span className="text-primary font-bold">{dataSize[0]}</span>
                </label>
                <Slider
                  id="data-size-slider"
                  value={dataSize}
                  onValueChange={setDataSize}
                  max={200}
                  min={10}
                  step={10}
                  className="w-full"
                  aria-label={`Data points: ${dataSize[0]}`}
                />
                <p className="text-xs text-muted-foreground mt-2">More points create denser, more complex compositions</p>
              </div>

              <div>
                <label htmlFor="complexity-slider" className="block text-sm font-medium mb-3">
                  Size Variation: <span className="text-primary font-bold">{complexity[0]}</span>
                </label>
                <Slider
                  id="complexity-slider"
                  value={complexity}
                  onValueChange={setComplexity}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                  aria-label={`Complexity level: ${complexity[0]}`}
                />
                <p className="text-xs text-muted-foreground mt-2">Higher values create more dramatic size differences</p>
              </div>

              <div>
                <label htmlFor="speed-slider" className="block text-sm font-medium mb-3">
                  Animation Speed: <span className="text-primary font-bold">{speed[0]}</span>
                </label>
                <Slider
                  id="speed-slider"
                  value={speed}
                  onValueChange={setSpeed}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                  aria-label={`Animation speed: ${speed[0]}`}
                />
                <p className="text-xs text-muted-foreground mt-2">Control the pace of your data art animation</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Color Palette</label>
                <div className="flex space-x-2">
                  {colorPalettes.map((palette, index) => (
                    <button
                      key={index}
                      onClick={() => setColorMode(index)}
                      className={`flex space-x-1 p-2 rounded-lg border-2 transition-all ${
                        colorMode === index ? 'border-primary' : 'border-border hover:border-muted-foreground'
                      }`}
                      aria-label={`Select color palette ${index + 1}`}
                    >
                      {palette.slice(0, 3).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsAnimating(!isAnimating)}
                  variant={isAnimating ? "secondary" : "default"}
                  className="flex-1"
                  aria-label={isAnimating ? "Pause animation" : "Start animation"}
                >
                  {isAnimating ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" aria-hidden="true" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                      Play
                    </>
                  )}
                </Button>
                <Button onClick={handleReset} variant="outline" aria-label="Reset animation">
                  <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                  Reset
                </Button>
                <Button onClick={handleExport} variant="outline" aria-label="Export artwork">
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Live Data Art Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="relative w-full h-96 bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-xl overflow-hidden border-2 border-dashed border-border/50"
                role="img"
                aria-label={`Interactive data visualization with ${dataSize[0]} data points`}
              >
                {dataPoints.map((point, index) => (
                  <div
                    key={index}
                    className="absolute rounded-full transition-all duration-100 ease-out shadow-lg"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      width: `${point.size * 4}px`,
                      height: `${point.size * 4}px`,
                      backgroundColor: point.color,
                      opacity: 0.8,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 ${point.size * 2}px ${point.color}40`,
                    }}
                    aria-hidden="true"
                  />
                ))}
                
                {/* Canvas overlay info */}
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                  <div className="text-muted-foreground">
                    Points: <span className="text-foreground font-medium">{dataPoints.length}</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                  <div className="text-muted-foreground">
                    Status: <span className={`font-medium ${isAnimating ? 'text-green-600' : 'text-orange-600'}`}>
                      {isAnimating ? 'Animating' : 'Static'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Your Data Art Story</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This visualization represents {dataSize[0]} data points with {complexity[0]}x size variation, 
                  animated at speed level {speed[0]}. Each point could represent anything from climate data 
                  to social interactions, transformed into a beautiful, accessible visual narrative.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}