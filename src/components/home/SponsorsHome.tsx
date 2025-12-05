import React from "react";

export default function SponsorsHome() {
  const sponsors = [
    {
      id: 1,
      name: 'Panadería "El Horno"',
      bgImage:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop", // Bakery
    },
    {
      id: 2,
      name: 'Ferretería "La Tuerca"',
      bgImage:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=400&auto=format&fit=crop", // Tools
    },
    {
      id: 3,
      name: 'Supermercado "El Barrio"',
      bgImage:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop", // Supermarket
    },
    {
      id: 4,
      name: 'Transportes "Veloz"',
      bgImage:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=400&auto=format&fit=crop", // Truck
    },
    {
      id: 5,
      name: 'Farmacia "Salud"',
      bgImage:
        "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=400&auto=format&fit=crop", // Pharmacy
    },
    {
      id: 6,
      name: 'Gimnasio "Fuerza"',
      bgImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop", // Gym
    },
  ];

  // Duplicate the array to create a seamless infinite scroll effect (2 sets for 50% translation)
  const carouselSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 mb-12 text-center">
        <div className="inline-block px-6 py-2 bg-brand-blue/10 rounded-full mb-4">
          <span className="text-brand-blue font-semibold uppercase text-sm tracking-wider">
            Aliados Comerciales
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
          Comercios que nos apoyan
        </h3>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Estas marcas acompañan al deporte de los jóvenes
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        {/* First Carousel (Slow) */}
        <div className="mb-8">
          <div className="flex w-fit gap-8 animate-marquee-slow">
            {carouselSponsors.map((sponsor, index) => (
              <div
                key={`slow-${sponsor.id}-${index}`}
                className="flex-shrink-0 w-72 md:w-80 h-44"
              >
                <div className="group relative w-full h-full rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${sponsor.bgImage})` }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-10">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        Sponsor Oficial
                      </span>
                    </div>
                    <h4 className="text-white text-xl font-bold text-center drop-shadow-lg">
                      {sponsor.name}
                    </h4>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <h4 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Querés que tu negocio aparezca aquí?
        </h4>
        <p className="text-gray-600 mb-6">
          Sumate como sponsor oficial y apoyá a los jóvenes deportistas de La
          Banda
        </p>
      </div>
    </section>
  );
}
