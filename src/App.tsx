import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { IntelligenceView } from './components/IntelligenceView';
import { ContentStudio } from './components/ContentStudio';
import { LeadScorer } from './components/LeadScorer';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'intelligence':
        return <IntelligenceView />;
      case 'leads':
        return <LeadScorer />;
      case 'content':
        return <ContentStudio />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
