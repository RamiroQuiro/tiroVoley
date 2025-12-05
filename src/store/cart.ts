import { atom, map } from 'nanostores';

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    category: 'producto' | 'rifa';
};

export const isCartOpen = atom(false);
export const cartItems = map<Record<number, CartItem>>({});

export function addToCart(item: Omit<CartItem, 'quantity'>) {
    const existing = cartItems.get()[item.id];
    if (existing) {
        cartItems.setKey(item.id, { ...existing, quantity: existing.quantity + 1 });
    } else {
        cartItems.setKey(item.id, { ...item, quantity: 1 });
    }
    isCartOpen.set(true);
}

export function removeFromCart(id: number) {
    const current = cartItems.get();
    const { [id]: _, ...rest } = current;
    cartItems.set(rest);
}

export function updateQuantity(id: number, quantity: number) {
    const existing = cartItems.get()[id];
    if (!existing) return;

    if (quantity <= 0) {
        removeFromCart(id);
    } else {
        cartItems.setKey(id, { ...existing, quantity });
    }
}

export function clearCart() {
    cartItems.set({});
}
