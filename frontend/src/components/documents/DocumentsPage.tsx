import React from 'react';
import { useTranslation } from 'react-i18next';
import PayslipList from './PayslipList';
import CertificateList from './CertificateList';
import ContractList from './ContractList';

const DocumentsPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {t('documents.title')}
      </h1>
      
      <div className="space-y-6">
        <PayslipList />
        <CertificateList />
        <ContractList />
      </div>
    </div>
  );
};

export default DocumentsPage;
