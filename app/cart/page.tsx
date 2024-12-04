'use client';

import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import CartItemList from '@/components/cart/CartItemList';
import CartSummary from '@/components/cart/CartSummary';
import {Cart} from '@/lib/types';
import {fetchCart} from '@/db/cart';
import {ShoppingBag} from 'lucide-react';

export default function CartPage() {
    const {data: session} = useSession();
    const router = useRouter();
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await fetchCart();
                setCart(cartData.cart);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCart();
    }, [session, router]);

    if (!session?.user) return null;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading cart...</div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <ShoppingBag className="w-16 h-16 text-gray-400"/>
                <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="text-blue-600 hover:text-blue-800"
                >
                    Continue shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.items.length} items)</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <CartItemList cart={cart} setCartAction={setCart}/>
                    </div>
                    <div className="lg:col-span-1">
                        <CartSummary cart={cart}/>
                    </div>
                </div>
            </div>
        </div>
    );
}