import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, removeFromCart, updateQuantity } from '../../store/cart';
import { Button } from '../common/Button';

export function CartFlyout() {
    const $isCartOpen = useStore(isCartOpen);
    const $cartItems = useStore(cartItems);
    const items = Object.values($cartItems);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Prevent hydration styling mismatch by using a mounted state
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            {$isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => isCartOpen.set(false)}
                />
            )}

            {/* Flyout Panel */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${$isCartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-800">Tu Carrito ({items.length})</h2>
                        <button
                            onClick={() => isCartOpen.set(false)}
                            className="p-2 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                <span className="text-4xl opacity-50">🛒</span>
                                <p>Tu carrito está vacío</p>
                                <Button variant="outline" onClick={() => isCartOpen.set(false)}>
                                    Seguir mirando
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-gray-100" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                                        <p className="text-brand-orange font-bold">${item.price.toLocaleString()}</p>

                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs text-red-500 hover:text-red-700 underline"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer / Checkout */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <Button fullWidth onClick={() => alert('Checkout flow mock')}>
                                Iniciar Compra
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
