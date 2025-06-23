import React from 'react';
import StatCard from '../global/StatCard';

const DashboardStats = ({ stats, loading, error }) => {
    console.log('DashboardStats props:', stats);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            <StatCard
                title="Waitinglist"
                value={stats?.waitlistStats?.total || 0}
                bgColor="bg-blue-50"
                isLoading={loading}
                error={error}
            />
            <StatCard
                title="Événements"
                value={stats?.totalEvents || 0}
                bgColor="bg-blue-50"
                isLoading={loading}
                error={error}
            />
            <StatCard
                title="Partenaires Business"
                value={stats?.totalPartners || 0}
                bgColor="bg-green-50"
                isLoading={loading}
                error={error}
            />
            <StatCard
                title="Revenue Mensuel"
                value={stats?.monthlyRevenue || 0}
                bgColor="bg-purple-50"
                isLoading={loading}
                error={error}
            />
            <StatCard
                title="Utilisateurs Premium"
                value={stats?.premiumUsers || 0}
                bgColor="bg-orange-50"
                isLoading={loading}
                error={error}
            />
            <StatCard
                title="Utilisateurs Freemium"
                value={stats?.freemiumUsers || 0}
                bgColor="bg-yellow-50"
                isLoading={loading}
                error={error}
            />
        </div>
    );
};

export default DashboardStats; 