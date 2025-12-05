import React from "react";
import { addToCart } from "../../store/cart";

export function LocalProductCard({ product }) {
  const isHandmade = product.tipo === "artesanal";
  const isFood = product.tipo === "alimento";

  const getLocalBadge = () => {
    if (isHandmade)
      return { text: "🖐️ HECHO A MANO", color: "bg-amber-100 text-amber-800" };
    if (isFood)
      return { text: "🍯 PRODUCTO LOCAL", color: "bg-red-100 text-red-800" };
    return { text: "🏠 DE LA BANDA", color: "bg-indigo-100 text-indigo-800" };
  };

  const badge = getLocalBadge();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      category: "local",
      tipo: product.tipo,
      artesano: product.artesano,
      procedencia: product.procedencia,
      image: product.imagen,
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* Imagen del producto */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badge de producto local */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}
          >
            {badge.text}
          </span>
        </div>

        {/* Badge de artesano */}
        {isHandmade && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
              🎨 {product.artesano?.split(" ")[0] || "Artesano"}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Nombre y descripción */}
        <h3 className="font-bold text-xl text-gray-800 mb-2">
          {product.nombre}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.descripcion}
        </p>

        {/* Info del creador/local */}
        <div className="mb-4 p-3 bg-amber-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600">🏠</span>
            </div>
            <div>
              <div className="font-bold text-sm text-gray-800">
                {product.artesano || "Productor local"}
              </div>
              <div className="text-xs text-gray-600">
                {product.procedencia || "La Banda, Santiago del Estero"}
              </div>
            </div>
          </div>
        </div>

        {/* Precio y acción */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-amber-600">
              ${product.precio}
            </div>
            <div className="text-xs text-gray-500">100% para el equipo</div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`
              px-6 py-3 rounded-full font-bold transition-all duration-300
              ${
                product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transform hover:scale-105"
              }
            `}
          >
            {product.stock === 0 ? "AGOTADO" : "COMPRAR"}
          </button>
        </div>

        {/* Mensaje especial */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            <span className="font-bold">✨ Apoyás doblemente:</span> Al equipo y
            a productores de La Banda
          </p>
        </div>
      </div>

      {/* Efecto especial */}
      <div className="absolute inset-0 border-2 border-amber-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
