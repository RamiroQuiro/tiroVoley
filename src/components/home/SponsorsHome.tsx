import React from 'react';

export default function SponsorsHome() {
  const sponsors = [
    {
      id: 1,
      name: 'Panadería "El Horno"',
      bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop', // Bakery
    },
    {
      id: 2,
      name: 'Ferretería "La Tuerca"',
      bgImage: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=400&auto=format&fit=crop', // Tools
    },
    {
      id: 3,
      name: 'Supermercado "El Barrio"',
      bgImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop', // Supermarket
    },
    {
      id: 4,
      name: 'Transportes "Veloz"',
      bgImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=400&auto=format&fit=crop', // Truck
    },
    {
      id: 5,
      name: 'Farmacia "Salud"',
      bgImage: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=400&auto=format&fit=crop', // Pharmacy
    },
    {
      id: 6,
      name: 'Gimnasio "Fuerza"',
      bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop', // Gym
    }
  ];

  // Duplicate the array to create a seamless infinite scroll effect (2 sets for 50% translation)
  const carouselSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-16 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-widest">
          Nuestras marcas amigas
        </h3>
        <p className="text-gray-500 mt-2">Gracias por confiar en nosotros</p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-fit gap-6 animate-marquee hover:[animation-play-state:paused]">
          {carouselSponsors.map((sponsor, index) => (
            <div 
              key={`${sponsor.id}-${index}`} 
              className="flex-shrink-0 w-64 h-40"
            >
               <div className="group relative w-full h-full rounded-xl overflow-hidden shadow-md cursor-pointer">
                  {/* Background Image with Blur */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 blur-[2px]"
                    style={{ backgroundImage: `url(${sponsor.bgImage})` }}
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />

                  {/* Content (Centered Name) */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                    <h4 className="text-white text-xl font-bold text-center drop-shadow-md tracking-tight group-hover:scale-105 transition-transform duration-300">
                      {sponsor.name}
                    </h4>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 text-center">
          <p className="text-gray-500 text-sm">
              ¿Querés sumar tu marca? <a href="#" className="font-bold text-brand-blue hover:underline">Contactanos</a>
          </p>
      </div>
    </section>
  );
}
