import React, { useState } from "react";

export function CartSidebar({
  isOpen = false,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calcular totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Determinar si aplica sticker gratis
  const hasFreeSticker = subtotal >= 3000;

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    try {
      // Aquí integrarías con MercadoPago
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
          total: subtotal,
          metadata: {
            campaign: "la-banda-jujuy",
            freeSticker: hasFreeSticker,
          },
        }),
      });

      const data = await response.json();

      // Redirigir a MercadoPago
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Hubo un error al procesar el pago. Intenta nuevamente.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
      cartItems.forEach((item) => onRemoveItem(item.id));
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        shadow-2xl flex flex-col
      `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-blue to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              🛒 Tu Carrito
              {totalItems > 0 && (
                <span className="bg-white/30 px-2 py-1 rounded-full text-sm animate-pulse">
                  {totalItems} {totalItems === 1 ? "ítem" : "ítems"}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              {totalItems > 0 && (
                <button
                  onClick={handleClearCart}
                  className="text-white/80 hover:text-white text-sm px-3 py-1 bg-white/20 rounded-full transition"
                  title="Vaciar carrito"
                >
                  🗑️ Vaciar
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl p-1 hover:bg-white/10 rounded-full transition"
                aria-label="Cerrar carrito"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-blue-100">
            Cada compra ayuda al equipo a llegar a Jujuy
          </p>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Lista de items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 h-full flex flex-col justify-center">
                <div className="text-6xl mb-4 animate-bounce">🛒</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500 mb-6">
                  Agregá productos para ayudar al equipo
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-blue-700 transition transform hover:scale-105 mx-auto"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.number || ""}`}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Resumen y checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
              {/* Resumen */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Subtotal ({totalItems}{" "}
                    {totalItems === 1 ? "producto" : "productos"})
                  </span>
                  <span className="font-bold text-lg">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <span className="text-lg">✓</span> ¡GRATIS!
                  </span>
                </div>

                {hasFreeSticker && (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                    <span className="text-green-800 font-medium">
                      🎁 Sticker gratis
                    </span>
                    <span className="text-green-700 font-bold">$0.00</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total a pagar
                    </span>
                    <span className="text-2xl font-bold text-brand-blue">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 text-right">
                    Incluye IVA
                  </p>
                </div>
              </div>

              {/* Beneficio extra */}
              {!hasFreeSticker && subtotal > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-bold text-amber-800">
                        ¡Falta poco para tu sticker gratis!
                      </p>
                      <p className="text-sm text-amber-600">
                        Te faltan ${(3000 - subtotal).toFixed(2)} para llevarte
                        un sticker del equipo
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón de checkout */}
              <div className="pt-2">
                <CheckoutButton
                  total={subtotal}
                  items={cartItems}
                  onCheckout={handleCheckout}
                  isCheckingOut={isCheckingOut}
                />
              </div>

              {/* Seguridad y garantías */}
              <div className="text-center pt-4 border-t border-gray-200">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="text-lg">🔒</span>
                      <span className="text-xs">Pago seguro</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="text-lg">🔄</span>
                      <span className="text-xs">Garantía</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="text-lg">💯</span>
                      <span className="text-xs">100% solidario</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    Procesado por MercadoPago • Tus datos están protegidos
                  </p>
                </div>
              </div>

              {/* Continuar comprando */}
              <button
                onClick={onClose}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition mt-2"
              >
                ← Seguir comprando
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button (fuera del sidebar) */}
      {!isOpen && totalItems > 0 && (
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-cart"))}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-bounce"
        >
          <span className="text-xl">🛒</span>
          <span>Ver carrito</span>
          <span className="bg-white/30 px-2 py-1 rounded-full text-sm min-w-6">
            {totalItems}
          </span>
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
}

// Componente CartItem (complementario)
export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-blue/30 transition group">
      {/* Imagen del producto */}
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            🏐
          </div>
        )}
      </div>

      {/* Info del producto */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-800 truncate">{item.name}</h4>
        {item.category === "rifa" && item.number && (
          <p className="text-sm text-brand-orange font-medium">
            N° {item.number}
          </p>
        )}
        <p className="text-lg font-bold text-brand-blue mt-1">${item.price}</p>
      </div>

      {/* Controles de cantidad */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Reducir cantidad"
          >
            −
          </button>
          <span className="px-3 py-1 font-bold min-w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition"
          title="Eliminar del carrito"
        >
          <span>🗑️</span>
          <span className="hidden group-hover:inline">Eliminar</span>
        </button>
      </div>
    </div>
  );
}

// Componente CheckoutButton (complementario)
export function CheckoutButton({ total, items, onCheckout, isCheckingOut }) {
  return (
    <button
      onClick={onCheckout}
      disabled={isCheckingOut || total === 0}
      className={`
        w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
        relative overflow-hidden
        ${
          isCheckingOut || total === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        }
      `}
    >
      {isCheckingOut ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Procesando...</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-3">
            <span>💰</span>
            <span>Pagar ${total.toFixed(2)}</span>
            <span>→</span>
          </div>
          {/* Efecto shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </>
      )}
    </button>
  );
}
