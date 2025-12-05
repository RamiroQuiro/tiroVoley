import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { addToCart } from '../../store/cart';

interface Product {
    id: number;
    nombre: string;
    precio: number;
    imagen: string | null;
    categoria: string | null;
    stock: number;
}

export function ProductCard({ product }: { product: Product }) {
    const handleAdd = () => {
        addToCart({
            id: product.id,
            name: product.nombre,
            price: product.precio,
            image: product.imagen || '',
            category: 'producto',
        });
    };

    return (
        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
            <div className="aspect-square bg-gray-100 relative overflow-hidden group">
                <img
                    src={product.imagen || `https://placehold.co/400x400?text=${product.nombre}`}
                    alt={product.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Sin Stock</span>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-1 text-gray-900 line-clamp-1">{product.nombre}</h3>
                <p className="text-brand-orange font-bold text-xl mb-4">
                    ${product.precio.toLocaleString()}
                </p>

                <div className="mt-auto">
                    <Button
                        fullWidth
                        onClick={handleAdd}
                        disabled={product.stock <= 0}
                        className="shadow-sm"
                    >
                        {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
