import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useInstance } from '../../context/InstanceContext';
import { Building } from 'lucide-react';

interface InstanceBadgeProps {
  instanceId?: string;
  showLabel?: boolean;
  className?: string;
  colourVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
  onClick?: () => void;
}

const InstanceBadge: React.FC<InstanceBadgeProps> = ({ 
  instanceId, 
  showLabel = true,
  className = '',
  colourVariant = 'primary',
  size = 'sm',
  testId = 'instance-badge',
  onClick
}) => {
  const { t } = useTranslation();
  const { state: authState } = useAuth();
  const { state: instanceState } = useInstance();
  
  if (!instanceState.isMultiInstance) {
    return null;
  }
  
  const currentInstanceId = instanceId || authState.activeInstance;
  
  if (!currentInstanceId) {
    return null;
  }
  
  const instanceLabel = t(`navigation.${currentInstanceId}Instance`, { defaultValue: currentInstanceId });
  
  const colourVariantStyles = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    secondary: 'bg-purple-50 text-purple-700 border-purple-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    info: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  const baseStyles = 'inline-flex items-center rounded-full border font-medium transition-colors';
  const cursorStyles = onClick ? 'cursor-pointer hover:bg-opacity-80' : '';
  
  return (
    <div 
      className={`${baseStyles} ${colourVariantStyles[colourVariant]} ${sizeStyles[size]} ${cursorStyles} ${className}`}
      data-testid={testId}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <Building size={size === 'lg' ? 16 : 12} className="mr-1" />
      {showLabel && instanceLabel}
    </div>
  );
};

export default InstanceBadge;
