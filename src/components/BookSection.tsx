import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";

const features = [
  "Step-by-step Triangle Method implementation",
  "100+ low starch, low sugar recipes",
  "Meal planning templates & grocery lists",
  "Mindset shifts for permanent change",
];

export function BookSection() {
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
    <section id="book" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Book mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://freedom-weight-triangle.lovable.app/assets/book-mockup-B-p98AEg.png"
                alt="Weight Permanence Book"
                className="max-w-sm w-full drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Book info */}
          <div>
            <p className="text-sm font-medium text-primary mb-3">Pre-Order Now Available</p>
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
              Weight Permanence
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The complete guide to the Triangle Method. Learn exactly how I lost 60 pounds three times and finally discovered how to keep it off forever using low starch, low sugar principles.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8"
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
