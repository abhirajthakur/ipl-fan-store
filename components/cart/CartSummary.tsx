'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Cart } from '@/lib/types';
import { toast } from 'sonner';

interface CartSummaryProps {
    cart: Cart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
    const router = useRouter();

    const subtotal = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = 99;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        // Implement checkout logic here
        toast.success('Checkout functionality coming soon!');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
                <Button
                    className="w-full mt-6"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/dashboard')}
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
}