import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
    const data = await request.formData();
    const password = data.get('password');

    // Hardcoded secure password for demo purposes
    if (password === 'admin123') {
        return new Response(null, {
            status: 302,
            headers: {
                'Location': '/admin',
                'Set-Cookie': 'auth_token=valid_token; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600'
            }
        });
    }

    return redirect('/admin/login?error=Invalid password');
};
