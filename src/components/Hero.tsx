import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";
const Hero = () => {
  const navigate = useNavigate();
  return <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img src={heroIllustration} alt="Bridge illustration representing connections" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Fundbridge,{" "}
              <span className="gradient-text">de vos idées à la réalité</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Connecte-toi aux meilleures opportunités early-stage en Europe. 
              Transparence totale, process rapide, deals vérifiés.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" onClick={() => navigate('/auth')}>
                J'ai un projet
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="default" size="lg" onClick={() => navigate('/auth')}>
                Je cherche à investir
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">€45M+</div>
                  <div className="text-sm text-muted-foreground">Levés en 2024</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">850+</div>
                  <div className="text-sm text-muted-foreground">Investisseurs actifs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative hidden lg:block">
            {/* Floating Card */}
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-card-hover border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg" />
                <div>
                  <div className="text-lg font-semibold text-foreground">Deal en cours</div>
                  <div className="text-sm text-muted-foreground">TechCo SaaS - €2M</div>
                </div>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;