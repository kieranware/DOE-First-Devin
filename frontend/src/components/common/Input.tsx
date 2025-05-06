import React, { forwardRef, InputHTMLAttributes } from 'react';

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

interface InputProps extends InputBaseProps {
  label?: string;
  helperText?: string;
  error?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  colourVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'contrast';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  testId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftSection,
      rightSection,
      colourVariant = 'primary',
      size = 'md',
      radius = 'md',
      fullWidth = false,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      inputClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      testId = 'input',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    const colourVariantStyles = {
      primary: 'focus:ring-blue-500 focus:border-blue-500',
      secondary: 'focus:ring-purple-500 focus:border-purple-500',
      success: 'focus:ring-green-500 focus:border-green-500',
      danger: 'focus:ring-red-500 focus:border-red-500',
      contrast: 'focus:ring-teal-500 focus:border-teal-500',
    };
    
    const sizeStyles = {
      sm: 'py-1 text-xs',
      md: 'py-2 text-sm',
      lg: 'py-3 text-base',
    };
    
    const radiusStyles = {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };
    
    const widthStyles = fullWidth ? 'w-full' : '';
    
    const errorStyles = error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2';
    
    const paddingLeftStyles = leftSection ? 'pl-10' : 'pl-3';
    const paddingRightStyles = rightSection ? 'pr-10' : 'pr-3';
    
    return (
      <div className={`${widthStyles} ${className}`} data-testid={testId}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className={`relative ${wrapperClassName}`}>
          {leftSection && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftSection}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              ${paddingLeftStyles} ${paddingRightStyles} ${sizeStyles[size]} ${radiusStyles[radius]} 
              ${colourVariantStyles[colourVariant]} ${errorStyles} ${widthStyles}
              bg-white border shadow-sm transition-colors
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              ${inputClassName}
            `}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-description`
                : undefined
            }
            {...props}
          />
          {rightSection && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightSection}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p
            id={`${inputId}-description`}
            className={`mt-1 text-sm text-gray-500 ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={`${inputId}-error`}
            className={`mt-1 text-sm text-red-600 ${errorClassName}`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
