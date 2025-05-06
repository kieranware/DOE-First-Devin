import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { PieChart, Activity, Calendar } from 'lucide-react';

const AnalyticsPanel: React.FC = () => {
  const { t } = useTranslation();
  
  const attendanceData = [
    { month: 'Jan', attendance: 98 },
    { month: 'Feb', attendance: 100 },
    { month: 'Mar', attendance: 95 },
    { month: 'Apr', attendance: 97 },
    { month: 'May', attendance: 92 }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Staff Meeting',
      date: 'May 5, 2025',
      time: '10:00 AM'
    },
    {
      id: 2,
      title: 'Training Workshop',
      date: 'May 12, 2025',
      time: '2:00 PM'
    },
    {
      id: 3,
      title: 'End of Term Review',
      date: 'May 20, 2025',
      time: '9:30 AM'
    }
  ];
  
  return (
    <aside className="w-64 bg-white border-l border-gray-200 p-4 hidden lg:block overflow-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {t('dashboard.analytics')}
      </h2>
      
      {/* Attendance Chart */}
      <Card className="mb-4">
        <div className="flex items-center mb-3">
          <Activity size={18} className="text-primary mr-2" />
          <h3 className="text-sm font-medium">{t('dashboard.attendanceOverview')}</h3>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attendanceData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Upcoming Events */}
      <Card className="mb-4">
        <div className="flex items-center mb-3">
          <Calendar size={18} className="text-primary mr-2" />
          <h3 className="text-sm font-medium">{t('dashboard.upcomingEvents')}</h3>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <div className="font-medium text-sm">{event.title}</div>
              <div className="text-xs text-gray-500">{event.date} • {event.time}</div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* System Status */}
      <Card>
        <div className="flex items-center mb-3">
          <PieChart size={18} className="text-primary mr-2" />
          <h3 className="text-sm font-medium">{t('dashboard.systemStatus')}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs">{t('navigation.primaryInstance')}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              {t('common.online')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">{t('navigation.postPrimaryInstance')}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              {t('common.online')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">{t('navigation.nonTeachingInstance')}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              {t('common.online')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">{t('navigation.pensionersInstance')}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              {t('common.maintenance')}
            </span>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default AnalyticsPanel;
