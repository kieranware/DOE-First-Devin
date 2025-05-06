import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentList from './DocumentList';
import { DollarSign } from 'lucide-react';

const PayslipList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <DocumentList 
      documentType="payslip"
      title={t('documents.payslips')}
      icon={<DollarSign className="h-5 w-5 text-red-600" />}
    />
  );
};

export default PayslipList;
