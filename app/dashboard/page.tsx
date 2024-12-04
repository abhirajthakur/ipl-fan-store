'use client';

import {useSession} from 'next-auth/react';
import TeamHeader from '@/components/TeamHeader';
import ProductCard from '@/components/ProductCard';
import {useEffect, useState} from "react";
import {Product} from "@/lib/types";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function Dashboard() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const result = await response.json();
                setProducts(result.products);
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred';

                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [session, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-lg">Loading...</div>
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-lg">Loading products...</div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen"
            style={{backgroundColor: session.user.team.colors.secondary}}
        >
            <TeamHeader user={session.user}/>

            <main className="container mx-auto px-4 py-8">
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
                        {error}
                    </div>
                )}

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                teamColors={session.user.team.colors}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        No products found
                    </div>
                )}
            </main>
        </div>
    );
}