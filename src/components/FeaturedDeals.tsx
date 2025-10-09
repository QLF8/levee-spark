import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";

const deals = [
  {
    id: 1,
    company: "GreenTech Solutions",
    tagline: "Clean energy IoT platform",
    amount: "€3.5M",
    stage: "Series A",
    sector: "CleanTech",
    location: "Paris, FR",
    traction: "+180% YoY",
    logo: "🌱",
  },
  {
    id: 2,
    company: "HealthAI",
    tagline: "AI-powered diagnostic assistant",
    amount: "€2M",
    stage: "Seed",
    sector: "HealthTech",
    location: "Berlin, DE",
    traction: "50K users",
    logo: "🏥",
  },
  {
    id: 3,
    company: "FinFlow",
    tagline: "B2B payment automation",
    amount: "€5M",
    stage: "Series A",
    sector: "FinTech",
    location: "Amsterdam, NL",
    traction: "€12M ARR",
    logo: "💰",
  },
  {
    id: 4,
    company: "EduSpace",
    tagline: "Interactive learning platform",
    amount: "€1.5M",
    stage: "Pre-seed",
    sector: "EdTech",
    location: "Lyon, FR",
    traction: "15K students",
    logo: "📚",
  },
];

const FeaturedDeals = () => {
  return (
    <section className="py-20 sm:py-28" id="deals">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Deals actifs
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Opportunités du moment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des startups vérifiées qui lèvent maintenant. Metrics transparentes, 
            decks disponibles, fondateurs réactifs.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="p-6 card-hover shadow-card cursor-pointer group"
            >
              {/* Logo */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-3xl mb-4">
                {deal.logo}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {deal.company}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {deal.tagline}
                  </p>
                </div>

                {/* Amount & Stage */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    {deal.amount}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {deal.stage}
                  </Badge>
                </div>

                {/* Metadata */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{deal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-accent" />
                    <span>{deal.traction}</span>
                  </div>
                </div>

                {/* Sector Badge */}
                <Badge className="bg-surface text-foreground hover:bg-surface/80">
                  {deal.sector}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg" className="group" onClick={() => window.location.href = '/deals'}>
            Voir tous les deals
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
