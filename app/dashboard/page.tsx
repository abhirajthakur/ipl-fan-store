"use client";

import ProductCard from "@/components/ProductCard";
import TeamHeader from "@/components/TeamHeader";
import { useProductStore } from "@/lib/store/productStore";
import { Product } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { products, setProducts, loadProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(!products.length);

  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    const fetchProducts = async () => {
      if (products.length === 0) {
        try {
          await loadProducts();
        } catch (error) {
          console.error("Failed to load products:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [session, router, products.length, loadProducts]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: session.user.team.colors.secondary }}
    >
      <TeamHeader user={session.user} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              teamColors={session.user.team.colors}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
