'use client';

import {User} from 'next-auth';
import {LogOut, ShoppingCart} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useCartStore} from '@/lib/store/cartStore';
import {useEffect} from 'react';
import {fetchCart} from '@/db/cart';

interface TeamHeaderProps {
    user: User;
}

export default function TeamHeader({user}: TeamHeaderProps) {
    const router = useRouter();
    const {cartItemCount, setCartItemCount} = useCartStore();

    useEffect(() => {
        const loadCartCount = async () => {
            try {
                const {cart} = await fetchCart();
                const totalItems = cart?.items.reduce((sum: number, item: {
                    [key: string]: number
                }) => sum + item.quantity, 0) || 0;
                setCartItemCount(totalItems);
            } catch (error) {
                console.error('Failed to fetch cart count:', error);
            }
        };

        loadCartCount();
    }, [setCartItemCount]);

    return (
        <header
            className="py-6"
            style={{backgroundColor: user.team.colors.primary}}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Welcome to {user.team.name} Fan Store!
                        </h1>
                        <p className="mt-2 text-white/80">
                            Exclusive merchandise for {user.team.name} supporters
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="bg-white text-gray-900 hover:bg-gray-100 relative"
                            onClick={() => router.push('/cart')}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4"/>
                            Cart
                            {cartItemCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white text-gray-900 hover:bg-gray-100"
                            onClick={() => signOut({callbackUrl: "/"})}
                        >
                            <LogOut className="mr-2 h-4 w-4"/>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
