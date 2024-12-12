"use client";

import { Button } from "@/components/ui/button";
import { removeFromCart, updateCartItemQuantity } from "@/db/cart";
import { Cart } from "@/lib/types";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface CartItemListProps {
  cart: Cart;
  setCartAction: (cart: Cart) => void;
}

export default function CartItemList({ cart, setCartAction }: CartItemListProps) {
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    setUpdatingItemId(itemId);
    try {
      const updatedCart = await updateCartItemQuantity(itemId, newQuantity);
      setCartAction(updatedCart.cart);
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setDeletingItemId(itemId);
    try {
      const updatedCart = await removeFromCart(itemId);
      setCartAction(updatedCart.cart);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setDeletingItemId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 py-4 border-b last:border-0"
        >
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
              onClick={() =>
                handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1 || updatingItemId === item.id}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">
              {updatingItemId === item.id ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                item.quantity
              )}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              disabled={updatingItemId === item.id}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 relative"
            onClick={() => handleRemoveItem(item.id)}
            disabled={deletingItemId === item.id}
          >
            {deletingItemId === item.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
