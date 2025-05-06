import React from 'react';
import Greeting from './Greeting';
import PriorityTasks from './PriorityTasks';
import InformationSection from './InformationSection';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Greeting />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <PriorityTasks />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InformationSection />
      </div>
    </div>
  );
};

export default Dashboard;
