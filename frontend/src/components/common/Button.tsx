import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colourVariant?: 'contrast' | 'primary' | 'secondary' | 'danger' | 'success';
  variant?: 'filled' | 'outline' | 'subtle' | 'link' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full';
  compactVersion?: 'normal' | 'compact';
  fullWidth?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  justify?: 'center' | 'start' | 'end';
  testId?: string;
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

function Button({
  colourVariant = 'contrast',
  variant = 'filled',
  size = 'md',
  radius = 'sm',
  compactVersion = 'normal',
  fullWidth = false,
  leftSection,
  rightSection,
  justify = 'center',
  testId,
  children,
  className = '',
  as,
  href,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const colourVariantStyles = {
    contrast: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  };
  
  const variantStyles = {
    filled: colourVariantStyles[colourVariant],
    outline: `border border-current text-${colourVariant === 'contrast' ? 'teal' : colourVariant}-600 hover:bg-${colourVariant === 'contrast' ? 'teal' : colourVariant}-50 focus:ring-${colourVariant === 'contrast' ? 'teal' : colourVariant}-500 bg-transparent`,
    subtle: `text-${colourVariant === 'contrast' ? 'teal' : colourVariant}-600 hover:bg-${colourVariant === 'contrast' ? 'teal' : colourVariant}-50 focus:ring-${colourVariant === 'contrast' ? 'teal' : colourVariant}-500 bg-transparent`,
    link: `text-${colourVariant === 'contrast' ? 'teal' : colourVariant}-600 underline-offset-4 hover:underline focus:ring-${colourVariant === 'contrast' ? 'teal' : colourVariant}-500 bg-transparent`,
    primary: colourVariantStyles['primary'],
    secondary: colourVariantStyles['secondary']
  };
  
  const sizeStyles = {
    sm: compactVersion === 'compact' ? 'text-xs px-2 py-1' : 'text-xs px-2.5 py-1.5',
    md: compactVersion === 'compact' ? 'text-sm px-3 py-1.5' : 'text-sm px-4 py-2',
    lg: compactVersion === 'compact' ? 'text-base px-4 py-2' : 'text-base px-6 py-3'
  };
  
  const radiusStyles = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  
  const justifyStyles = {
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${radiusStyles[radius]} ${justifyStyles[justify]} ${widthStyles} ${className}`;
  
  const content = (
    <>
      {leftSection && <span className="mr-2">{leftSection}</span>}
      {children}
      {rightSection && <span className="ml-2">{rightSection}</span>}
    </>
  );
  
  if (as === 'a') {
    return (
      <a 
        href={href} 
        className={combinedClassName} 
        data-testid={testId}
        {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={combinedClassName} 
      data-testid={testId}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
