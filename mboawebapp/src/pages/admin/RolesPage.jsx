import React from 'react';

const RolesPage = () => {
  return (
    <div>
        <div className="bg-white border-b border-gray-200 px-8 py-6 -mx-8 -mt-8 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Gestion des Rôles</h1>
            <p className="mt-1 text-sm text-gray-500">
                Définissez les permissions pour chaque rôle d'utilisateur.
            </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    </div>
  );
};

export default RolesPage; 