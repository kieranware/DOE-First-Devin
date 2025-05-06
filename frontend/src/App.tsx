import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { InstanceProvider } from './context/InstanceContext';
import { PersonalInfoProvider } from './context/PersonalInfoContext';
import { DocumentsProvider } from './context/DocumentsContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import PersonalInfoForm from './components/personalInfo/PersonalInfoForm';
import DocumentsPage from './components/documents/DocumentsPage';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './index.css';
import './i18n/i18n';

const mockUser = {
  userId: 'user-123',
  name: 'Sarah O\'Connor',
  email: 'sarah.oconnor@education.ie',
  instances: ['primary', 'post-primary'],
  roles: ['teacher']
};

const isPublicDemo = window.location.hostname.includes('devinapps.com');

function App() {
  if (isPublicDemo) {
    return (
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="*" element={
                <InstanceProvider initialInstance="primary">
                  <PersonalInfoProvider>
                    <DocumentsProvider>
                      <Layout demoMode={true} demoUser={mockUser}>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/personal-information" element={
                            <div className="p-6">
                              <PersonalInfoForm />
                            </div>
                          } />
                          <Route path="/documents" element={
                            <div className="p-6">
                              <DocumentsPage />
                            </div>
                          } />
                          <Route path="/instance-dashboard" element={
                            <div className="p-6">
                              <Dashboard />
                            </div>
                          } />
                          <Route path="*" element={
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                              <p>The page you are looking for does not exist.</p>
                            </div>
                          } />
                        </Routes>
                      </Layout>
                    </DocumentsProvider>
                  </PersonalInfoProvider>
                </InstanceProvider>
              } />
            </Routes>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <InstanceProvider>
                  <PersonalInfoProvider>
                    <DocumentsProvider>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </DocumentsProvider>
                  </PersonalInfoProvider>
                </InstanceProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/personal-information" element={
              <ProtectedRoute>
                <InstanceProvider>
                  <PersonalInfoProvider>
                    <DocumentsProvider>
                      <Layout>
                        <div className="p-6">
                          <PersonalInfoForm />
                        </div>
                      </Layout>
                    </DocumentsProvider>
                  </PersonalInfoProvider>
                </InstanceProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/documents" element={
              <ProtectedRoute>
                <InstanceProvider>
                  <PersonalInfoProvider>
                    <DocumentsProvider>
                      <Layout>
                        <div className="p-6">
                          <DocumentsPage />
                        </div>
                      </Layout>
                    </DocumentsProvider>
                  </PersonalInfoProvider>
                </InstanceProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/instance-dashboard" element={
              <ProtectedRoute>
                <InstanceProvider>
                  <PersonalInfoProvider>
                    <DocumentsProvider>
                      <Layout>
                        <div className="p-6">
                          <Dashboard />
                        </div>
                      </Layout>
                    </DocumentsProvider>
                  </PersonalInfoProvider>
                </InstanceProvider>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={
              <ProtectedRoute>
                <InstanceProvider>
                  <PersonalInfoProvider>
                    <DocumentsProvider>
                      <Layout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                          <p>The page you are looking for does not exist.</p>
                        </div>
                      </Layout>
                    </DocumentsProvider>
                  </PersonalInfoProvider>
                </InstanceProvider>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
