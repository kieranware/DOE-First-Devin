import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmergencyContact as EmergencyContactType } from '../../types';
import Card from '../common/Card';
import { AlertTriangle, User, Phone } from 'lucide-react';

interface EmergencyContactProps {
  emergencyContact: EmergencyContactType;
  onChange: (section: string, field: string, value: any) => void;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({ 
  emergencyContact, 
  onChange 
}) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex items-center">
        <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-3">
          <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {t('personalInfo.emergencyContact')}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6 space-y-4">
        <div>
          <label htmlFor="emergency-name" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.emergencyContactName')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="emergency-name"
              id="emergency-name"
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={emergencyContact.name}
              onChange={(e) => onChange('emergencyContact', 'name', e.target.value)}
              aria-required="true"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="emergency-relationship" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.relationship')}
          </label>
          <select
            id="emergency-relationship"
            name="emergency-relationship"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={emergencyContact.relationship}
            onChange={(e) => onChange('emergencyContact', 'relationship', e.target.value)}
            aria-required="true"
          >
            <option value="Spouse">{t('personalInfo.relationships.spouse')}</option>
            <option value="Partner">{t('personalInfo.relationships.partner')}</option>
            <option value="Parent">{t('personalInfo.relationships.parent')}</option>
            <option value="Child">{t('personalInfo.relationships.child')}</option>
            <option value="Sibling">{t('personalInfo.relationships.sibling')}</option>
            <option value="Friend">{t('personalInfo.relationships.friend')}</option>
            <option value="Other">{t('personalInfo.relationships.other')}</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="emergency-phone" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.emergencyContactPhone')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="tel"
              name="emergency-phone"
              id="emergency-phone"
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={emergencyContact.phone}
              onChange={(e) => onChange('emergencyContact', 'phone', e.target.value)}
              aria-required="true"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmergencyContact;
