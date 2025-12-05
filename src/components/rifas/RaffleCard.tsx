import React from "react";
import { addToCart } from "../../store/cart";

export function RaffleCard({ raffle }) {
  const soldNumbers = raffle.numerosVendidos?.length || 0;
  const totalNumbers = raffle.numerosTotales || 100;
  const availableNumbers = totalNumbers - soldNumbers;
  const soldPercentage = Math.round((soldNumbers / totalNumbers) * 100);

  const handleBuyNumber = () => {
    addToCart({
      id: 1000 + raffle.id,
      name: `Rifa: ${raffle.premio}`,
      price: raffle.precioNumero,
      category: "rifa",
      raffleId: raffle.id,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "A confirmar";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Encabezado */}
      <div className="">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-bold mb-2">
              RIFA
            </span>
            <h3 className="text-xl font-bold">{raffle.premio}</h3>
          </div>
          <div className="text-3xl">🎟️</div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <span className="w-6">📅</span>
            <span className="ml-2">
              Sorteo: {formatDate(raffle.fechaSorteo)}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-6">💰</span>
            <span className="ml-2">
              Por número:{" "}
              <strong className="text-orange-600">
                ${raffle.precioNumero}
              </strong>
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-6">🎯</span>
            <span className="ml-2">
              Disponibles: {availableNumbers}/{totalNumbers}
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progreso</span>
            <span>{soldPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={handleBuyNumber}
          disabled={availableNumbers === 0}
          className={`
            w-full py-3 rounded-lg font-bold transition-colors
            ${
              availableNumbers === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }
          `}
        >
          {availableNumbers === 0 ? "AGOTADO" : "COMPRAR NÚMERO"}
        </button>

        {/* Stock bajo warning */}
        {availableNumbers > 0 && availableNumbers <= 10 && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-center">
            <p className="text-sm text-yellow-700 font-medium">
              ⚡ ¡Quedan solo {availableNumbers} números!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
