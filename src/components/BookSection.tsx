import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Loader2, Gift } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import bookCover from "@/assets/book-cover.png";

const features = [
  "The Weight Permanence Triangle™ Implementation",
  "Working with emotion instead of fighting it",
  "Making low starch, low sugar food decisions in any environment",
  "Shifting from short-term weight loss to long-term permanence",
];

export function BookSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { data: products, isLoading: productsLoading } = useProducts(1);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  
  const bookProduct = products?.[0];
  const variant = bookProduct?.node?.variants?.edges?.[0]?.node;
  const price = variant?.price || bookProduct?.node?.priceRange?.minVariantPrice;

  const handlePreOrder = async () => {
    if (!bookProduct || !variant) {
      toast.error("Product not available", {
        description: "Please check back later or contact support.",
      });
      return;
    }

    await addItem({
      product: bookProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart!", {
      description: "Weight Permanence book has been added to your cart.",
    });
  };

  return (
    <section id="book" className="py-14 bg-secondary/30">
      <div className="container">
        <div 
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Book mockup */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
              <img
                src="https://freedom-weight-triangle.lovable.app/assets/book-mockup-B-p98AEg.png"
                alt="Weight Permanence Book"
                className="relative max-w-sm w-full drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Book info */}
          <div>
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
              <span className="text-sm font-medium text-accent">Pre-Order Now Available</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
              Weight Permanence
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The complete guide to the Weight Permanence Triangle™ Method. Learn how to build an identity that naturally prioritizes low starch, low sugar eating without relying on rigid plans or daily scripts.
            </p>

            <ul className="space-y-3 mb-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Early Access Bonus */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
                    Early Access Bonus
                  </p>
                  <p className="text-foreground text-sm leading-relaxed mb-2">
                    Pre-order the book and receive 12 months of free access to the Guided Questions platform — a structured, conversational tool that walks you through the five stages of Awareness in the Weight Permanence Triangle.
                  </p>
                  <p className="text-muted-foreground text-xs">
                    After the first year, access is $10/month.
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg" 
              className="w-full sm:w-auto px-8 animate-pulse-glow"
              onClick={handlePreOrder}
              disabled={isLoading || productsLoading || !bookProduct}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <ShoppingCart className="w-4 h-4 mr-2" />
              )}
              Pre-Order Now – {price ? `${price.currencyCode} ${parseFloat(price.amount).toFixed(2)}` : "CAD 25.00"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
