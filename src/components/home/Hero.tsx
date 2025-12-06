import React, { useEffect, useState } from "react";
import { ProgressBar } from "../common/ProgressBar";
import { Button } from "../common/Button";

interface HeroProps {
  totalRaised: number;
  goal: number;
}

export default function Hero({ totalRaised, goal }: HeroProps) {
  const [animatedRaised, setAnimatedRaised] = useState(0);

  useEffect(() => {
    // Determine the step increment based on the totalRaised
    // If totalRaised is small, step by 1 is fine.
    // If it's large (e.g. 150000), we want to complete in ~2 seconds (120 frames at 60fps).
    // 150000 / 120 = 1250 per frame.
    const steps = 60;
    const increment = Math.ceil(totalRaised / steps);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalRaised) {
        setAnimatedRaised(totalRaised);
        clearInterval(timer);
      } else {
        setAnimatedRaised(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [totalRaised]);

  const percentage = Math.min(Math.round((animatedRaised / goal) * 100), 100);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] md:min-h-[700px] md:h-screen text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2000&auto=format&fit=crop"
          alt="Equipo de Voley"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-32 relative z-10 text-white text-center flex flex-col justify-center h-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight animate-fade-in">
          ¡Nos Vamos a Jujuy!{" "}
          <span className="text-brand-orange block sm:inline">• 2025 •</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto animate-slide-up px-4">
          Ayudanos a llevar al equipo de vóley juvenil a su próximo gran
          desafío. Cada aporte nos acerca más a la meta.
        </p>

        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-2xl animate-slide-up">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-4 gap-2">
            <div className="text-center md:text-left w-full md:w-auto">
              <span className="block text-gray-300 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                Recaudado
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                ${new Intl.NumberFormat("es-AR").format(animatedRaised)}
              </span>
            </div>
          </div>

          <ProgressBar
            current={animatedRaised}
            total={goal}
            size="lg"
            showPercentage={false}
            className="mb-6"
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-brand-orange/20"
              onClick={() => (window.location.href = "/apadrinar")}
            >
              Apadrinar Jugador
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-dark"
              onClick={() => (window.location.href = "/tienda")}
            >
              Ver Tienda
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
