import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
        primary: 'bg-brand-orange text-white hover:bg-orange-700 focus:ring-brand-orange',
        secondary: 'bg-brand-blue text-white hover:bg-blue-700 focus:ring-brand-blue',
        outline: 'border-2 border-brand-orange text-brand-orange hover:bg-orange-50 focus:ring-brand-orange',
        ghost: 'text-gray-600 hover:text-brand-dark hover:bg-gray-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={twMerge(
                clsx(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )
            )}
            {...props}
        >
            {children}
        </button>
    );
}
