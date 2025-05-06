import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Skip to content target */}
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
