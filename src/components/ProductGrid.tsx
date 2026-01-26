import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageX } from "lucide-react";

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts(20);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-destructive">
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <PackageX className="w-16 h-16 mx-auto text-muted-foreground" />
        <h3 className="text-xl font-semibold text-foreground">No products found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your store doesn't have any products yet. Create one by telling the chat what product you'd like to add and its price.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
