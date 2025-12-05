import React, { useState } from "react";
import { addToCart } from "../../store/cart";

export function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const getProductBadge = (categoria) => {
    switch (categoria) {
      case "remera":
        return { text: "👕 REMERA", color: "bg-blue-100 text-blue-800" };
      case "buzo":
        return { text: "🧥 BUZO", color: "bg-purple-100 text-purple-800" };
      case "gorra":
        return { text: "🧢 GORRA", color: "bg-green-100 text-green-800" };
      case "taza":
        return { text: "☕ TAZA", color: "bg-orange-100 text-orange-800" };
      case "accesorio":
        return { text: "🎒 ACCESORIO", color: "bg-pink-100 text-pink-800" };
      default:
        return { text: "🛍️ PRODUCTO", color: "bg-gray-100 text-gray-800" };
    }
  };

  const badge = getProductBadge(product.categoria);

  const handleAddToCart = () => {
    // Agregar múltiples si quantity > 1
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id + "-" + i,
        name: product.nombre,
        price: product.precio,
        category: product.categoria,
        image: product.imagen,
        stock: product.stock,
      });
    }
    // Reset quantity
    setQuantity(1);
  };

  const isLowStock = product.stock < 10 && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de categoría */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}
        >
          {badge.text}
        </span>
      </div>

      {/* Badge de stock bajo */}
      {isLowStock && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold animate-pulse">
            ⚡ {product.stock} ÚLTIMOS
          </span>
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={product.imagen}
          alt={product.nombre}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Overlay en hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="px-6 py-3 bg-white text-gray-800 font-bold rounded-full hover:bg-gray-100 transition transform scale-90 group-hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? "AGOTADO" : "AGREGAR AL CARRITO"}
            </button>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {product.nombre}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.descripcion}
        </p>

        {/* Precio y stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-brand-blue">
              ${product.precio}
            </div>
            <div className="text-xs text-gray-500">
              {isOutOfStock ? (
                <span className="text-red-500">❌ Agotado</span>
              ) : (
                <span className="text-green-600">
                  ✓ {product.stock} disponibles
                </span>
              )}
            </div>
          </div>

          {/* Selector de cantidad */}
          {!isOutOfStock && (
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-3 py-1 font-bold min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((prev) => Math.min(product.stock, prev + 1))
                }
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Botón principal */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            w-full py-3 rounded-lg font-bold transition-all duration-300
            ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
            }
          `}
        >
          {isOutOfStock ? "PRODUCTO AGOTADO" : "AGREGAR AL CARRITO"}
        </button>

        {/* Info de envío */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">📦 Envío gratis en La Banda</p>
        </div>
      </div>

      {/* Efecto de borde en hover */}
      <div
        className={`absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 ${
          isHovered ? "border-brand-blue/30" : ""
        }`}
      />
    </div>
  );
}
