import React, { useState, useMemo } from 'react';
import { PlayerCard } from './PlayerCard';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface Player {
  id: number;
  nombre: string;
  posicion: string;
  fotoURL: string | null;
  metaPersonal: number | null;
  recaudado: number | null;
  historia: string | null;
  destacado: boolean | null;
  genero: string | null;
}

interface PlayersGridProps {
  initialPlayers: Player[];
}

export default function PlayersGrid({ initialPlayers }: PlayersGridProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<number | ''>('');
  const [filter, setFilter] = useState<'Todos' | 'Masculino' | 'Femenino'>('Todos');

  const filteredPlayers = useMemo(() => {
    if (filter === 'Todos') return initialPlayers;
    return initialPlayers.filter(p => p.genero === filter);
  }, [initialPlayers, filter]);

  const handleDonateClick = (player: Player) => {
    setSelectedPlayer(player);
    setAmount('');
    setIsModalOpen(true);
  };

  const handleDonation = async () => {
    if (!amount || Number(amount) <= 0) return;

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: [{
                    title: `Donación para ${selectedPlayer?.nombre}`,
                    quantity: 1,
                    unit_price: Number(amount)
                }],
                player_id: selectedPlayer?.id,
                donor_info: { name: 'Donante', email: 'test@example.com' }
            })
        });
        
        const data = await response.json();
        
        if (data.mock) {
            alert(`SIMULACIÓN: Redirigiendo a MercadoPago por $${amount}...\n(Preferencia ID: ${data.preferenceId})`);
        } else {
            window.location.href = data.initPoint;
        }
        
        setIsModalOpen(false);

    } catch (error) {
        alert('Error al procesar la donación');
    }
  };

  const predefinedAmounts = [2000, 5000, 10000];

  return (
    <>
      {/* Filters */}
      <div className="flex justify-center mb-8 gap-2">
        {(['Todos', 'Masculino', 'Femenino'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer font-semibold transition-all ${
              filter === f 
                ? 'bg-brand-orange text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPlayers.map((player) => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            onDonate={handleDonateClick} 
          />
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
         <div className="text-center py-12 text-gray-500">
           No hay jugadores en esta categoría todavía.
         </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPlayer ? `Apadrinar a ${selectedPlayer.nombre}` : 'Realizar Donación'}
      >
        <div className="space-y-6">
           <p className="text-gray-600">
             Tu aporte ayuda directamente a cubrir los costos del viaje y estadía.
           </p>

           <div className="grid grid-cols-3 gap-3">
             {predefinedAmounts.map((amt) => (
               <button
                 key={amt}
                 onClick={() => setAmount(amt)}
                 className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                   amount === amt 
                     ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' 
                     : 'border-gray-200 hover:border-brand-blue/50'
                 }`}
               >
                 ${amt.toLocaleString()}
               </button>
             ))}
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Otro monto
             </label>
             <div className="relative rounded-md shadow-sm">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <span className="text-gray-500 sm:text-sm">$</span>
               </div>
               <input
                 type="number"
                 name="amount"
                 id="amount"
                 className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-brand-blue focus:ring-brand-blue sm:text-sm py-2 border"
                 placeholder="0.00"
                 value={amount}
                 onChange={(e) => setAmount(Number(e.target.value))}
               />
             </div>
           </div>

           <Button fullWidth onClick={handleDonation} disabled={!amount || Number(amount) <= 0}>
             Ir a Pagar (MercadoPago)
           </Button>
           
           <p className="text-xs text-center text-gray-400 mt-2">
             Pagos procesados de forma segura con MercadoPago.
           </p>
        </div>
      </Modal>
    </>
  );
}
