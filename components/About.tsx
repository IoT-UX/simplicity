import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Users, Target, Sparkles, Heart, Eye, Palette } from 'lucide-react';

export function About() {
  const principles = [
    {
      icon: Lightbulb,
      title: "Creative Interpretation",
      description: "Transform raw data into meaningful visual stories that inspire and educate everyone",
    },
    {
      icon: Users,
      title: "Universal Access",
      description: "Design experiences that are accessible to everyone, regardless of ability or background",
    },
    {
      icon: Target,
      title: "Clear Purpose",
      description: "Every visualization serves a clear purpose in communicating data insights effectively",
    },
    {
      icon: Sparkles,
      title: "Artistic Expression",
      description: "Blend analytical precision with creative freedom to discover new perspectives",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Human-Centered",
      description: "We put people at the center of every data story, ensuring emotional connection and understanding.",
    },
    {
      icon: Eye,
      title: "Visual Clarity",
      description: "Complex data becomes simple through thoughtful design and intuitive visual language.",
    },
    {
      icon: Palette,
      title: "Aesthetic Excellence",
      description: "Beautiful design isn't just decoration—it's essential for effective communication.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" aria-hidden="true" />
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">The Art of Simplicity</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            At the intersection of data science and artistic expression lies a world of infinite possibilities. 
            We believe that data, when approached with creativity and empathy, can become a powerful medium 
            for storytelling, understanding, and human connection—accessible to everyone.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <Card key={index} className="text-center h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Philosophy Card */}
        <Card className="max-w-5xl mx-auto border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl sm:text-3xl gradient-text">The Power of Simple Data</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-center leading-relaxed text-lg">
              Data art represents more than just visualization—it's about finding the human stories 
              hidden within numbers, patterns, and trends. By approaching data with an artist's eye 
              and a scientist's rigor, we can create works that not only inform but also move, 
              inspire, and connect us to the world around us.
            </p>
            <p className="text-center leading-relaxed text-lg">
              Every dataset contains untold stories. Our mission is to help those stories emerge 
              through thoughtful, accessible, and beautiful design that speaks to everyone, 
              regardless of their technical background or abilities.
            </p>
            <div className="text-center pt-6">
              <div className="inline-flex items-center space-x-2 text-primary font-medium">
                <Sparkles className="h-5 w-5" />
                <span>Transforming complexity into clarity, data into art</span>
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}