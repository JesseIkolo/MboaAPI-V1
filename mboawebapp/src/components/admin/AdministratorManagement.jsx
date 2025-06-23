import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import AdministratorList from './AdministratorList';
import AdministratorDetails from './AdministratorDetails';
import api from '../../services/api';

const defaultPermissions = [
    'manage_users',
    'manage_events',
    'manage_partners',
    'manage_transactions',
    'manage_ads',
    'manage_chats',
    'validate_admins',
];

const AdministratorManagement = () => {
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        permissions: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm((prev) => ({
                ...prev,
                permissions: checked
                    ? [...prev.permissions, value]
                    : prev.permissions.filter((perm) => perm !== value),
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.post('/users', {
                    ...form,
                    role: 'admin',
            });
            
            setSuccess('Administrateur ajouté avec succès !');
            setForm({ firstName: '', lastName: '', email: '', password: '', permissions: [] });
            setShowAddModal(false);
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Erreur lors de la création');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-2">
                    Liste des administrateur en attente
                </h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-50"
                >
                    + Ajouter un administrateur
                </button>
            </div>

            <div className="flex h-[calc(100vh-12rem)]">
                {/* Left Panel - Administrator List */}
                <div className="w-2/3 border-r border-gray-200 bg-white">
                    <AdministratorList
                        onSelectAdmin={setSelectedAdmin}
                        selectedAdmin={selectedAdmin}
                    />
                </div>

                {/* Right Panel - Administrator Details */}
                <div className="w-1/3 bg-white">
                    <div className="h-full flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex items-center">
                            <button
                                onClick={() => setSelectedAdmin(null)}
                                className="text-gray-500 hover:text-gray-700 flex items-center"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                Back
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <AdministratorDetails admin={selectedAdmin} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal d'ajout d'administrateur */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Ajouter un administrateur</h2>
                        {error && <div className="mb-2 text-red-600">{error}</div>}
                        {success && <div className="mb-2 text-green-600">{success}</div>}
                        <form onSubmit={handleAddAdmin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Nom</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Mot de passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Droits (permissions)</label>
                                <div className="flex flex-wrap gap-2">
                                    {defaultPermissions.map((perm) => (
                                        <label key={perm} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                name="permissions"
                                                value={perm}
                                                checked={form.permissions.includes(perm)}
                                                onChange={handleInputChange}
                                                className="mr-1"
                                            />
                                            {perm}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading ? 'Ajout en cours...' : 'Ajouter'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdministratorManagement; 