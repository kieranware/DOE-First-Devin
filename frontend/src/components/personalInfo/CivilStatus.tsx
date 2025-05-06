import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import { Users } from 'lucide-react';

interface CivilStatusProps {
  civilStatus: string;
  onChange: (field: string, value: any) => void;
}

const CivilStatus: React.FC<CivilStatusProps> = ({ 
  civilStatus, 
  onChange 
}) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex items-center">
        <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-3">
          <Users className="h-5 w-5 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {t('personalInfo.civilStatus')}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <label htmlFor="civil-status" className="block text-sm font-medium text-gray-700">
          {t('personalInfo.currentCivilStatus')}
        </label>
        <select
          id="civil-status"
          name="civil-status"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          value={civilStatus}
          onChange={(e) => onChange('civilStatus', e.target.value)}
          aria-required="true"
        >
          <option value="Single">{t('personalInfo.civilStatuses.single')}</option>
          <option value="Married">{t('personalInfo.civilStatuses.married')}</option>
          <option value="Civil Partnership">{t('personalInfo.civilStatuses.civilPartnership')}</option>
          <option value="Separated">{t('personalInfo.civilStatuses.separated')}</option>
          <option value="Divorced">{t('personalInfo.civilStatuses.divorced')}</option>
          <option value="Widowed">{t('personalInfo.civilStatuses.widowed')}</option>
        </select>
      </div>
    </Card>
  );
};

export default CivilStatus;
