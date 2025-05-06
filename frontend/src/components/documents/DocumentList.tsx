import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { mockHcmService } from '../../services/mockHcmService';
import { Document } from '../../types';
import Card from '../common/Card';
import { FileText, Download, Filter } from 'lucide-react';
import Button from '../common/Button';

interface DocumentListProps {
  documentType?: string;
  title: string;
  icon?: React.ReactNode;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  documentType, 
  title,
  icon = <FileText className="h-5 w-5 text-blue-600" />
}) => {
  const { t } = useTranslation();
  const { state } = useAuth();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<string | 'all'>('all');

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!state.user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        let allDocuments: Document[] = [];
        
        if (documentType === 'payslip') {
          if (selectedInstance === 'all') {
            for (const instanceId of state.user.instances) {
              const payslips = await mockHcmService.getPayslips(
                state.user.userId,
                instanceId
              );
              allDocuments = [...allDocuments, ...payslips];
            }
          } else {
            const payslips = await mockHcmService.getPayslips(
              state.user.userId,
              selectedInstance
            );
            allDocuments = [...allDocuments, ...payslips];
          }
        } else {
          if (selectedInstance === 'all') {
            for (const instanceId of state.user.instances) {
              const docs = await mockHcmService.getDocuments(
                state.user.userId,
                instanceId,
                documentType
              );
              allDocuments = [...allDocuments, ...docs];
            }
          } else {
            const docs = await mockHcmService.getDocuments(
              state.user.userId,
              selectedInstance,
              documentType
            );
            allDocuments = docs;
          }
        }
        
        setDocuments(allDocuments);
      } catch (err) {
        setError(t('errors.failedToLoadDocuments'));
        console.error('Failed to load documents:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocuments();
  }, [state.user, documentType, selectedInstance, t]);

  const handleDownload = (document: Document) => {
    console.log(`Downloading document: ${document.title}`);
    
    window.open(document.url, '_blank');
  };

  const getInstanceLabel = (instanceId: string) => {
    return t(`navigation.${instanceId}Instance`, { defaultValue: instanceId });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(t('locale'), { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        </div>
        
        {state.user && state.user.instances.length > 1 && (
          <Button 
            className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
            size="sm"
            onClick={toggleFilter}
            aria-expanded={filterOpen}
            aria-controls="instance-filter"
          >
            <Filter size={16} className="mr-1" />
            {t('documents.filter')}
          </Button>
        )}
      </div>
      
      {filterOpen && state.user && state.user.instances.length > 1 && (
        <div 
          id="instance-filter"
          className="px-4 py-3 bg-gray-50 border-t border-b border-gray-200"
        >
          <div className="text-sm font-medium text-gray-700 mb-2">
            {t('documents.filterByInstance')}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedInstance('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedInstance === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('documents.allInstances')}
            </button>
            
            {state.user.instances.map((instance) => (
              <button
                key={instance}
                onClick={() => setSelectedInstance(instance)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedInstance === instance
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {getInstanceLabel(instance)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-2">{t('common.loading')}</span>
          </div>
        ) : error ? (
          <div className="p-4 text-red-700 bg-red-50">
            <p>{error}</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>{t('documents.noDocumentsFound')}</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {documents.map((document) => (
              <li key={document.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {document.title}
                      </h4>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span>{formatDate(document.date)}</span>
                        <span className="mx-1">•</span>
                        <span>{getInstanceLabel(document.instanceId)}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    aria-label={t('documents.downloadDocument', { title: document.title })}
                  >
                    <Download size={16} className="mr-1" />
                    {t('documents.download')}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default DocumentList;
