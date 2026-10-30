/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Sheet on mobile, centered card on desktop */}
      <div
        className={`relative z-10 w-full ${maxWidthClasses[maxWidth]} bg-white rounded-t-3xl sm:rounded-2xl shadow-xl border border-[#E2EAE5] max-h-[90vh] flex flex-col overflow-hidden animate-slide-up sm:animate-scale-in`}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile drag handle indicator */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-2.5 sm:hidden" />

        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2EAE5]">
          <div>
            {title && <h3 className="text-base sm:text-lg font-bold text-[#17231E]">{title}</h3>}
            {description && <p className="text-xs text-[#78857E] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#78857E] hover:text-[#17231E] hover:bg-[#E8F5EF]/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
