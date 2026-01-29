import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { createShopifyCart } from '@/lib/shopify';
import { toast } from 'sonner';

export function useDirectCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: products } = useProducts(1);

  const handleDirectCheckout = async () => {
    const bookProduct = products?.[0];
    const variant = bookProduct?.node?.variants?.edges?.[0]?.node;

    if (!bookProduct || !variant) {
      toast.error("Product not available", {
        description: "Please check back later or contact support.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await createShopifyCart({
        lineId: null,
        product: bookProduct,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });

      if (result?.checkoutUrl) {
        window.open(result.checkoutUrl, '_blank');
      } else {
        toast.error("Checkout unavailable", {
          description: "Please try again or use the cart.",
        });
      }
    } catch (error) {
      console.error('Direct checkout failed:', error);
      toast.error("Checkout failed", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDirectCheckout, isLoading };
}
