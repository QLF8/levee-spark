import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDeals from "@/components/FeaturedDeals";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedDeals />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
