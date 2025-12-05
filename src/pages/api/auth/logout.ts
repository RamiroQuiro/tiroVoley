import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ redirect }) => {
    return new Response(null, {
        status: 302,
        headers: {
            'Location': '/admin/login',
            'Set-Cookie': 'auth_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
        }
    });
};
