
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import BooksSection from "@/components/BooksSection";
import ComparisonSection from "@/components/ComparisonSection";
import StockScreenerSection from "@/components/StockScreenerSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BooksSection />
        <ComparisonSection />
        <StockScreenerSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
