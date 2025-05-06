import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';

const Greeting: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useAuth();
  const userName = state.user?.name?.split(' ')[0] || '';

  return (
    <Card className="w-full shadow-md" padding="lg" hasBorder colourVariant="primary">
      <div className="flex items-start">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white mr-4 font-bold text-lg">
          {userName.charAt(0) || 'A'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('common.greeting')}, {userName}
          </h1>
          <p className="text-gray-600">
            {t('dashboard.consolidatedTasks')}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Greeting;
