import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft } from "lucide-react";

const PublishDeal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [location, setLocation] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [valuation, setValuation] = useState("");
  const [traction, setTraction] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("startups").insert({
        founder_id: user.id,
        company_name: companyName,
        tagline,
        description,
        industry,
        stage,
        location,
        funding_amount: parseFloat(fundingAmount),
        funding_type: fundingType,
        valuation: valuation ? parseFloat(valuation) : null,
        traction,
        website_url: websiteUrl,
        status: "published",
      });

      if (error) throw error;

      toast({
        title: "Annonce publiée",
        description: "Votre annonce est maintenant visible par les investisseurs",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>

          <div className="bg-white rounded-lg shadow-card p-8">
            <h1 className="text-3xl font-bold text-heading mb-2">Publier ma levée</h1>
            <p className="text-muted mb-8">
              Remplissez les informations pour créer votre annonce
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Nom de la société</Label>
                  <Input
                    id="company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ma Startup"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Secteur</Label>
                  <Select value={industry} onValueChange={setIndustry} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="healthtech">Healthtech</SelectItem>
                      <SelectItem value="edtech">Edtech</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tagline">Tagline (une phrase)</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="La plateforme qui révolutionne..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description complète</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez votre projet, votre équipe, votre vision..."
                  rows={6}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="stage">Stade</Label>
                  <Select value={stage} onValueChange={setStage} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un stade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-seed">Pre-seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Paris, France"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="amount">Montant recherché (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(e.target.value)}
                    placeholder="500000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type de financement</Label>
                  <Select value={fundingType} onValueChange={setFundingType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                      <SelectItem value="safe">SAFE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="valuation">Valorisation (€) - optionnel</Label>
                <Input
                  id="valuation"
                  type="number"
                  value={valuation}
                  onChange={(e) => setValuation(e.target.value)}
                  placeholder="5000000"
                />
              </div>

              <div>
                <Label htmlFor="traction">Traction / Métriques clés</Label>
                <Textarea
                  id="traction"
                  value={traction}
                  onChange={(e) => setTraction(e.target.value)}
                  placeholder="10k utilisateurs, 50k MRR, croissance 20% MoM..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://mastartup.com"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publier l'annonce
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublishDeal;
