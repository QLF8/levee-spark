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
            <p className="text-lg max-w-xl sm:text-xl text-slate-950">
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
            <div className="flex flex-wrap gap-8 pt-12">
              <div className="flex items-center gap-3 py-0 px-px mx-[9px] my-0">
                <div className="p-2 bg-primary/10 rounded-lg mx-0 px-[10px]">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                </div>
                  <div className="text-sm text-muted-foreground">De nouveaux projets chaque jour</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg py-[8px] px-[10px]">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                </div>
                  <div className="text-sm text-muted-foreground rounded-lg bg-transparent">
                    Des investisseurs actifs.<br />
                    Prêts à découvrir les projets de demain.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative hidden lg:block">
            {/* Floating Card */}
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-card-hover border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-2xl font-bold text-white">
                  AI
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">TechFlow AI</div>
                  <div className="text-sm text-muted-foreground">SaaS • Paris</div>
                </div>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                Plateforme d'automatisation IA pour les PME. Recherche 100K€ pour 8% de la société.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Objectif</span>
                  <span className="font-semibold text-foreground">100 000€</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>75 000€ levés</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
