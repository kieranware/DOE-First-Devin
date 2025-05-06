import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { mockApiRouter } from '../../services/mockApiRouter';
import Button from './Button';
import InstanceBadge from './InstanceBadge';

interface InstanceSelectorProps {
  className?: string;
  colourVariant?: 'contrast' | 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
}

const InstanceSelector: React.FC<InstanceSelectorProps> = ({
  className = '',
  colourVariant = 'primary',
  size = 'md',
  testId = 'instance-selector'
}) => {
  const { t } = useTranslation();
  const { state: authState, setActiveInstance } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [instances, setInstances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = async () => {
    if (!isOpen && instances.length === 0) {
      setIsLoading(true);
      try {
        const instanceAccess = await mockApiRouter.getMultiInstanceStatus(authState.user?.userId || '');
        setInstances(instanceAccess.filter(instance => instance.hasAccess));
      } catch (error) {
        console.error('Failed to load instances:', error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  const selectInstance = (instanceId: string) => {
    setActiveInstance(instanceId);
    setIsOpen(false);
  };

  if (!authState.user || authState.user.instances.length <= 1) {
    return null;
  }

  const activeInstanceName = instances.find(i => i.instanceId === authState.activeInstance)?.instanceName || 
    t(`navigation.${authState.activeInstance}Instance`);

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} data-testid={testId}>
      <Button
        onClick={toggleDropdown}
        colourVariant={colourVariant}
        variant="outline"
        size={size}
        radius="md"
        fullWidth
        rightSection={isLoading ? <Loader2 size={16} className="animate-spin" /> : <ChevronDown size={16} />}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {isLoading ? t('common.loading') : activeInstanceName}
      </Button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <ul
            className={`py-1 overflow-auto rounded-md max-h-60 focus:outline-none ${sizeStyles[size]}`}
            tabIndex={-1}
            role="listbox"
            aria-labelledby={testId}
          >
            {instances.map((instance) => {
              const isActive = instance.instanceId === authState.activeInstance;
              return (
                <li
                  key={instance.instanceId}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                    isActive
                      ? `bg-${colourVariant === 'secondary' ? 'purple' : colourVariant}-50 text-${colourVariant === 'secondary' ? 'purple' : colourVariant}-700`
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectInstance(instance.instanceId)}
                >
                  <div className="flex items-center">
                    <span className="block truncate font-medium">{instance.instanceName}</span>
                    {instance.isPrimary && (
                      <InstanceBadge 
                        className="ml-2" 
                        colourVariant="primary" 
                        size="sm" 
                        showLabel={false} 
                      />
                    )}
                  </div>
                  {isActive && (
                    <span className={`absolute inset-y-0 right-0 flex items-center pr-3 text-${colourVariant === 'secondary' ? 'purple' : colourVariant}-600`}>
                      <Check size={16} aria-hidden="true" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstanceSelector;
