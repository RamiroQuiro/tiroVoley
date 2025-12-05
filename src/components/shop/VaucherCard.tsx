import React from "react";
import { addToCart } from "../../store/cart";

export function VoucherCard({ voucher }) {
  const getVoucherTypeIcon = (tipo) => {
    switch (tipo) {
      case "empanadas":
        return "🥟";
      case "pizza":
        return "🍕";
      case "asado":
        return "🥩";
      case "postre":
        return "🍰";
      case "bebida":
        return "🥤";
      default:
        return "🎫";
    }
  };

  const formatValidity = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: `voucher-${voucher.id}`,
      name: `Vale: ${voucher.nombre}`,
      price: voucher.precio,
      category: "vale",
      comercio: voucher.comercio,
      vigencia: voucher.vigencia,
      codigo: `VALE-${voucher.id}-${Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase()}`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden  hover:shadow-xl transition-all duration-300 border-2 border-green-100 group">
      {/* Header del vale */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <div className="text-sm uppercase tracking-widest font-semibold opacity-90">
              VALE SOLIDARIO
            </div>
            <div className="text-xl font-bold mt-1">{voucher.comercio}</div>
          </div>
          <div className="text-4xl">{getVoucherTypeIcon(voucher.tipo)}</div>
        </div>
      </div>

      {/* Cuerpo del vale */}
      <div className="p-5">
        {/* Info del producto */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {voucher.nombre}
          </h3>
          <p className="text-gray-600 text-sm ">{voucher.descripcion}</p>
        </div>

        {/* Detalles del vale - Compacto */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🏪 {voucher.comercio}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">📅 Vigencia:</span>
            <span className="font-semibold text-xs">
              {formatValidity(voucher.vigencia)}
            </span>
          </div>
        </div>

        {/* Precio y stock */}
        <div className="mb-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            ${voucher.precio}
          </div>
          <div className="text-xs text-gray-500">
            {voucher.stock > 0 ? (
              <span className="text-green-600">
                ✓ {voucher.stock} disponibles
              </span>
            ) : (
              <span className="text-red-500">❌ Agotado temporalmente</span>
            )}
          </div>
        </div>

        {/* Botón de compra */}
        <button
          onClick={handleAddToCart}
          disabled={voucher.stock === 0}
          className={`
            w-full py-3 rounded-xl font-bold text-base transition-all duration-300
            relative overflow-hidden
            ${
              voucher.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg"
            }
          `}
        >
          {voucher.stock === 0 ? "VALE AGOTADO" : "COMPRAR VALE"}

          {/* Efecto shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
    </div>
  );
}
