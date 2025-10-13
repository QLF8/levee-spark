import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, FileText, MessageSquare, Handshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Découvre",
    description: "Parcours les startups qui lèvent. Filtre par secteur, montant, stage.",
    color: "primary",
  },
  {
    number: "02",
    icon: FileText,
    title: "Analyse",
    description: "Consulte les decks, metrics, et business models en toute transparence.",
    color: "accent",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Connecte",
    description: "Envoie un message direct aux fondateurs. Pas d'intermédiaire.",
    color: "primary",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Conclue",
    description: "Finalisez le deal avec des contrats clairs entre investisseur et chef de projet.",
    color: "accent",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-28 bg-surface/30" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Simple & Rapide
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un process clair en 4 étapes. Du premier contact à l'investissement.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isAccent = step.color === "accent";

            return (
              <div key={index} className="relative">
                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-border -z-10" />
                )}

                <Card className="p-6 h-full shadow-card hover:shadow-card-hover transition-all duration-base">
                  {/* Number Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl font-bold text-muted-foreground/30">
                      {step.number}
                    </span>
                    <div className={`p-3 rounded-xl ${
                      isAccent 
                        ? "bg-accent/10" 
                        : "bg-primary/10"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isAccent ? "text-accent" : "text-primary"
                      }`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
