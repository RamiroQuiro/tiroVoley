import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
}

export function Card({ children, className, onClick, hoverEffect = false }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
                hoverEffect && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
}
