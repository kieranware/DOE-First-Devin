import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';
import Button from './Button';

interface LanguageToggleProps {
  className?: string;
  testId?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  testId = 'language-toggle'
}) => {
  const { t } = useTranslation();
  const { state, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(state.language === 'en' ? 'ga' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="subtle"
      size="sm"
      radius="md"
      compactVersion="compact"
      leftSection={<Globe size={16} className="text-white" />}
      className={`text-white hover:bg-red-700 ${className}`}
      testId={testId}
      aria-label={t('accessibility.languageSelector')}
    >
      {state.language === 'en' ? 'Gaeilge' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
