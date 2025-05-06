import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactDetails as ContactDetailsType } from '../../types';
import Card from '../common/Card';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactDetailsProps {
  contactDetails: ContactDetailsType;
  onChange: (section: string, field: string, value: any) => void;
  onAddressChange: (field: string, value: string) => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ 
  contactDetails, 
  onChange, 
  onAddressChange 
}) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex items-center">
        <div className="flex-shrink-0 bg-primary bg-opacity-10 p-2 rounded-full mr-3">
          <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {t('personalInfo.contactDetails')}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.email')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={contactDetails.email}
              onChange={(e) => onChange('contactDetails', 'email', e.target.value)}
              aria-required="true"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.phone')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              value={contactDetails.phone}
              onChange={(e) => onChange('contactDetails', 'phone', e.target.value)}
              aria-required="true"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700">{t('personalInfo.address')}</span>
          </div>
          
          <div>
            <label htmlFor="address-line1" className="block text-sm font-medium text-gray-700">
              {t('personalInfo.addressLine1')}
            </label>
            <input
              type="text"
              name="address-line1"
              id="address-line1"
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              value={contactDetails.address.line1}
              onChange={(e) => onAddressChange('line1', e.target.value)}
              aria-required="true"
            />
          </div>
          
          <div>
            <label htmlFor="address-line2" className="block text-sm font-medium text-gray-700">
              {t('personalInfo.addressLine2')}
            </label>
            <input
              type="text"
              name="address-line2"
              id="address-line2"
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              value={contactDetails.address.line2 || ''}
              onChange={(e) => onAddressChange('line2', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                {t('personalInfo.city')}
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                value={contactDetails.address.city}
                onChange={(e) => onAddressChange('city', e.target.value)}
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                {t('personalInfo.county')}
              </label>
              <input
                type="text"
                name="county"
                id="county"
                className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                value={contactDetails.address.county}
                onChange={(e) => onAddressChange('county', e.target.value)}
                aria-required="true"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="eircode" className="block text-sm font-medium text-gray-700">
              {t('personalInfo.eircode')}
            </label>
            <input
              type="text"
              name="eircode"
              id="eircode"
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              value={contactDetails.address.eircode}
              onChange={(e) => onAddressChange('eircode', e.target.value)}
              aria-required="true"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactDetails;
