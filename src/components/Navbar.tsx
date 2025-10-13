import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Heart, MessageSquare, User, Menu, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setUser(session?.user || null);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/deals?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  return <nav className="sticky top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            
            <span className="text-xl font-bold text-accent hidden sm:inline">
              Fundbridge
            </span>
          </button>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="🔍 Rechercher une startup ou un projet" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 h-11 bg-surface border-border focus:border-primary rounded-full" />
            </div>
          </form>

          {/* Publish Button - Prominent */}
          <Button onClick={() => user ? navigate("/publish") : navigate("/auth")} className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold gap-2 hidden lg:flex" size="default">
            <Plus className="h-5 w-5" />
            Publier un projet
          </Button>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {user ? <>
                <Button variant="ghost" size="icon" onClick={() => navigate("/notifications")} className="hidden sm:flex relative hover:bg-surface" title="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full"></span>
                </Button>
                
                <Button variant="ghost" size="icon" onClick={() => navigate("/deals?favorites=true")} className="hidden sm:flex hover:bg-surface" title="Favoris">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" onClick={() => navigate("/messages")} className="hidden sm:flex relative hover:bg-surface" title="Messages">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full"></span>
                </Button>
                
                <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} className="hover:bg-surface" title="Mon compte">
                  <User className="h-5 w-5" />
                </Button>
              </> : <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="hidden sm:flex">
                Se connecter
              </Button>}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Rechercher..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 h-10 bg-surface border-border rounded-full" />
          </div>
        </form>
      </div>
    </nav>;
};
export default Navbar;