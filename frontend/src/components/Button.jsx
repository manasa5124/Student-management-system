import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Button Component
 * 
 * REACT CONCEPT: Props & Reusability
 * By passing props like 'variant', 'size', and 'children', we can use the same
 * component for different UI needs without duplicating code.
 */
const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-[0_4px_14px_0_rgba(124,58,237,0.39)]',
    secondary: 'bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 hover:bg-white hover:border-primary-300',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-[0_4px_14px_0_rgba(244,63,94,0.39)]',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-10 py-4 text-lg font-bold tracking-wide',
  };

  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center rounded-2xl transition-all duration-300 btn-hover-effect font-semibold disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
