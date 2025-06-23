import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CreditCard, 
  Users, 
  Megaphone, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  ChevronRight,
  UserCheck,
  Building2,
  LayoutDashboard,
  Briefcase,
  Handshake,
  Award,
  ScrollText,
  Home,
  Gift,
  UserCog,
  FileText
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../../components/global/Sidebar';
import Header from '../../components/global/Header';
import ModuleCard from '../../components/global/ModuleCard';
import DashboardStats from '../../components/admin/DashboardStats';
import AdministratorManagement from '../../components/admin/AdministratorManagement';
import AuthService from '../../services/auth.service';
import EventPage from './EventPage';
import UserPage from './UserPage';
import PartnerPage from './PartnerPage';
import SettingsPage from './SettingsPage';
import BusinessPage from './BusinessPage';
import ReferralPage from './ReferralPage';
import RewardPage from './RewardPage';
import RewardRulePage from './RewardRulePage';
import WaitlistPage from './WaitlistPage';
import TransactionsPage from './TransactionsPage';
import AdsPage from './AdsPage';
import MessagingPage from './MessagingPage';
import StatisticsPage from './StatisticsPage';
import RolesPage from './RolesPage';
import SignalementsPage from './SignalementsPage';
import api from '../../services/api';
import Breadcrumbs from '../../components/global/Breadcrumbs';

const HomePage = () => {
  const [activeItem, setActiveItem] = useState('accueil');
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/users/me');
        const userData = userResponse.data;
        setUser(userData);

        if (AuthService.hasPermission(userData, 'manage_users')) {
          const statsResponse = await api.get('/stats/dashboard');
          const statsData = statsResponse.data;
          const formattedStats = {
            totalEvents: statsData.events,
            totalPartners: statsData.businesses,
            waitlistStats: { total: statsData.waitlist },
            premiumUsers: statsData.premiumUsers,
            freemiumUsers: statsData.freemiumUsers,
            monthlyRevenue: statsData.monthlyRevenue,
            activeEvents: 0,
            totalUsers: 0,
            recentEvents: [],
            topEvents: [],
            recentWaitlist: []
          };
          setStats(formattedStats);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        if (error.response && error.response.status === 401) {
          navigate('/auth/get-started');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const allModules = [
    { title: 'Accueil', icon: Home, key: 'accueil', permission: null, type: 'main' },
    { title: 'Évènements', icon: Calendar, key: 'evenements', permission: 'manage_events', type: 'main' },
    { title: 'Transactions', icon: CreditCard, key: 'transactions', permission: 'manage_transactions', type: 'main' },
    { title: 'Partenaires', icon: Handshake, key: 'partenaires', permission: 'manage_partners', type: 'main' },
    { title: 'Publicités', icon: Megaphone, key: 'publicites', permission: 'manage_ads', type: 'main' },
    { title: 'Messagerie', icon: MessageSquare, key: 'messagerie', permission: 'manage_chats', type: 'main' },
    { title: 'Liste d\'attente', icon: UserCheck, key: 'liste-d-attente', permission: 'manage_users', type: 'main' },
    { title: 'Utilisateurs', icon: Users, key: 'utilisateurs', permission: 'manage_users', type: 'main' },
    { title: 'Statistiques', icon: BarChart3, key: 'statistiques', permission: 'manage_users', type: 'main' },
    { title: 'Business', icon: Briefcase, key: 'business', permission: 'manage_business', type: 'main' },
    { title: 'Parrainage', icon: Gift, key: 'parrainage', permission: 'manage_referrals', type: 'main' },
    { title: 'Récompenses', icon: Award, key: 'recompenses', permission: 'manage_rewards', type: 'main' },
    { title: 'Règles Récompense', icon: ScrollText, key: 'regles-recompense', permission: 'manage_rewards', type: 'main' },
    { title: 'Administration', icon: Settings, key: 'administration', permission: 'manage_admins', type: 'secondary' },
    { title: 'Rôles', icon: UserCog, key: 'roles', permission: 'manage_admins', type: 'secondary' },
    { title: 'Signalements', icon: FileText, key: 'signalements', permission: 'manage_users', type: 'secondary' },
  ];

  const filteredModules = allModules.filter(module => 
    !module.permission || (user && AuthService.hasPermission(user, module.permission))
  );

  const handleModuleClick = (key) => {
    setActiveItem(key);
  };

  const getBreadcrumbItems = () => {
    const homeItem = { 
      name: 'Accueil', 
      onClick: () => setActiveItem('accueil'),
      icon: Home 
    };

    if (activeItem === 'accueil') {
      return [homeItem];
    }

    const currentModule = allModules.find(m => m.key === activeItem);
    if (!currentModule) {
      return [homeItem]; // Sécurité
    }

    return [
      homeItem,
      { name: currentModule.title, icon: currentModule.icon }
    ];
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'evenements': return <EventPage />;
      case 'transactions': return <TransactionsPage />;
      case 'partenaires': return <PartnerPage />;
      case 'publicites': return <AdsPage />;
      case 'messagerie': return <MessagingPage />;
      case 'liste-d-attente': return <WaitlistPage />;
      case 'utilisateurs': return <UserPage />;
      case 'statistiques': return <StatisticsPage />;
      case 'business': return <BusinessPage />;
      case 'parrainage': return <ReferralPage />;
      case 'recompenses': return <RewardPage />;
      case 'regles-recompense': return <RewardRulePage />;
      case 'administration': return <AdministratorManagement />;
      case 'roles': return <RolesPage />;
      case 'signalements': return <SignalementsPage />;
      case 'accueil':
      default:
        return (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome, <span className="text-yellow-300">{user ? user.firstName || 'Admin' : 'Admin'}</span>
              </h1>
              <p className="text-blue-100">Are you ready to connect with other people?</p>
            </div>

            <div className="p-8">
              {loading ? ( 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <div className="col-span-5 text-center">Chargement des statistiques...</div>
                </div>
              ) : (
                user && AuthService.hasPermission(user, 'manage_users') && <DashboardStats stats={stats} />
              )}

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quel module souhaitez-vous accéder ?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredModules.map((module, index) => (
                    <ModuleCard
                      key={index}
                      title={module.title}
                      icon={module.icon}
                      onClick={() => handleModuleClick(module.key)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeItem={activeItem}
        handleNavigation={handleModuleClick}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <Breadcrumbs items={getBreadcrumbItems()} />
          </div>
          {renderContent()}
        </main>
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
          Copyright @ Mboa Events Admin 2024. All right Reserved.
        </footer>
      </div>
    </div>
  );
};

export default HomePage;