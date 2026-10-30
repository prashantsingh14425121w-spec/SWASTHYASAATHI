/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F5B] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl min-h-[44px] gap-2',
    lg: 'text-base px-5 py-3 rounded-xl min-h-[48px] gap-2.5 font-semibold',
    icon: 'p-2.5 rounded-xl min-w-[44px] min-h-[44px]',
  };

  const variantClasses = {
    primary:
      'bg-[#087F5B] hover:bg-[#075C45] text-white shadow-sm hover:shadow',
    secondary:
      'bg-[#E8F5EF] hover:bg-[#d6ede2] text-[#075C45] font-semibold',
    outline:
      'border border-[#E2EAE5] bg-white hover:bg-[#F8FAF8] text-[#17231E]',
    ghost:
      'hover:bg-[#E8F5EF]/60 text-[#17231E]',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children && <span className="whitespace-nowrap">{children}</span>}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
