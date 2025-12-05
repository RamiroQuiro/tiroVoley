import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
    current: number;
    total: number;
    label?: string;
    showPercentage?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ProgressBar({
    current,
    total,
    label,
    showPercentage = true,
    size = 'md',
    className
}: ProgressBarProps) {
    const percentage = Math.min(Math.round((current / total) * 100), 100);

    const heights = {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
    };

    return (
        <div className={twMerge('w-full', className)}>
            {(label || showPercentage) && (
                <div className="flex justify-between mb-1 text-sm font-medium">
                    {label && <span className="text-brand-dark">{label}</span>}
                    {showPercentage && <span className="text-brand-blue">{percentage}%</span>}
                </div>
            )}
            <div className={twMerge('w-full bg-gray-200 rounded-full overflow-hidden', heights[size])}>
                <div
                    className="bg-brand-orange h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                >
                    {size === 'lg' && percentage > 10 && (
                        <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 bottom-0 right-0 animate-pulse bg-white/20"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
