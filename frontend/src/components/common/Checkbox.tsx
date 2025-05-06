import React, { forwardRef, InputHTMLAttributes } from 'react';

type CheckboxBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

interface CheckboxProps extends CheckboxBaseProps {
  label?: string;
  helperText?: string;
  error?: string;
  colourVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'contrast';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  testId?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error,
      colourVariant = 'primary',
      size = 'md',
      indeterminate = false,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      checkboxClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      testId = 'checkbox',
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    
    const colourVariantStyles = {
      primary: 'text-blue-600 focus:ring-blue-500',
      secondary: 'text-purple-600 focus:ring-purple-500',
      success: 'text-green-600 focus:ring-green-500',
      danger: 'text-red-600 focus:ring-red-500',
      contrast: 'text-teal-600 focus:ring-teal-500',
    };
    
    const sizeStyles = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };
    
    const labelSizeStyles = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };
    
    const errorStyles = error ? 'border-red-300' : 'border-gray-300';
    
    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);
    
    return (
      <div className={`${className}`} data-testid={testId}>
        <div className={`flex items-start ${wrapperClassName}`}>
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={`
                ${sizeStyles[size]} ${colourVariantStyles[colourVariant]} ${errorStyles}
                rounded focus:ring-2 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
                ${checkboxClassName}
              `}
              aria-invalid={!!error}
              aria-describedby={
                error
                  ? `${checkboxId}-error`
                  : helperText
                  ? `${checkboxId}-description`
                  : undefined
              }
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className={`ml-2 ${labelSizeStyles[size]} font-medium text-gray-700 ${labelClassName}`}
            >
              {label}
            </label>
          )}
        </div>
        {helperText && !error && (
          <p
            id={`${checkboxId}-description`}
            className={`mt-1 ${labelSizeStyles[size]} text-gray-500 ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={`${checkboxId}-error`}
            className={`mt-1 ${labelSizeStyles[size]} text-red-600 ${errorClassName}`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
