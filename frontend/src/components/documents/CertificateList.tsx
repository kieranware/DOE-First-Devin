import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentList from './DocumentList';
import { Award } from 'lucide-react';

const CertificateList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <DocumentList 
      documentType="certificate"
      title={t('documents.certificates')}
      icon={<Award className="h-5 w-5 text-red-600" />}
    />
  );
};

export default CertificateList;
