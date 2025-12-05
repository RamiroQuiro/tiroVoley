import React, { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Apadrinar', href: '/apadrinar' },
        { name: 'Tienda', href: '/tienda' },
        { name: 'Eventos', href: '/eventos' },
        { name: 'Nosotros', href: '/nosotros' },
    ];

    return (
        <header className="bg-brand-orange/20 backdrop-blur sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                            TF
                        </div>
                        <span className="font-bold text-xl text-brand-dark tracking-tight">
                            Tiro Federal
                        </span>
                        <span className="font-bold text-sm text-brand-dark tracking-tight">
                            La Banda a Jujuy
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-brand-blue font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-brand-dark"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-600 hover:text-brand-blue font-medium px-2 py-1 rounded-md hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
