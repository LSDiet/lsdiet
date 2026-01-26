import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const { node } = product;
  
  const image = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant) return;
    
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    
    toast.success("Added to cart", {
      description: node.title,
    });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square bg-secondary/20 overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="w-12 h-12" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {node.description || "No description available"}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">
            {price?.currencyCode} {parseFloat(price?.amount || "0").toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading || !variant?.availableForSale}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
