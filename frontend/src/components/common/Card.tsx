import React from 'react';

interface CardProps {
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  status?: 'New' | 'Action Needed' | 'Active' | 'Part Time';
  children: React.ReactNode;
  className?: string;
  colourVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  hasBorder?: boolean;
  hasBounce?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  href?: string;
  testId?: string;
  order?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  status,
  children,
  className = '',
  colourVariant = 'secondary',
  hasBorder = false,
  hasBounce = false,
  padding = 'md',
  href,
  testId,
  order,
}) => {
  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Action Needed': 'bg-orange-100 text-orange-800',
    'Active': 'bg-green-100 text-green-800',
    'Part Time': 'bg-blue-100 text-blue-800',
  };

  const colourVariantStyles = {
    primary: 'bg-blue-50',
    secondary: 'bg-purple-50',
    success: 'bg-green-50',
    danger: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-cyan-50',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const borderStyles = hasBorder 
    ? `border border-${colourVariant === 'secondary' ? 'purple' : colourVariant}-200` 
    : '';

  const bounceStyles = hasBounce 
    ? 'transition-transform duration-200 hover:scale-105' 
    : '';

  const cardContent = (
    <>
      {(title || icon || status) && (
        <div className="flex items-start mb-3">
          {icon && <div className="mr-3 text-gray-500">{icon}</div>}
          <div className="flex-1">
            {typeof title === 'string' ? (
              <h3 className="text-lg font-medium text-gray-900" style={order ? { order } : undefined}>
                {title}
              </h3>
            ) : (
              title
            )}
          </div>
          {status && (
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
              {status}
            </span>
          )}
        </div>
      )}
      <div>{children}</div>
    </>
  );

  const combinedClassName = `rounded-lg shadow-sm ${colourVariantStyles[colourVariant]} ${paddingStyles[padding]} ${borderStyles} ${bounceStyles} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={`block ${combinedClassName} hover:no-underline`}
        data-testid={testId}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className={combinedClassName} data-testid={testId}>
      {cardContent}
    </div>
  );
};

export default Card;
