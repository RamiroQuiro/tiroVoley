import { db } from './index';
import { jugadores, donaciones, config, eventos, productos, rifas } from './schema';

async function seed() {
  console.log('Seeding database with 12 players (Gender separated)...');

  // Hardcoded real-looking placeholder images
  const players = [
    // MASCULINO
    {
      nombre: 'Lucas Gonzalez',
      posicion: 'Armador',
      fotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 120000,
      historia: 'Juego al vóley desde los 8 años. Mi sueño es llegar a la selección.',
      destacado: true,
      genero: 'Masculino'
    },
    {
      nombre: 'Matías Fernandez',
      posicion: 'Punta',
      fotoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 45000,
      historia: 'Entreno todos los días para mejorar. ¡Ayudame a viajar!',
      destacado: true,
      genero: 'Masculino'
    },
    {
      nombre: 'Joaquín Silva',
      posicion: 'Central',
      fotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 10000,
      historia: 'El bloqueo es mi especialidad. Quiero demostrarlo en Jujuy.',
      destacado: false,
      genero: 'Masculino'
    },
    {
      nombre: 'Santiago Lopez',
      posicion: 'Libero',
      fotoURL: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 0,
      historia: 'La defensa gana campeonatos. Necesito tu apoyo para el viaje.',
      destacado: false,
      genero: 'Masculino'
    },
    {
      nombre: 'Ramiro Torres',
      posicion: 'Opuesto',
      fotoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 150000,
      historia: 'Soy el que cierra los puntos. ¡Ayudame a cerrar mi pasaje!',
      destacado: true,
      genero: 'Masculino'
    },
    {
      nombre: 'Facundo Ruiz',
      posicion: 'Punta',
      fotoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 25000,
      historia: 'Cada entrenamiento cuenta, cada donación suma.',
      destacado: false,
      genero: 'Masculino'
    },
    
    // FEMENINO
    {
      nombre: 'Sofía Martinez',
      posicion: 'Armadora',
      fotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 90000,
      historia: 'Llevo la cinta de capitana con orgullo. ¡Ayudanos a viajar!',
      destacado: true,
      genero: 'Femenino'
    },
    {
      nombre: 'Valentina Lopez',
      posicion: 'Punta',
      fotoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 30000,
      historia: 'El vóley es mi pasión. Jujuy es mi sueño.',
      destacado: true,
      genero: 'Femenino'
    },
    {
      nombre: 'Camila Rodriguez',
      posicion: 'Central',
      fotoURL: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 15000,
      historia: 'Entrenamos duro todo el año para este torneo.',
      destacado: false,
      genero: 'Femenino'
    },
    {
      nombre: 'Martina Garcia',
      posicion: 'Libero',
      fotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 60000,
      historia: 'Nada pasa por mi defensa. ¡Sumate al equipo!',
      destacado: false,
      genero: 'Femenino'
    },
    {
      nombre: 'Lucia Diaz',
      posicion: 'Opuesta',
      fotoURL: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 180000,
      historia: 'Falta poco para la meta. ¿Me ayudás?',
      destacado: true,
      genero: 'Femenino'
    },
    {
      nombre: 'Julieta Perez',
      posicion: 'Punta',
      fotoURL: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      metaPersonal: 200000,
      recaudado: 40000,
      historia: 'Unida al equipo, unida al sueño.',
      destacado: false,
      genero: 'Femenino'
    },
  ];

  await db.insert(jugadores).values(players);

  console.log('Seed completed!');
}

seed();
