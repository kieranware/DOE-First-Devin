import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageToggle from '../common/LanguageToggle';
import InstanceSelector from '../common/InstanceSelector';
import Button from '../common/Button';
import { User, LogOut, ChevronDown, Home, BookOpen, CreditCard } from 'lucide-react';
import { User as UserType } from '../../types';

export interface HeaderProps {
  className?: string;
  testId?: string;
  demoMode?: boolean;
  demoUser?: UserType;
}

function Header({
  className = '',
  testId = 'main-header',
  demoMode = false,
  demoUser
}: HeaderProps) {
  const { t } = useTranslation();
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  
  const user = demoMode && demoUser ? demoUser : state.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`bg-red-600 border-b border-red-700 shadow-md ${className}`}
      data-testid={testId}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-red-600 font-bold text-lg mr-2" aria-hidden="true">
            A
          </div>
          <span className="text-white font-medium text-lg">access</span>
          <div className="ml-1 bg-white text-red-600 text-xs px-1.5 py-0.5 rounded-full font-bold">7</div>
        </div>
        
        <nav className="hidden md:flex space-x-1" aria-label={t('accessibility.mainNavigation')}>
          <Button
            as="a"
            href="/"
            className="bg-red-700 hover:bg-red-800 text-white border-none"
            size="sm"
            radius="md"
            leftSection={<Home size={16} />}
          >
            {t('navigation.home')}
          </Button>
          
          <Button
            as="a"
            href="/"
            className="bg-white text-red-600 hover:bg-red-50"
            size="sm"
            radius="md"
            leftSection={<User size={16} />}
            rightSection={
              <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full font-medium">4</span>
            }
          >
            {t('navigation.employeePortal')}
          </Button>
          
          <Button
            as="a"
            href="/"
            className="text-white hover:bg-red-700"
            variant="subtle"
            size="sm"
            radius="md"
            leftSection={<BookOpen size={16} />}
          >
            {t('navigation.learning')}
          </Button>
          
          <Button
            as="a"
            href="/"
            className="text-white hover:bg-red-700"
            variant="subtle"
            size="sm"
            radius="md"
            leftSection={<CreditCard size={16} />}
          >
            {t('navigation.payroll')}
          </Button>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle className="text-white" />
          
          {((demoMode && demoUser && demoUser.instances.length > 1) || 
            (state.isAuthenticated && state.user && state.user.instances.length > 1)) && (
            <div className="w-40">
              <InstanceSelector 
                size="sm"
                className="bg-white text-red-600 border-white"
              />
            </div>
          )}
          
          {(demoMode || state.isAuthenticated) && (
            <div className="relative" ref={menuRef}>
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-white text-red-600 hover:bg-red-50"
                size="sm"
                radius="md"
                leftSection={<User size={16} />}
                rightSection={
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
                  />
                }
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                testId="user-menu-button"
              >
                <span className="hidden md:inline">{user?.name}</span>
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <Link
                      to="/personal-information"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      role="menuitem"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="personal-info-link"
                    >
                      <User size={16} className="mr-2 text-gray-500" />
                      {t('common.personalInfo')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      role="menuitem"
                      data-testid="logout-button"
                    >
                      <LogOut size={16} className="mr-2 text-gray-500" />
                      {t('auth.signOut')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
