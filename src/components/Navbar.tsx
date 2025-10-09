import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
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
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500">
              Fundbridge
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/deals")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Voir les deals
            </button>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Comment ça marche
            </a>
            <a href="#for-investors" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Investisseurs
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/messages")}>
                  Messages
                </Button>
                <Button variant="accent" size="sm" onClick={() => navigate("/publish")}>
                  Publier ma levée
                </Button>
                <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
                  Déconnexion
                </Button>
              </> : <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                  Se connecter
                </Button>
                <Button variant="accent" size="sm" onClick={() => navigate("/auth")}>
                  Publier ma levée
                </Button>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>;
};
export default Navbar;