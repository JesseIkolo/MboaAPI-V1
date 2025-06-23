import React from 'react';

const MessagingPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">Messagerie</h1>
      <p className="mt-2 text-gray-600">Cette page contiendra l'interface de messagerie pour le support ou les communications.</p>
       <div className="mt-6 bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default MessagingPage; 