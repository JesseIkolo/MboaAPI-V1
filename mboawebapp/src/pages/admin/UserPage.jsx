import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import api from '../../services/api';
import UserList from '../../components/users/UserList';
import UserDetails from '../../components/users/UserDetails';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        reportStatus: 'all'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            // Filtrer pour ne garder que les utilisateurs (pas les admins)
            const regularUsers = response.data.filter(user => user.role === 'user');
            setUsers(regularUsers);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleUserStatusUpdate = async (userId, action) => {
        try {
            await api.put(`/users/${userId}/${action}`);
            await fetchUsers();
            
            if (selectedUser?._id === userId) {
                const updatedUserResponse = await api.get(`/users/${userId}`);
                setSelectedUser(updatedUserResponse.data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filters.status === 'all' || user.status === filters.status;
        const matchesReportStatus = filters.reportStatus === 'all' || 
            (filters.reportStatus === 'reported' ? user.reports?.length > 0 : user.reports?.length === 0);

        return matchesSearch && matchesStatus && matchesReportStatus;
    });

    return (
        <div className="h-[calc(100vh-14rem)]">
            {/* En-tête de la page */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 -mx-8 -mt-8 mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Gestion des Utilisateurs</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Gérez et supervisez tous les utilisateurs de la plateforme
                </p>
            </div>

            {/* Contenu principal */}
            <div className="flex h-full">
                {/* Section gauche - Liste des utilisateurs */}
                <div className="w-2/3 border-r border-gray-200 bg-white p-6">
                    {/* Barre de recherche et filtres */}
                    <div className="mb-6">
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un utilisateur..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Filter className="w-5 h-5 mr-2" />
                                Filtres
                            </button>
                        </div>

                        {/* Filtres */}
                        <div className="flex gap-4">
                            <select
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="active">Actif</option>
                                <option value="blocked">Bloqué</option>
                                <option value="pending">En attente</option>
                            </select>

                            <select
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={filters.reportStatus}
                                onChange={(e) => handleFilterChange('reportStatus', e.target.value)}
                            >
                                <option value="all">Tous les signalements</option>
                                <option value="reported">Signalés</option>
                                <option value="not_reported">Non signalés</option>
                            </select>
                        </div>
                    </div>

                    {/* Liste des utilisateurs */}
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 p-4">
                            {error}
                        </div>
                    ) : (
                        <UserList 
                            users={filteredUsers}
                            onUserSelect={handleUserSelect}
                            selectedUserId={selectedUser?._id}
                            onUserStatusUpdate={handleUserStatusUpdate}
                        />
                    )}
                </div>

                {/* Section droite - Détails de l'utilisateur */}
                <div className="w-1/3 bg-white p-6">
                    {selectedUser ? (
                        <UserDetails 
                            user={selectedUser} 
                            onUserUpdated={fetchUsers}
                            onUserStatusUpdate={handleUserStatusUpdate}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Sélectionnez un utilisateur pour voir les détails
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPage; 