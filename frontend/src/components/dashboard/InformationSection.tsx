import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import Button from '../common/Button';

const InformationSection: React.FC = () => {
  const { t } = useTranslation();

  const personalDetails = {
    fullName: 'Sarah O\'Connor',
    staffId: 'EDU-2023-74891',
    schoolAssignment: 'St. Patrick\'s Secondary School'
  };

  const appointments = [
    {
      title: 'Post Primary Teacher',
      location: 'St. Patrick\'s Secondary School',
      status: 'Active'
    },
    {
      title: 'Teacher Training Support',
      location: 'Regional Education Center',
      status: 'Part Time'
    }
  ];

  const leaveBalance = [
    {
      type: 'Annual Leave',
      remaining: 18,
      total: 22,
      used: 4
    },
    {
      type: 'Sick Leave',
      remaining: 0,
      total: 7,
      used: 7
    },
    {
      type: 'Parental Leave',
      remaining: 12,
      total: 12,
      used: 0
    }
  ];

  return (
    <section aria-labelledby="information-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="information-heading" className="text-xl font-bold text-gray-900">
          {t('dashboard.yourInformation')}
        </h2>
        <a href="/personal-information" className="text-red-600 hover:text-red-700 text-sm font-medium">
          {t('common.viewAll')}
        </a>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Personal Details Card */}
        <Card 
          title={t('dashboard.personalDetails')} 
          className="h-full shadow-md"
          hasBorder
          colourVariant="primary"
        >
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">{t('personalInfo.fullName')}</div>
              <div className="font-medium">{personalDetails.fullName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">{t('personalInfo.staffID')}</div>
              <div className="font-medium">{personalDetails.staffId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">{t('personalInfo.schoolAssignment')}</div>
              <div className="font-medium">{personalDetails.schoolAssignment}</div>
            </div>
            <div className="pt-2">
              <Button 
                className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
                size="sm"
                as="a"
                href="/personal-information"
              >
                {t('personalInfo.updateInformation')}
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Current Appointments Card */}
        <Card 
          title={t('dashboard.currentAppointments')} 
          className="h-full shadow-md"
          hasBorder
          colourVariant="info"
        >
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{appointment.title}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === 'Active' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{appointment.location}</div>
              </div>
            ))}
            <div className="pt-2">
              <Button 
                className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
                size="sm"
                as="a"
                href="/appointments"
              >
                {t('common.viewDetails')}
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Leave Balance Card */}
        <Card 
          title={t('dashboard.leaveBalance')} 
          className="h-full shadow-md"
          hasBorder
          colourVariant="success"
        >
          <div className="space-y-4">
            {leaveBalance.map((leave, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{leave.type}</div>
                  <div className="text-sm font-medium">
                    {leave.type === 'Annual Leave' && `${leave.remaining} ${t('common.daysRemaining')}`}
                    {leave.type === 'Sick Leave' && `${leave.used} ${t('common.daysUsed')}`}
                    {leave.type === 'Parental Leave' && `${leave.remaining} ${t('common.daysAvailable')}`}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      leave.type === 'Annual Leave' ? 'bg-red-500' :
                      leave.type === 'Sick Leave' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(leave.used / leave.total) * 100}%` }}
                    aria-label={`${leave.used} of ${leave.total} days used`}
                  ></div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button 
                className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
                size="sm"
                as="a"
                href="/leave"
              >
                {t('dashboard.requestLeave')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default InformationSection;
