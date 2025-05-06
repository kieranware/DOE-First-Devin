import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import Button from '../common/Button';
import { FileText, DollarSign, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const PriorityTasks: React.FC = () => {
  const { t } = useTranslation();

  const priorityTasks = [
    {
      id: 'payslip',
      icon: <FileText size={24} className="text-blue-500" />,
      title: t('dashboard.latestPayslip'),
      description: t('dashboard.payslipAvailable', { month: 'April' }),
      status: 'New',
      date: 'May 1, 2025',
      action: {
        label: t('common.view'),
        href: '/documents/payslips'
      }
    },
    {
      id: 'payClaim',
      icon: <DollarSign size={24} className="text-green-500" />,
      title: t('dashboard.payClaimRequired'),
      description: t('dashboard.pendingPayClaim', { date: 'April 27' }),
      status: 'Action Needed',
      date: 'May 3, 2025',
      action: {
        label: t('common.submit'),
        href: '/pay-claims'
      }
    },
    {
      id: 'calendar',
      icon: <Calendar size={24} className="text-purple-500" />,
      title: t('dashboard.upcomingCalendar'),
      description: t('dashboard.schoolHolidays', { month: 'May' }),
      date: 'May 22-26',
      action: {
        label: t('common.view'),
        href: '/calendar'
      }
    }
  ];

  return (
    <section aria-labelledby="priorities-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="priorities-heading" className="text-xl font-bold text-gray-900">
          {t('dashboard.todaysPriorities')}
        </h2>
        <div className="flex space-x-2">
          <button 
            className="p-1 rounded-full text-red-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Previous tasks"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="p-1 rounded-full text-red-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Next tasks"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {priorityTasks.map((task) => (
          <Card 
            key={task.id}
            icon={task.icon}
            status={task.status as any}
            className="h-full shadow-md"
            hasBorder
            colourVariant={
              task.id === 'payslip' ? 'info' : 
              task.id === 'payClaim' ? 'success' : 
              'primary'
            }
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="text-sm text-gray-500">
                {task.id === 'payslip' && t('documents.availableSince')}: {task.date}
                {task.id === 'payClaim' && t('documents.dueBy')}: {task.date}
                {task.id === 'calendar' && t('dashboard.holidayPeriod')}: {task.date}
              </div>
              <Button 
                className={
                  task.id === 'payClaim' ? 'bg-red-600 text-white hover:bg-red-700' : 
                  'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                }
                size="sm"
                as="a"
                href={task.action.href}
              >
                {task.action.label}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PriorityTasks;
