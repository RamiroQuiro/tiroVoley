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
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 group">
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
      <div className="p-6">
        {/* Info del producto */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {voucher.nombre}
          </h3>
          <p className="text-gray-600">{voucher.descripcion}</p>
        </div>

        {/* Detalles del vale */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-2 border-b border-green-100">
            <span className="text-gray-600">📅 Vigencia:</span>
            <span className="font-bold">
              {formatValidity(voucher.vigencia)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-green-100">
            <span className="text-gray-600">🏪 Comercio:</span>
            <span className="font-bold">{voucher.comercio}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-green-100">
            <span className="text-gray-600">📍 Dirección:</span>
            <span className="font-bold text-right">{voucher.direccion}</span>
          </div>
        </div>

        {/* Precio y stock */}
        <div className="mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              ${voucher.precio}
            </div>
            <div className="text-sm text-gray-500">
              {voucher.stock > 0 ? (
                <span className="text-green-600">
                  ✓ {voucher.stock} disponibles
                </span>
              ) : (
                <span className="text-red-500">❌ Agotado temporalmente</span>
              )}
            </div>
          </div>
        </div>

        {/* Botón de compra */}
        <button
          onClick={handleAddToCart}
          disabled={voucher.stock === 0}
          className={`
            w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
            relative overflow-hidden
            ${
              voucher.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
            }
          `}
        >
          {voucher.stock === 0 ? "VALE AGOTADO" : "COMPRAR VALE"}

          {/* Efecto shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>

        {/* Términos y condiciones */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            * Presentar código QR al canjear. No acumulable con otras
            promociones.
          </p>
        </div>
      </div>

      {/* Código simulado */}
      <div className="bg-green-900/10 p-4 border-t border-green-200">
        <div className="flex items-center justify-center space-x-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-2 h-6 bg-green-400 rounded-sm"></div>
          ))}
        </div>
        <p className="text-center text-xs text-green-800 font-mono mt-2">
          Código generado al momento de la compra
        </p>
      </div>
    </div>
  );
}
