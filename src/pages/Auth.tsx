import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, TrendingUp, Users, Rocket } from "lucide-react";
import logo from "@/assets/logo.png";
const Auth = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState<"investor" | "founder">("investor");
  useEffect(() => {
    // Check session but don't auto-redirect to allow interaction
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      // Session check without redirect
    });
  }, [navigate]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Fundbridge"
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            company_name: role === "founder" ? companyName : null
          }
        }
      });
      if (error) throw error;
      if (data.user) {
        // Create profile
        const {
          error: profileError
        } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: signupEmail,
          full_name: fullName,
          company_name: role === "founder" ? companyName : null
        });
        if (profileError) throw profileError;

        // Create role
        const {
          error: roleError
        } = await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: role
        });
        if (roleError) throw roleError;
        toast({
          title: "Compte créé",
          description: "Votre compte a été créé avec succès"
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#004aad] via-[#0066cc] to-[#FF6B35] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,53,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,74,173,0.4),transparent_50%)]" />
      
      {/* Animated Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF6B35] rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-[#004aad] rounded-full opacity-20 animate-pulse delay-75" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#FF6B35] rounded-full opacity-15 animate-pulse delay-150" />
      
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Marketing Content */}
          <div className="text-white space-y-8 hidden md:block animate-fade-in">
            <div className="space-y-4">
              
              <h1 className="text-5xl font-bold leading-tight">
                Connectez votre projet aux{" "}
                <span className="text-[#FF6B35]">bons investisseurs</span>
              </h1>
              <p className="text-lg text-white/80">
                Fundbridge simplifie la rencontre entre fondateurs ambitieux et investisseurs visionnaires
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[{
              icon: Rocket,
              title: "Levée rapide",
              desc: "Présentez votre projet en quelques clics"
            }, {
              icon: Users,
              title: "Réseau qualifié",
              desc: "Accédez à des milliers d'investisseurs actifs"
            }, {
              icon: TrendingUp,
              title: "Succès garanti",
              desc: "75% de taux de matching réussi"
            }].map((item, i) => <div key={i} className="flex items-start gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="animate-scale-in">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                  <img src={logo} alt="Fundbridge Logo" className="w-16 h-16 object-contain rounded-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Fundbridge</h2>
                <p className="text-gray-600">
                  {isLogin ? "Connectez-vous à votre compte" : "Rejoignez la communauté"}
                </p>
              </div>

              <Tabs value={isLogin ? "login" : "signup"} onValueChange={v => setIsLogin(v === "login")}>
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1">
                  <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004aad] data-[state=active]:to-[#0066cc] data-[state=active]:text-white transition-all duration-300">
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C5A] data-[state=active]:text-white transition-all duration-300">
                    Inscription
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="animate-fade-in">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                      <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className="h-12 border-gray-300 focus:border-[#004aad] focus:ring-[#004aad] transition-all duration-300" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
                      <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-12 border-gray-300 focus:border-[#004aad] focus:ring-[#004aad] transition-all duration-300" required />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#004aad] to-[#0066cc] hover:from-[#003d8f] hover:to-[#0052a8] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      Se connecter
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="animate-fade-in">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                      <Input id="signup-email" type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="votre@email.com" className="h-12 border-gray-300 focus:border-[#FF6B35] focus:ring-[#FF6B35] transition-all duration-300" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-700 font-medium">Mot de passe</Label>
                      <Input id="signup-password" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} placeholder="••••••••" className="h-12 border-gray-300 focus:border-[#FF6B35] focus:ring-[#FF6B35] transition-all duration-300" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="full-name" className="text-gray-700 font-medium">Nom complet</Label>
                      <Input id="full-name" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jean Dupont" className="h-12 border-gray-300 focus:border-[#FF6B35] focus:ring-[#FF6B35] transition-all duration-300" required />
                    </div>
                    {role === "founder" && <div className="space-y-2">
                        <Label htmlFor="company-name" className="text-gray-700 font-medium">Société</Label>
                        <Input id="company-name" type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Ma Startup" className="h-12 border-gray-300 focus:border-[#FF6B35] focus:ring-[#FF6B35] transition-all duration-300" required />
                      </div>}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-700 font-medium">Je suis</Label>
                      <Select value={role} onValueChange={(v: "investor" | "founder") => setRole(v)}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-[#FF6B35] focus:ring-[#FF6B35]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="investor">Investisseur</SelectItem>
                          <SelectItem value="founder">Fondateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] hover:from-[#FF5722] hover:to-[#FF7043] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      Créer mon compte
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Auth;