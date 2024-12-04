'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/lib/types';
import { updateCartItemQuantity, removeFromCart } from '@/db/cart';
import { toast } from 'sonner';

interface CartItemListProps {
    cart: Cart;
    setCartAction: (cart: Cart) => void;
}

export default function CartItemList({ cart, setCartAction }: CartItemListProps) {
    const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
        try {
            const updatedCart = await updateCartItemQuantity(itemId, newQuantity);
            setCartAction(updatedCart.cart);
            toast.success('Cart updated');
        } catch (error) {
            toast.error('Failed to update cart');
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            const updatedCart = await removeFromCart(itemId);
            setCartAction(updatedCart.cart);
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                    <div className="relative w-24 h-24">
                        <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">₹{item.product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItem(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}