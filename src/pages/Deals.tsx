import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Heart, MapPin, TrendingUp, Search, ExternalLink } from "lucide-react";
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
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <SidebarTrigger />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    {industry || stage || "Toutes les opportunités"}
                  </h1>
                  <p className="text-muted-foreground">
                    {filteredStartups.length} startup{filteredStartups.length > 1 ? "s" : ""} disponible{filteredStartups.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher une startup..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Startups Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Chargement...</p>
                </div>
              ) : filteredStartups.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucune startup trouvée</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStartups.map((startup) => (
                    <Card key={startup.id} className="flex flex-col shadow-card hover:shadow-card-hover transition-all duration-base">
                      <CardContent className="p-6 flex-1">
                        {/* Header with Logo and Favorite */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-3xl">
                            {startup.logo_url ? (
                              <img src={startup.logo_url} alt={startup.company_name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              startup.company_name.charAt(0)
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(startup.id)}
                            className="hover:bg-transparent"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                favorites.has(startup.id)
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                              {startup.company_name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {startup.tagline}
                            </p>
                          </div>

                          {/* Amount & Stage */}
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              {formatAmount(startup.funding_amount)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {startup.stage}
                            </Badge>
                          </div>

                          {/* Metadata */}
                          <div className="space-y-2 pt-2 border-t border-border">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{startup.location}</span>
                            </div>
                            {startup.traction && (
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <TrendingUp className="h-3.5 w-3.5 text-accent" />
                                <span className="line-clamp-1">{startup.traction}</span>
                              </div>
                            )}
                          </div>

                          {/* Industry Badge */}
                          <Badge className="bg-surface text-foreground hover:bg-surface/80">
                            {startup.industry}
                          </Badge>
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-0 flex gap-2">
                        <Button variant="default" className="flex-1" size="sm">
                          Voir le deal
                        </Button>
                        {startup.website_url && (
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <a href={startup.website_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </CardFooter>
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
