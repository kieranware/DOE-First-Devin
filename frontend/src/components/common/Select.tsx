import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectBaseProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

interface SelectProps extends SelectBaseProps {
  label?: string;
  helperText?: string;
  error?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  leftSection?: React.ReactNode;
  colourVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'contrast';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  testId?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      leftSection,
      colourVariant = 'primary',
      size = 'md',
      radius = 'md',
      fullWidth = false,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      selectClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      testId = 'select',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
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
    };
    
    const widthStyles = fullWidth ? 'w-full' : '';
    
    const errorStyles = error
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2';
    
    const paddingLeftStyles = leftSection ? 'pl-10' : 'pl-3';
    
    return (
      <div className={`${widthStyles} ${className}`} data-testid={testId}>
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            ref={ref}
            id={selectId}
            className={`
              ${paddingLeftStyles} pr-10 ${sizeStyles[size]} ${radiusStyles[radius]} 
              ${colourVariantStyles[colourVariant]} ${errorStyles} ${widthStyles}
              bg-white border shadow-sm appearance-none transition-colors
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              ${selectClassName}
            `}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-description`
                : undefined
            }
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        {helperText && !error && (
          <p
            id={`${selectId}-description`}
            className={`mt-1 text-sm text-gray-500 ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={`${selectId}-error`}
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

Select.displayName = 'Select';

export default Select;
