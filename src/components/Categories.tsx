import { useNavigate } from "react-router-dom";
import { 
  MonitorSmartphone, 
  ShoppingBag, 
  Cpu, 
  MapPin, 
  Leaf, 
  Heart, 
  GraduationCap, 
  Briefcase,
  Sparkles
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  industry: string;
}

const categories: Category[] = [
  {
    id: "saas",
    name: "SaaS",
    icon: MonitorSmartphone,
    color: "from-blue-500 to-blue-600",
    industry: "saas"
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    color: "from-purple-500 to-purple-600",
    industry: "ecommerce"
  },
  {
    id: "tech",
    name: "Startups Tech",
    icon: Cpu,
    color: "from-cyan-500 to-cyan-600",
    industry: "tech"
  },
  {
    id: "local",
    name: "Projets Locaux",
    icon: MapPin,
    color: "from-green-500 to-green-600",
    industry: "local"
  },
  {
    id: "green",
    name: "Green / Impact",
    icon: Leaf,
    color: "from-emerald-500 to-emerald-600",
    industry: "green"
  },
  {
    id: "health",
    name: "Santé & Bien-être",
    icon: Heart,
    color: "from-rose-500 to-rose-600",
    industry: "health"
  },
  {
    id: "education",
    name: "Éducation",
    icon: GraduationCap,
    color: "from-indigo-500 to-indigo-600",
    industry: "education"
  },
  {
    id: "services",
    name: "Services & Agences",
    icon: Briefcase,
    color: "from-amber-500 to-amber-600",
    industry: "services"
  },
  {
    id: "other",
    name: "Autres projets",
    icon: Sparkles,
    color: "from-orange-500 to-orange-600",
    industry: "other"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (industry: string) => {
    navigate(`/deals?industry=${industry}`);
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Explorer par catégorie
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.industry)}
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-card-hover transition-all duration-base flex flex-col items-center gap-3"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-base`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors text-center">
                  {category.name}
                </span>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-base pointer-events-none"></div>
              </button>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/deals")}
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium text-lg transition-colors"
          >
            Voir toutes les annonces
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;