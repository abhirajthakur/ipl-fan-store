"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  teamColors: {
    primary: string;
    secondary: string;
  };
}

export default function ProductCard({ product, teamColors }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { incrementCartCount } = useCartStore();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      incrementCartCount();
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:scale-105 flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">
            {product.category}
          </span>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <span
            className="text-2xl font-bold block mb-3"
            style={{ color: teamColors.primary }}
          >
            ₹{product.price}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            style={{
              backgroundColor: teamColors.primary,
              color: "#fff",
            }}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
