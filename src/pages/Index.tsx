import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Products</h2>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
