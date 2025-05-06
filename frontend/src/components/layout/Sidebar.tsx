import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { mockApiRouter } from '../../services/mockApiRouter';
import { InstanceAccess, User as UserType } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';
import InstanceBadge from '../common/InstanceBadge';
import { 
  User, 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  Bell, 
  Search,
  Building,
  ExternalLink,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export interface SidebarProps {
  className?: string;
  testId?: string;
  demoMode?: boolean;
  demoUser?: UserType;
}

const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  testId = 'main-sidebar',
  demoMode = false,
  demoUser
}) => {
  const { t } = useTranslation();
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const user = demoMode && demoUser ? demoUser : state.user;
  const [instanceDetails, setInstanceDetails] = useState<InstanceAccess[]>([]);
  
  useEffect(() => {
    const fetchInstanceDetails = async () => {
      if (!user) return;
      
      try {
        const instanceAccess = await mockApiRouter.getMultiInstanceStatus(user.userId);
        setInstanceDetails(instanceAccess.filter(instance => instance.hasAccess));
      } catch (error) {
        console.error('Failed to load instance details:', error);
      }
    };
    
    fetchInstanceDetails();
  }, [user]);
  
  const menuItems = [
    { 
      icon: <User size={18} />, 
      label: t('common.personalInfo'), 
      href: '/personal-information',
      active: false
    },
    { 
      icon: <FileText size={18} />, 
      label: t('common.payslips'), 
      href: '/documents',
      active: false
    },
    { 
      icon: <Calendar size={18} />, 
      label: t('common.calendar'), 
      href: '/calendar',
      active: false
    },
    { 
      icon: <DollarSign size={18} />, 
      label: t('common.payClaims'), 
      href: '/pay-claims',
      active: false
    },
    { 
      icon: <Clock size={18} />, 
      label: t('common.appointments'), 
      href: '/appointments',
      active: false
    }
  ];
  
  const quickAccessItems = [
    { 
      icon: <Clock size={16} />, 
      label: t('common.pendingTasks'), 
      count: 3,
      href: '/tasks'
    },
    { 
      icon: <Bell size={16} />, 
      label: t('common.notifications'), 
      count: 2,
      href: '/notifications'
    }
  ];
  
  const activeInstance = instanceDetails.find(instance => instance.instanceId === state.activeInstance);
  
  return (
    <aside 
      className={`w-64 bg-gray-100 border-r border-gray-200 h-full flex flex-col ${className}`}
      data-testid={testId}
    >
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Active Instance Indicator - Only show for multi-instance users */}
        {user && user.instances.length > 1 && activeInstance && (
          <Card 
            className="mb-4" 
            colourVariant="primary" 
            padding="sm"
            hasBorder
            testId="active-instance-card"
          >
            <div className="flex items-center">
              <Building size={16} className="text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-800">
                {activeInstance.instanceName}
              </span>
              {activeInstance.isPrimary && (
                <InstanceBadge 
                  className="ml-auto" 
                  colourVariant="info" 
                  size="sm" 
                  showLabel={false} 
                />
              )}
            </div>
          </Card>
        )}
      
        <h2 className="text-sm font-bold text-red-600 mb-4 uppercase">
          {t('navigation.smartMenu')}
        </h2>
        
        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-red-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-colors"
            placeholder={t('common.search')}
            aria-label={t('common.search')}
            data-testid="sidebar-search"
          />
        </div>
        
        {/* Main menu */}
        <nav className="space-y-1 mb-8" aria-label={t('accessibility.mainNavigation')}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={index}
                as="a"
                href={item.href + (state.activeInstance ? `?instance=${state.activeInstance}` : '')}
                className={`w-full mb-1 ${isActive ? 'bg-red-600 text-white hover:bg-red-700' : 'text-gray-700 hover:bg-gray-200'}`}
                size="sm"
                radius="md"
                leftSection={
                  <span className={isActive ? 'text-white' : 'text-red-600'}>
                    {item.icon}
                  </span>
                }
                justify="start"
                aria-current={isActive ? 'page' : undefined}
                testId={`nav-item-${index}`}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
        
        {/* Quick access section */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
            {t('common.quickAccess')}
          </h2>
          <div className="space-y-1">
            {quickAccessItems.map((item, index) => (
              <Button
                key={index}
                as="a"
                href={item.href + (state.activeInstance ? `?instance=${state.activeInstance}` : '')}
                className="w-full text-gray-700 hover:bg-gray-200"
                size="sm"
                radius="md"
                leftSection={<span className="text-red-600">{item.icon}</span>}
                rightSection={
                  item.count > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {item.count}
                    </span>
                  )
                }
                justify="start"
                testId={`quick-access-${index}`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Instance-specific quick links - Only show for multi-instance users */}
        {user && user.instances.length > 1 && (
          <div className="mb-6">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              {t('navigation.instanceLinks')}
            </h2>
            <div className="space-y-1">
              {instanceDetails.map((instance, index) => {
                const isActive = instance.instanceId === state.activeInstance;
                return (
                  <Button
                    key={instance.instanceId}
                    onClick={() => navigate(`/instance-dashboard?instance=${instance.instanceId}`)}
                    colourVariant={isActive ? "primary" : "secondary"}
                    variant={isActive ? "subtle" : "link"}
                    size="sm"
                    radius="md"
                    leftSection={<Building size={16} />}
                    rightSection={<ExternalLink size={12} />}
                    justify="start"
                    className="w-full"
                    testId={`instance-link-${index}`}
                  >
                    {instance.instanceName}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Menu feedback */}
      <div className="border-t border-gray-200 p-4 mt-auto">
        <Card padding="sm" colourVariant="secondary" hasBorder testId="feedback-card">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('common.feedbackQuestion')}</span>
            <div className="flex space-x-2">
              <Button
                aria-label={t('accessibility.thumbsUp')}
                colourVariant="primary"
                variant="subtle"
                size="sm"
                radius="full"
                leftSection={<ThumbsUp size={14} />}
                testId="thumbs-up-button"
              >
                {t('common.yes')}
              </Button>
              <Button
                aria-label={t('accessibility.thumbsDown')}
                colourVariant="secondary"
                variant="subtle"
                size="sm"
                radius="full"
                leftSection={<ThumbsDown size={14} />}
                testId="thumbs-down-button"
              >
                {t('common.no')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;
