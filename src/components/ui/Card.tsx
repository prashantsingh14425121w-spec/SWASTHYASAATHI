/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'mint' | 'ivory' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'rounded-2xl transition-all duration-150 border border-[#E2EAE5]';

  const variantClasses = {
    default: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    mint: 'bg-[#E8F5EF] border-[#d0e8dd] shadow-none',
    ivory: 'bg-[#F8FAF8] border-[#E2EAE5] shadow-none',
    subtle: 'bg-white/80 backdrop-blur-sm border-[#E2EAE5]',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const interactiveClasses = interactive
    ? 'cursor-pointer hover:border-[#087F5B]/30 hover:shadow-[0_4px_16px_rgba(8,127,91,0.08)] active:scale-[0.99]'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
