import { useState } from "react";

import { Ticket } from "lucide-react";
import { Button } from "../common/Button";
import Input from "../Input";

const TOTAL_NUMBERS = 200;
const SOLD_NUMBERS = 78;
const RAFFLE_PRICE = 1000;

export function RaffleSection() {
  const [selectedNumbers, setSelectedNumbers] = useState(1);

  const handleBuyRaffle = () => {
    // toast({
    //   title: "Procesando compra...",
    //   description: `Vas a comprar ${selectedNumbers} número(s) de rifa. Redirigiendo a MercadoPago.`,
    // });
    // Mock MercadoPago logic
    // setTimeout(() => {
    //   toast({
    //     title: "¡Compra de rifa exitosa!",
    //     description: `¡Mucha suerte! Tus números son ...`,
    //   });
    // }, 2000);
  };

  return (
    <div id="rifas">
      <h2 className="text-2xl font-bold font-headline text-primary mb-6">
        Gran Rifa del Viaje
      </h2>
      <div className="bg-card p-6 rounded-lg  flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <Ticket className="w-24 h-24 text-accent" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold">
            ¡Participá y ganá increíbles premios!
          </h3>
          <p className="text-muted-foreground mt-2">
            Todo lo recaudado con esta rifa se destina 100% al viaje del equipo
            a Jujuy. ¡Tu ayuda puede tener premio!
          </p>
          <div className="flex items-center gap-6 mt-4">
            <div>
              <p className="text-sm font-semibold">Vendidos</p>
              <p className="text-2xl font-bold text-primary">{SOLD_NUMBERS}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">
                {TOTAL_NUMBERS - SOLD_NUMBERS}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Precio por número</p>
              <p className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                }).format(RAFFLE_PRICE)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max={TOTAL_NUMBERS - SOLD_NUMBERS}
              value={selectedNumbers}
              onChange={(e) =>
                setSelectedNumbers(parseInt(e.target.value, 10) || 1)
              }
              className="w-24 text-center"
              aria-label="Cantidad de números"
            />
            <Button
              variant="primary"
              className="w-full  wra"
              onClick={handleBuyRaffle}
            >
              Comprar Rifa(s)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
