import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AnalyticsPanel from './AnalyticsPanel';
import { useTranslation } from 'react-i18next';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';

export interface LayoutProps {
  children: React.ReactNode;
  demoMode?: boolean;
  demoUser?: User;
}

function Layout({ children, demoMode = false, demoUser }: LayoutProps) {
  const { t } = useTranslation();
  const { state, login } = useAuth();
  
  React.useEffect(() => {
    if (demoMode && demoUser && !state.isAuthenticated) {
      login();
    }
  }, [demoMode, demoUser, state.isAuthenticated, login]);

  return (
    <div className="flex flex-col h-screen">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        {t('accessibility.skipToContent')}
      </a>
      
      <Header demoMode={demoMode} demoUser={demoUser} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar demoMode={demoMode} />
        <MainContent>{children}</MainContent>
        <AnalyticsPanel />
      </div>
    </div>
  );
};

export default Layout;
