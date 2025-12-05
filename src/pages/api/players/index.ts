import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { jugadores } from '../../../db/schema';

export const GET: APIRoute = async () => {
    const players = await db.select().from(jugadores);
    return new Response(JSON.stringify(players), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    await db.insert(jugadores).values(body);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
};
