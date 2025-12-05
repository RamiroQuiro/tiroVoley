import React from "react";
import { ProductCard } from "./ProductCard";
import { LocalProductCard } from "./LocalProductoCard";
import { VoucherCard } from "./VaucherCard";

export function ProductGrid({ products = [] }) {
  // Renderizar el componente correcto según el tipo de producto
  const renderProductCard = (product) => {
    switch (product.categoria) {
      case "vale":
        return <VoucherCard key={product.id} voucher={product} />;
      case "local":
      case "artesanal":
      case "alimento":
        return <LocalProductCard key={product.id} product={product} />;
      default:
        return <ProductCard key={product.id} product={product} />;
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          La tienda se está preparando
        </h3>
        <p className="text-gray-500">
          Pronto cargaremos los productos solidarios.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => renderProductCard(product))}
      </div>
    </div>
  );
}
