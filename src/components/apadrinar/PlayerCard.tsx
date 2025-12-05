import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

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

interface PlayerCardProps {
  player: Player;
  onDonate: (player: Player) => void;
}

export function PlayerCard({ player, onDonate }: PlayerCardProps) {
  const current = player.recaudado ?? 0;
  const total = player.metaPersonal ?? 1;

  return (
    <Card className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none shadow-sm overflow-hidden">
      {/* Imagen: Reduced height (aspect ratio) for compactness */}
      <div className="relative h-64 overflow-hidden bg-gray-100 group">
        <img
          src={player.fotoURL || `https://ui-avatars.com/api/?name=${player.nombre}&background=random`}
          alt={player.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
   
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
          <p className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-0.5">{player.genero} • {player.posicion}</p>
          <h3 className="text-white text-lg font-bold leading-tight">{player.nombre}</h3>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="mb-4 flex-grow">
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            "{player.historia || 'Ayudame a cumplir mi sueño de viajar.'}"
          </p>
        </div>

        <div className="mt-auto space-y-3">
          
           <Button size="sm" fullWidth onClick={() => onDonate(player)} className="shadow-brand-blue/20 shadow-lg font-semibold tracking-wide">
             Apadrinar
           </Button>
        </div>
      </div>
    </Card>
  );
}
