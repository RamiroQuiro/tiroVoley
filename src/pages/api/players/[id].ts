import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { jugadores } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const PUT: APIRoute = async ({ params, request }) => {
    const id = Number(params.id);
    if (!id) return new Response(null, { status: 400 });

    const body = await request.json();
    await db.update(jugadores).set(body).where(eq(jugadores.id, id));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ params }) => {
    const id = Number(params.id);
    if (!id) return new Response(null, { status: 400 });

    await db.delete(jugadores).where(eq(jugadores.id, id));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};
