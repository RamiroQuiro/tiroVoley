import React from "react";
import { Card } from "../common/Card";

const actions = [
  {
    title: "Apadrinar",
    description: "Elegí un jugador y ayudalo a cumplir su meta personal.",
    icon: "🤝",
    link: "/apadrinar",
    color: "bg-blue-50 text-brand-blue",
  },
  {
    title: "Tienda",
    description: "Comprá remeras, gorras y accesorios del equipo.",
    icon: "🛒",
    link: "/tienda",
    color: "bg-orange-50 text-brand-orange",
  },
  {
    title: "Eventos",
    description: "Participá de nuestros torneos y cenas a beneficio.",
    icon: "📅",
    link: "/eventos",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Rifas",
    description: "Comprá números y ganá increíbles premios.",
    icon: "🎟️",
    link: "/rifas",
    color: "bg-green-50 text-green-600",
  },
];

export default function ActionCards() {
  return (
    <section className="py-16 md:py-24  px-48 mx-auto">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg font-bold max-w-2xl mx-auto">
          Tu apoyo es fundamental. Elegí la forma que más te guste para ser
          parte de nuestro sueño.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => (
          <Card
            key={action.title}
            hoverEffect
            className="p-4 text-center  shadow-md hover:shadow-xl transition duration-300"
            onClick={() => (window.location.href = action.link)}
          >
            <h3 className="text-xl text-brand-blue font-bold mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {action.description}
            </p>
            <span className="text-brand-blue font-medium text-sm flex items-center justify-center gap-1 group">
              Ver más
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}
