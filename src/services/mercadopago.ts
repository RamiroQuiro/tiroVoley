export const mercadoPagoService = {
  createPreference: async (items: any[], externalReference: string) => {
    // Check for keys (would be process.env.MP_ACCESS_TOKEN)
    const hasKeys = false; // Hardcoded for now as user said no keys yet

    if (!hasKeys) {
      console.warn('MercadoPago keys not found. returning mock preference.');
      return {
        id: 'mock_preference_id_' + Date.now(),
        init_point: '#', // In a real scenario this url redirects to MP
        sandbox_init_point: '#'
      };
    }

    // Placeholder for real implementation
    console.warn('Real implementation not yet ready.');
    return { id: 'mock', init_point: '#', sandbox_init_point: '#' };
  }
};
