export async function fetchCart() {
    const response = await fetch('/api/cart');
    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }
    return response.json();
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
    const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }

    return response.json();
}

export async function removeFromCart(itemId: string) {
    const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to remove item from cart');
    }

    return response.json();
}