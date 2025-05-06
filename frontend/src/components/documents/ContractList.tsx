import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentList from './DocumentList';
import { FileSignature } from 'lucide-react';

const ContractList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <DocumentList 
      documentType="contract"
      title={t('documents.contracts')}
      icon={<FileSignature className="h-5 w-5 text-red-600" />}
    />
  );
};

export default ContractList;
