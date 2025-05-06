import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Conflict } from '../../types';
import { AlertCircle } from 'lucide-react';
import Button from '../common/Button';

interface ConflictResolutionProps {
  conflicts: Conflict[];
  onResolve: (resolutions: Conflict[]) => void;
}

const ConflictResolution: React.FC<ConflictResolutionProps> = ({ 
  conflicts, 
  onResolve 
}) => {
  const { t } = useTranslation();
  const [resolutions, setResolutions] = useState<Conflict[]>(conflicts.map(conflict => ({
    ...conflict,
    newValue: conflict.currentValue // Default to keeping current value
  })));

  const handleResolutionChange = (index: number, useNewValue: boolean) => {
    const updatedResolutions = [...resolutions];
    updatedResolutions[index] = {
      ...updatedResolutions[index],
      newValue: useNewValue ? conflicts[index].newValue : conflicts[index].currentValue
    };
    setResolutions(updatedResolutions);
  };

  const handleResolve = () => {
    onResolve(resolutions);
  };

  const getFieldLabel = (field: string) => {
    const fieldParts = field.split('.');
    if (fieldParts.length > 1) {
      return t(`personalInfo.${fieldParts[0]}.${fieldParts[1]}`, { defaultValue: field });
    }
    return t(`personalInfo.${field}`, { defaultValue: field });
  };

  const getInstanceLabel = (instanceId: string) => {
    return t(`navigation.${instanceId}Instance`, { defaultValue: instanceId });
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
        <h3 className="text-lg font-medium text-yellow-800">
          {t('personalInfo.conflictsDetected')}
        </h3>
      </div>
      
      <p className="text-sm text-yellow-700 mb-4">
        {t('personalInfo.conflictsExplanation')}
      </p>
      
      <div className="space-y-4">
        {conflicts.map((conflict, index) => (
          <div key={`${conflict.instanceId}-${conflict.field}`} className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {getFieldLabel(conflict.field)}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  ({getInstanceLabel(conflict.instanceId)})
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={`p-3 rounded-md border ${
                resolutions[index].newValue === conflict.currentValue 
                  ? 'border-primary bg-primary bg-opacity-5' 
                  : 'border-gray-200'
              }`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`current-${index}`}
                    name={`resolution-${index}`}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    checked={resolutions[index].newValue === conflict.currentValue}
                    onChange={() => handleResolutionChange(index, false)}
                  />
                  <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                    {t('personalInfo.keepCurrent')}
                  </label>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 break-all">
                  {conflict.currentValue}
                </div>
              </div>
              
              <div className={`p-3 rounded-md border ${
                resolutions[index].newValue === conflict.newValue 
                  ? 'border-primary bg-primary bg-opacity-5' 
                  : 'border-gray-200'
              }`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`new-${index}`}
                    name={`resolution-${index}`}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    checked={resolutions[index].newValue === conflict.newValue}
                    onChange={() => handleResolutionChange(index, true)}
                  />
                  <label htmlFor={`new-${index}`} className="ml-2 block text-sm text-gray-700">
                    {t('personalInfo.useNew')}
                  </label>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 break-all">
                  {conflict.newValue}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={handleResolve}>
          {t('personalInfo.resolveConflicts')}
        </Button>
      </div>
    </div>
  );
};

export default ConflictResolution;
