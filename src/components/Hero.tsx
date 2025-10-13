import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Bridge Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroIllustration} 
                alt="Fundbridge - Connecting startups with investors" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-card-hover border border-border hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg" />
                <div>
                  <div className="text-sm font-semibold text-foreground">TechCo SaaS</div>
                  <div className="text-xs text-muted-foreground">Lève €2M • Seed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content on white background */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-primary/20">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">
                Plus de 120 deals actifs
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
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
              <Button variant="hero" size="lg" className="group" onClick={() => navigate('/deals')}>
                Voir les deals
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/publish')}>
                Publier ma levée
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
