import type { APIRoute } from 'astro';
import { mercadoPagoService } from '../../../services/mercadopago';
import { db } from '../../../db';
import { donaciones } from '../../../db/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { items, player_id, donor_info } = data;

    // 1. Create a pending donation record
    const result = await db.insert(donaciones).values({
      fecha: new Date().toISOString(),
      monto: items.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0),
      donante: donor_info.name || 'Anónimo',
      email: donor_info.email,
      jugadorId: player_id || null,
      metodo: 'mercadopago',
      estado: 'pending' // pending until webhook confirms
    }).returning();

    const donationId = result[0].id;

    // 2. Create MP Preference
    const preference = await mercadoPagoService.createPreference(items, String(donationId));

    return new Response(JSON.stringify({ 
      preferenceId: preference.id,
      initPoint: preference.init_point,
      mock: true // Flag to tell frontend this is a mock
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
