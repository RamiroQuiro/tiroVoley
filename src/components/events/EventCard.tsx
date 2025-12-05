import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface Event {
    id: number;
    titulo: string;
    fecha: string;
    lugar: string | null;
    precio: number | null;
    cuposDisponibles: number;
    descripcion: string | null;
}

export function EventCard({ event }: { event: Event }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        // Mock registration logic
        alert(`Inscripción exitosa para ${name} en el evento ${event.titulo}`);
        setIsModalOpen(false);
    };

    return (
        <>
            <Card className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="bg-brand-blue/10 p-6 flex flex-col items-center justify-center md:w-48 text-center shrink-0">
                    <span className="text-4xl mb-2">📅</span>
                    <span className="font-bold text-gray-800">{new Date(event.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</span>
                    <span className="text-sm text-gray-500">{new Date(event.fecha).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs</span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{event.titulo}</h3>
                        {event.precio && event.precio > 0 ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                ${event.precio}
                            </span>
                        ) : (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                                Gratis
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 mb-4 flex-grow">{event.descripcion}</p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>📍 {event.lugar}</span>
                            <span className="mx-2">|</span>
                            <span>👥 {event.cuposDisponibles} cupos</span>
                        </div>

                        <Button onClick={() => setIsModalOpen(true)} disabled={event.cuposDisponibles <= 0}>
                            {event.cuposDisponibles > 0 ? 'Inscribirse' : 'Agotado'}
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Inscripción: ${event.titulo}`}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                        />
                    </div>
                    {event.precio && event.precio > 0 && (
                        <p className="text-sm text-brand-orange font-medium bg-orange-50 p-2 rounded">
                            ⚠️ Este evento tiene un costo de ${event.precio}. El pago se coordina luego de la inscripción.
                        </p>
                    )}
                    <Button fullWidth onClick={handleRegister} disabled={!name || !email}>
                        Confirmar Inscripción
                    </Button>
                </div>
            </Modal>
        </>
    );
}
