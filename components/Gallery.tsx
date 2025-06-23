"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, TrendingUp, Zap, Palette, Database, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function Gallery() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const artworks = [
    {
      id: 1,
      title: "Climate Data Symphony",
      description: "Temperature variations transformed into visual harmonies that reveal climate patterns",
      icon: TrendingUp,
      category: "Environmental",
      metrics: "50+ years of climate data",
      color: "from-blue-500 to-green-500",
      impact: "Visualizing climate change through artistic interpretation",
    },
    {
      id: 2,
      title: "Urban Rhythm Patterns",
      description: "City traffic flows creating dynamic geometric art that shows urban pulse",
      icon: BarChart,
      category: "Urban Studies",
      metrics: "24/7 traffic monitoring",
      color: "from-purple-500 to-pink-500",
      impact: "Understanding city dynamics through data art",
    },
    {
      id: 3,
      title: "Emotional Data Landscapes",
      description: "Social media sentiment mapped as abstract landscapes of human emotion",
      icon: Palette,
      category: "Social Media",
      metrics: "1M+ social interactions",
      color: "from-orange-500 to-red-500",
      impact: "Revealing collective emotions through visualization",
    },
    {
      id: 4,
      title: "Financial Flow Networks",
      description: "Market movements visualized as interconnected webs of economic activity",
      icon: Zap,
      category: "Finance",
      metrics: "Real-time market data",
      color: "from-yellow-500 to-orange-500",
      impact: "Making complex financial data accessible",
    },
    {
      id: 5,
      title: "Population Density Murals",
      description: "Census data creating intricate population art that tells demographic stories",
      icon: PieChart,
      category: "Demographics",
      metrics: "Global census data",
      color: "from-teal-500 to-blue-500",
      impact: "Humanizing statistical data through art",
    },
    {
      id: 6,
      title: "Energy Consumption Art",
      description: "Power usage patterns forming sustainable art pieces for environmental awareness",
      icon: Database,
      category: "Sustainability",
      metrics: "Smart grid analytics",
      color: "from-green-500 to-emerald-500",
      impact: "Promoting sustainability through visual storytelling",
    },
  ];

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Palette className="h-4 w-4" aria-hidden="true" />
            <span>Featured Artworks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Data Art Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how diverse datasets become stunning visual narratives, 
            each piece telling a unique story through creative interpretation and accessible design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => {
            const IconComponent = artwork.icon;
            return (
              <Card 
                key={artwork.id} 
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 bg-card/50 backdrop-blur-sm"
                tabIndex={0}
                role="article"
                aria-labelledby={`artwork-title-${artwork.id}`}
                aria-describedby={`artwork-desc-${artwork.id}`}
                onMouseEnter={() => setHoveredCard(artwork.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Handle artwork selection
                  }
                }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${artwork.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${artwork.color} rounded-xl shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground bg-secondary/80 px-3 py-1 rounded-full font-medium">
                        {artwork.category}
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardTitle id={`artwork-title-${artwork.id}`} className="text-xl group-hover:text-primary transition-colors duration-300">
                    {artwork.title}
                  </CardTitle>
                  <CardDescription id={`artwork-desc-${artwork.id}`} className="text-muted-foreground leading-relaxed">
                    {artwork.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Data Source:</span>
                      <span className="text-muted-foreground ml-2">{artwork.metrics}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Impact:</span>
                      <span className="text-muted-foreground ml-2">{artwork.impact}</span>
                    </div>
                  </div>
                  
                  {hoveredCard === artwork.id && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <button className="text-primary text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                        View Full Project →
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Want to see more data art projects?</p>
          <button className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span>Explore Full Collection</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}