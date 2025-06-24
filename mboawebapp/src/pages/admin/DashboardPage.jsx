import React, { useState, useEffect } from 'react';
import {  Users, TrendingUp, Clock } from 'lucide-react';
import config from '../../config/env';
import WaitlistPage from './WaitlistPage';
import DashboardStats from '../../components/admin/DashboardStats';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalEvents: 0,
        activeEvents: 0,
        totalUsers: 0,
        totalPartners: 0,
        recentEvents: [],
        topEvents: [],
        waitlistStats: {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0
        },
        recentWaitlist: [],
        premiumUsers: 0,
        freemiumUsers: 0,
        monthlyRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token non trouvé');

            const response = await fetch(`${config.API_URL}/api/stats/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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

            console.log('Stats mappées pour DashboardStats:', {
                totalEvents: data.events,
                totalPartners: data.businesses,
                waitlistStats: { total: data.waitlist },
                premiumUsers: data.premiumUsers,
                freemiumUsers: data.freemiumUsers,
                monthlyRevenue: data.monthlyRevenue,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                Tableau de bord
            </h1>

            {/* Statistiques générales */}
            <DashboardStats stats={stats} loading={loading} error={error} />

            {/* Événements récents, populaires et Liste d'attente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Événements récents */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Événements récents</h2>
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {stats.recentEvents.map(event => (
                            <div key={event._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{event.title}</p>
                                    <p className="text-sm text-gray-500">{formatDate(event.startDateTime)}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    event.status === 'published' ? 'bg-green-100 text-green-800' :
                                    event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {event.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Événements populaires */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Événements populaires</h2>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {stats.topEvents.map(event => (
                            <div key={event._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{event.title}</p>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{event.participants} participants</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{event.likes} likes</p>
                                    <p className="text-xs text-gray-500">{event.views} vues</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Liste d'attente */}
                <div className="bg-white p-2 rounded-lg shadow">
                    <WaitlistPage />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 