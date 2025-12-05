import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const jugadores = sqliteTable('jugadores', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nombre: text('nombre').notNull(),
    posicion: text('posicion').notNull(),
    fotoURL: text('foto_url'),
    metaPersonal: integer('meta_personal').default(0),
    recaudado: integer('recaudado').default(0),
    historia: text('historia'),
    destacado: integer('destacado', { mode: 'boolean' }).default(false),
    genero: text('genero').default('Masculino'), // 'Masculino' | 'Femenino'
});

export const donaciones = sqliteTable('donaciones', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    fecha: text('fecha').notNull(), // ISO string
    monto: integer('monto').notNull(),
    donante: text('donante').notNull(),
    email: text('email'),
    jugadorId: integer('jugador_id').references(() => jugadores.id),
    metodo: text('metodo'), // 'mercadopago', 'transferencia', 'efectivo'
    estado: text('estado').default('pending'), // 'pending', 'approved', 'rejected'
});

export const productos = sqliteTable('productos', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nombre: text('nombre').notNull(),
    descripcion: text('descripcion'),
    precio: integer('precio').notNull(),
    stock: integer('stock').notNull().default(0),
    imagen: text('imagen'),
    categoria: text('categoria'),
});

export const eventos = sqliteTable('eventos', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    titulo: text('titulo').notNull(),
    fecha: text('fecha').notNull(),
    lugar: text('lugar'),
    precio: integer('precio').default(0),
    cuposDisponibles: integer('cupos_disponibles').notNull(),
    descripcion: text('descripcion'),
});

export const rifas = sqliteTable('rifas', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    premio: text('premio').notNull(),
    precioNumero: integer('precio_numero').notNull(),
    numerosTotales: integer('numeros_totales').notNull(),
    numerosVendidos: text('numeros_vendidos', { mode: 'json' }).$type<number[]>().default([]),
    fechaSorteo: text('fecha_sorteo'),
});

export const config = sqliteTable('config', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    metaTotal: integer('meta_total').default(0),
    recaudadoTotal: integer('recaudado_total').default(0),
    fechaLimite: text('fecha_limite'),
    activo: integer('activo', { mode: 'boolean' }).default(true),
});
