import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Heart, MapPin, TrendingUp, Search, ExternalLink, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Startup {
  id: string;
  company_name: string;
  tagline: string;
  description: string;
  industry: string;
  stage: string;
  location: string;
  funding_amount: number;
  valuation: number | null;
  traction: string | null;
  website_url: string | null;
  logo_url: string | null;
}

const Deals = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  const industry = searchParams.get("industry");
  const stage = searchParams.get("stage");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchStartups();
    if (user) {
      fetchFavorites();
    }
  }, [industry, stage, user]);

  const fetchStartups = async () => {
    setLoading(true);
    let query = supabase
      .from("startups")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (industry) {
      query = query.eq("industry", industry);
    }

    if (stage) {
      query = query.eq("stage", stage);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les startups",
        variant: "destructive",
      });
    } else {
      setStartups(data || []);
    }
    setLoading(false);
  };

  const fetchFavorites = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("favorites")
      .select("startup_id")
      .eq("user_id", user.id);

    if (data) {
      setFavorites(new Set(data.map((f) => f.startup_id)));
    }
  };

  const toggleFavorite = async (startupId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const isFavorite = favorites.has(startupId);

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("startup_id", startupId);

      if (!error) {
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(startupId);
          return next;
        });
        toast({
          title: "Retiré des favoris",
        });
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, startup_id: startupId });

      if (!error) {
        setFavorites((prev) => new Set(prev).add(startupId));
        toast({
          title: "Ajouté aux favoris",
        });
      }
    }
  };

  const filteredStartups = startups.filter((startup) =>
    searchQuery
      ? startup.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    }
    return `€${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <SidebarProvider>
        <div className="flex min-h-screen w-full pt-16">
          <AppSidebar />
          
          <main className="flex-1">
            {/* Sticky Header */}
            <div className="border-b border-border bg-card sticky top-16 z-40">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger className="flex lg:hidden">
                      <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-5 w-5" />
                      </Button>
                    </SidebarTrigger>
                    
                    <div>
                      <h1 className="text-xl md:text-2xl font-bold text-foreground">
                        {industry || stage || "Toutes les opportunités"}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {filteredStartups.length} {filteredStartups.length > 1 ? 'annonces' : 'annonce'}
                      </p>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-surface border-border rounded-full h-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 py-6">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <p className="text-muted-foreground mt-4 text-lg">Chargement des annonces...</p>
                </div>
              ) : filteredStartups.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-7xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Aucune annonce trouvée</h3>
                  <p className="text-muted-foreground text-lg">Essayez de modifier vos critères de recherche</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {filteredStartups.map((startup) => (
                    <Card 
                      key={startup.id} 
                      className="overflow-hidden hover:shadow-card-hover transition-all duration-base border border-border group cursor-pointer"
                    >
                      <div className="p-5 flex flex-col h-full">
                        {/* Header - Logo + Favorite */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {startup.logo_url ? (
                              <img 
                                src={startup.logo_url} 
                                alt={startup.company_name}
                                className="w-14 h-14 rounded-xl object-cover border border-border flex-shrink-0"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xl">
                                  {startup.company_name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
                                {startup.company_name}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {startup.tagline}
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(startup.id);
                            }}
                            className="flex-shrink-0 hover:bg-surface -mr-2"
                          >
                            <Heart 
                              className={`h-5 w-5 transition-all ${
                                favorites.has(startup.id) 
                                  ? 'fill-accent text-accent scale-110' 
                                  : 'text-muted-foreground hover:text-accent hover:scale-110'
                              }`}
                            />
                          </Button>
                        </div>

                        {/* Price Tag - Prominent like Leboncoin */}
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-accent">
                            {formatAmount(startup.funding_amount)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
                          {startup.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {startup.industry}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {startup.stage}
                          </Badge>
                        </div>

                        {/* Metadata */}
                        <div className="space-y-1.5 pb-3 border-b border-border">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                            <span className="truncate">{startup.location}</span>
                          </div>
                          {startup.traction && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <TrendingUp className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-primary" />
                              <span className="truncate">{startup.traction}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            className="flex-1 text-xs bg-primary hover:bg-primary/90 font-medium"
                          >
                            Voir l'annonce
                          </Button>
                          {startup.website_url && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(startup.website_url, '_blank');
                              }}
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>

      <Footer />
    </div>
  );
};

export default Deals;
