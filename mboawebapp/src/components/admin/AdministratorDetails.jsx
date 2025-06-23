import React, { useState } from 'react';
import { Clock, X, Trash2, Unlock, Shield } from 'lucide-react';
import api from '../../services/api'; // Importer notre service api

const AdministratorDetails = ({ admin, onAdminUpdated }) => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showConfirmUnblock, setShowConfirmUnblock] = useState(false);

    // Liste des permissions disponibles
    const availablePermissions = [
        { id: 'manage_users', label: 'Gestion des utilisateurs' },
        { id: 'manage_events', label: 'Gestion des événements' },
        { id: 'manage_partners', label: 'Gestion des partenaires' },
        { id: 'manage_transactions', label: 'Gestion des transactions' },
        { id: 'manage_ads', label: 'Gestion des publicités' },
        { id: 'manage_chats', label: 'Gestion de la messagerie' },
        { id: 'validate_admins', label: 'Validation des administrateurs' }
    ];

    if (!admin) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                Sélectionnez un administrateur pour voir les détails
            </div>
        );
    }

    const handleApprove = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!admin._id) throw new Error('ID de l\'administrateur non valide');

            const requestData = {
                permissions: selectedPermissions,
                isAdminValidated: true,
                role: 'admin'
            };

            // Utiliser api.put pour la mise à jour
            await api.put(`/users/${admin._id}`, requestData);

            if (onAdminUpdated) onAdminUpdated();
        } catch (err) {
            console.error('Erreur complète:', err);
            setError(err.response?.data?.message || err.message || 'Erreur lors de la validation');
        } finally {
            setLoading(false);
        }
    };

    const togglePermission = (permissionId) => {
        setSelectedPermissions(prev => 
            prev.includes(permissionId)
                ? prev.filter(p => p !== permissionId)
                : [...prev, permissionId]
        );
    };

    // Action: Révoquer
    const handleRevoke = async () => {
        setLoading(true);
        setError(null);
        try {
            // Utiliser api.delete
            await api.delete(`/users/${admin._id}`);
            setShowConfirmDelete(false);
            if (onAdminUpdated) onAdminUpdated();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Action: Débloquer
    const handleUnblock = async () => {
        setLoading(true);
        setError(null);
        try {
            // Utiliser api.patch
            await api.patch(`/users/${admin._id}/unblock`);
            setShowConfirmUnblock(false);
            if (onAdminUpdated) onAdminUpdated();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Action: Gérer les droits (ouvrir le modal)
    const openPermissionsModal = () => {
        setSelectedPermissions(admin.permissions || []);
        setShowPermissionsModal(true);
    };

    return (
        <div className="h-full p-6 bg-gray-50">
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center mb-8">
                <div className="flex-shrink-0">
                    {admin.avatar ? (
                        <img
                            src={admin.avatar || 'https://placehold.co/100x100'}
                            alt={`${admin.firstName} ${admin.lastName}`}
                            className="h-16 w-16 rounded-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xl font-medium">
                                {admin.firstName?.[0]}
                                {admin.lastName?.[0]}
                            </span>
                        </div>
                    )}
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {admin.firstName} {admin.lastName}
                    </h2>
                    <p className="text-gray-500">{admin.email}</p>
                    <p className="text-sm text-gray-400">@{admin.username}</p>
                </div>
                <div className="ml-auto flex flex-col space-y-2">
                    {!admin.isAdminValidated && (
                        <button
                            onClick={() => handleApprove()}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 mb-2"
                        >
                            {loading ? 'Validation...' : 'APPROUVER'}
                        </button>
                    )}
                    <button
                        onClick={openPermissionsModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    >
                        <Shield className="w-4 h-4 mr-1" /> Gérer les droits
                    </button>
                    {admin.isBlocked && (
                        <button
                            onClick={() => setShowConfirmUnblock(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center"
                        >
                            <Unlock className="w-4 h-4 mr-1" /> Débloquer
                        </button>
                    )}
                    {admin.role !== 'superadmin' && (
                        <button
                            onClick={() => setShowConfirmDelete(true)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                        >
                            <Trash2 className="w-4 h-4 mr-1" /> Révoquer
                        </button>
                    )}
                </div>
            </div>

            {/* Permissions actuelles */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                <div className="flex flex-wrap gap-2">
                    {admin.permissions?.map((permission) => (
                        <div key={permission} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg">
                            <span className="text-sm font-medium">
                                {availablePermissions.find(p => p.id === permission)?.label || permission}
                            </span>
                        </div>
                    ))}
                    {(!admin.permissions || admin.permissions.length === 0) && (
                        <p className="text-gray-500 text-sm">Aucune permission attribuée</p>
                    )}
                </div>
            </div>

            {/* Modal de sélection des permissions */}
            {showPermissionsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Gérer les droits</h3>
                            <button
                                onClick={() => setShowPermissionsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3 mb-6">
                            {availablePermissions.map((permission) => (
                                <label key={permission.id} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedPermissions.includes(permission.id)}
                                        onChange={() => togglePermission(permission.id)}
                                    />
                                    <span>{permission.label}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            onClick={handleApprove}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Mise à jour...' : 'Enregistrer les droits'}
                        </button>
                    </div>
                </div>
            )}

            {/* Modal confirmation révocation */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Confirmer la révocation</h3>
                        <p>Voulez-vous vraiment révoquer cet administrateur ? Cette action est irréversible.</p>
                        <div className="flex justify-end mt-6 space-x-2">
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >Annuler</button>
                            <button
                                onClick={handleRevoke}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                disabled={loading}
                            >
                                {loading ? 'Suppression...' : 'Révoquer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal confirmation déblocage */}
            {showConfirmUnblock && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Confirmer le déblocage</h3>
                        <p>Voulez-vous vraiment débloquer cet administrateur ?</p>
                        <div className="flex justify-end mt-6 space-x-2">
                            <button
                                onClick={() => setShowConfirmUnblock(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >Annuler</button>
                            <button
                                onClick={handleUnblock}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                disabled={loading}
                            >
                                {loading ? 'Déblocage...' : 'Débloquer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Activity */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activités récentes</h3>
                <div className="space-y-4">
                    {admin.activities?.map((activity, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">
                                    {activity.description}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(activity.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    {(!admin.activities || admin.activities.length === 0) && (
                        <p className="text-gray-500 text-sm">Aucune activité récente</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdministratorDetails; 