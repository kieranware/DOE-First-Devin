import React from 'react';

interface DividerProps {
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  thickness?: 'xs' | 'sm' | 'md' | 'lg';
  colourVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'contrast' | 'default';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  testId?: string;
}

const Divider: React.FC<DividerProps> = ({
  margin = 'md',
  thickness = 'sm',
  colourVariant = 'default',
  orientation = 'horizontal',
  className = '',
  testId = 'divider',
}) => {
  const marginStyles = {
    none: '',
    xs: orientation === 'horizontal' ? 'my-1' : 'mx-1',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
  };

  const thicknessStyles = {
    xs: orientation === 'horizontal' ? 'h-px' : 'w-px',
    sm: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
    md: orientation === 'horizontal' ? 'h-1' : 'w-1',
    lg: orientation === 'horizontal' ? 'h-2' : 'w-2',
  };

  const colourStyles = {
    primary: 'bg-blue-200',
    secondary: 'bg-purple-200',
    success: 'bg-green-200',
    danger: 'bg-red-200',
    contrast: 'bg-teal-200',
    default: 'bg-gray-200',
  };

  const orientationStyles = {
    horizontal: 'w-full',
    vertical: 'h-full',
  };

  return (
    <div
      className={`${marginStyles[margin]} ${thicknessStyles[thickness]} ${colourStyles[colourVariant]} ${orientationStyles[orientation]} ${className}`}
      role="separator"
      aria-orientation={orientation}
      data-testid={testId}
    />
  );
};

export default Divider;
