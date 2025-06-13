import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import { Toaster } from 'react-hot-toast';
import GetStarted from './pages/auth/GetStarted';
import Home from './pages/admin';
import Welcome from './pages/Welcome';
import WaitlistPage from './pages/admin/WaitlistPage';
import DashboardPage from './pages/admin/DashboardPage';
import EventPage from './pages/admin/EventPage';
import PartnerPage from './pages/admin/PartnerPage';
import UserPage from './pages/admin/UserPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminPage from './pages/admin/AdminPage';
import './App.css';

// Placeholders pour les pages manquantes
const TransactionsPage = () => <div style={{padding:40}}>TransactionsPage (à implémenter)</div>;
const AdsPage = () => <div style={{padding:40}}>AdsPage (à implémenter)</div>;
const MessagesPage = () => <div style={{padding:40}}>MessagesPage (à implémenter)</div>;
const StatsPage = () => <div style={{padding:40}}>StatsPage (à implémenter)</div>;
//import EnvTest from './Components/EnvTest';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
        <Routes>
          {/* Route publique */}
          <Route path="/" element={<Welcome />} />
          <Route path="/GetStarted" element={<GetStarted />} />
          
          {/* Routes protégées imbriquées */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="waitlist" element={<WaitlistPage />} />
            <Route path="events" element={<EventPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="partners" element={<PartnerPage />} />
            <Route path="ads" element={<AdsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="administration" element={<AdminPage />} />
            {/* autres sous-pages ici */}
          </Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/*<EnvTest />*/}
      </Router>
    </NotificationProvider>
  );
}

// Composant de protection des routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/GetStarted" replace />;
  }
  
  return children;
};

export default App;

