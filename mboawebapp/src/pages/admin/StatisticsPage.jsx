import React, { useState, useEffect } from 'react';
import DashboardStats from '../../components/admin/DashboardStats';
import config from '../../config/env';

const StatisticsPage = () => {
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalPartners: 0,
        waitlistStats: { total: 0 },
        premiumUsers: 0,
        freemiumUsers: 0,
        monthlyRevenue: 0,
        activeEvents: 0,
        totalUsers: 0,
        recentEvents: [],
        topEvents: [],
        recentWaitlist: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token non trouvé');
                const response = await fetch(`${config.API_URL}/api/stats/dashboard`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('------> response', response);
                if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
                const data = await response.json();
                setStats({
                    totalEvents: data.events,
                    totalPartners: data.businesses,
                    waitlistStats: { total: data.waitlist },
                    premiumUsers: data.premiumUsers,
                    freemiumUsers: data.freemiumUsers,
                    monthlyRevenue: data.monthlyRevenue,
                    activeEvents: 0,
                    totalUsers: 0,
                    recentEvents: [],
                    topEvents: [],
                    recentWaitlist: []
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    console.log('STATS POUR DASHBOARDSTATS', stats, loading, error);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Statistiques Détaillées</h1>
            <DashboardStats stats={stats} loading={loading} error={error} />
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Graphique de croissance des utilisateurs</h2>
          <div className="mt-4 h-64 bg-gray-200 rounded-md flex items-center justify-center animate-pulse">
              <p className="text-gray-500">Graphique à venir...</p>
          </div>
      </div>
    </div>
  );
};

export default StatisticsPage; 