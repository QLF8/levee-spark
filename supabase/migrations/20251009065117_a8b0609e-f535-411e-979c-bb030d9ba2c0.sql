-- Create favorites table for bookmarking startups
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, startup_id)
);

-- Enable RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Users can view their own favorites
CREATE POLICY "Users can view own favorites"
ON public.favorites
FOR SELECT
USING (auth.uid() = user_id);

-- Users can add to favorites
CREATE POLICY "Users can add favorites"
ON public.favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove from favorites
CREATE POLICY "Users can remove favorites"
ON public.favorites
FOR DELETE
USING (auth.uid() = user_id);

-- Insert sample startup data for testing
INSERT INTO public.startups (
  company_name,
  tagline,
  description,
  industry,
  stage,
  location,
  funding_type,
  funding_amount,
  valuation,
  traction,
  website_url,
  status,
  founder_id
) VALUES 
  (
    'GreenTech Solutions',
    'Clean energy IoT platform',
    'Nous développons une plateforme IoT de pointe pour optimiser la consommation d''énergie des bâtiments commerciaux. Notre solution permet de réduire les coûts énergétiques de 40% en moyenne.',
    'CleanTech',
    'Series A',
    'Paris, France',
    'equity',
    3500000,
    15000000,
    '+180% YoY growth, 250+ entreprises clientes',
    'https://greentech-solutions.com',
    'published',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'HealthAI',
    'AI-powered diagnostic assistant',
    'Intelligence artificielle médicale pour aider les médecins dans leurs diagnostics. Notre IA analyse les symptômes et propose des pistes diagnostiques basées sur 10M+ cas médicaux.',
    'HealthTech',
    'Seed',
    'Berlin, Allemagne',
    'equity',
    2000000,
    8000000,
    '50K utilisateurs actifs, partnerships avec 5 hôpitaux',
    'https://healthai.io',
    'published',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'FinFlow',
    'B2B payment automation',
    'Solution de paiement B2B automatisée qui simplifie la facturation et les paiements entre entreprises. Intégration avec tous les outils comptables majeurs.',
    'FinTech',
    'Series A',
    'Amsterdam, Pays-Bas',
    'equity',
    5000000,
    25000000,
    '€12M ARR, 3000+ clients B2B',
    'https://finflow.nl',
    'published',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'EduSpace',
    'Interactive learning platform',
    'Plateforme d''apprentissage interactive pour l''éducation en ligne. Utilise la gamification et l''IA pour personnaliser l''expérience d''apprentissage de chaque étudiant.',
    'EdTech',
    'Pre-seed',
    'Lyon, France',
    'equity',
    1500000,
    5000000,
    '15K étudiants actifs, 500+ cours disponibles',
    'https://eduspace.fr',
    'published',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'FoodTech Connect',
    'Farm-to-table marketplace',
    'Marketplace qui connecte directement les producteurs locaux aux restaurants. Traçabilité complète, livraison J+1, réduction du gaspillage alimentaire.',
    'FoodTech',
    'Seed',
    'Bordeaux, France',
    'equity',
    2500000,
    10000000,
    '€2.5M GMV, 150 producteurs, 200+ restaurants',
    'https://foodtech-connect.fr',
    'published',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'CyberShield',
    'Cybersecurity for SMBs',
    'Solution de cybersécurité abordable pour les PME. Protection complète contre les cyberattaques avec monitoring 24/7 et formation des équipes.',
    'CyberSecurity',
    'Series A',
    'Luxembourg',
    'equity',
    4000000,
    18000000,
    '800+ PME protégées, 0 incidents majeurs',
    'https://cybershield.lu',
    'published',
    (SELECT id FROM auth.users LIMIT 1)
  )