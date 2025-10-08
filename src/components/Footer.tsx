import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">LeveDesFonds</h3>
            <p className="text-sm text-white/70">
              Le marketplace qui connecte startups et investisseurs en toute transparence.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Produit
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#deals" className="text-sm text-white/70 hover:text-white transition-colors">
                  Voir les deals
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Publier une levée
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">
                  Comment ça marche
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Entreprise
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Carrières
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Légal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center sm:text-left">
          <p className="text-sm text-white/50">
            © 2025 LeveDesFonds. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
