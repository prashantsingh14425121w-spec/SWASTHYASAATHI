/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[#17231E]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#78857E] pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full min-h-[44px] rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#17231E] transition-colors placeholder:text-[#78857E]/70 focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400 ${
            leftIcon ? 'pl-10' : ''
          } ${error ? 'border-red-400 focus:ring-red-400' : 'border-[#E2EAE5]' } ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#78857E]">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  className = '',
  id,
  rows = 3,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[#17231E]">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#17231E] transition-colors placeholder:text-[#78857E]/70 focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:border-transparent disabled:bg-slate-50 ${
          error ? 'border-red-400 focus:ring-red-400' : 'border-[#E2EAE5]'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#78857E]">{helperText}</p>
      ) : null}
    </div>
  );
};
