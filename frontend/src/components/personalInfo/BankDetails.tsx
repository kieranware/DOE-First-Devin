import React from 'react';
import { useTranslation } from 'react-i18next';
import { BankDetails as BankDetailsType } from '../../types';
import Card from '../common/Card';
import { CreditCard } from 'lucide-react';

interface BankDetailsProps {
  bankDetails: BankDetailsType;
  onChange: (section: string, field: string, value: any) => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ 
  bankDetails, 
  onChange 
}) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex items-center">
        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
          <CreditCard className="h-5 w-5 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {t('personalInfo.bankDetails')}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6 space-y-4">
        <div>
          <label htmlFor="account-name" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.accountName')}
          </label>
          <input
            type="text"
            name="account-name"
            id="account-name"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={bankDetails.accountName}
            onChange={(e) => onChange('bankDetails', 'accountName', e.target.value)}
            aria-required="true"
          />
        </div>
        
        <div>
          <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.iban')}
          </label>
          <input
            type="text"
            name="iban"
            id="iban"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={bankDetails.iban}
            onChange={(e) => onChange('bankDetails', 'iban', e.target.value)}
            aria-required="true"
            pattern="^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$"
            title={t('personalInfo.ibanFormat')}
          />
          <p className="mt-1 text-xs text-gray-500">
            {t('personalInfo.ibanExample')}
          </p>
        </div>
        
        <div>
          <label htmlFor="bic" className="block text-sm font-medium text-gray-700">
            {t('personalInfo.bic')}
          </label>
          <input
            type="text"
            name="bic"
            id="bic"
            className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            value={bankDetails.bic}
            onChange={(e) => onChange('bankDetails', 'bic', e.target.value)}
            aria-required="true"
            pattern="^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$"
            title={t('personalInfo.bicFormat')}
          />
          <p className="mt-1 text-xs text-gray-500">
            {t('personalInfo.bicExample')}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BankDetails;
