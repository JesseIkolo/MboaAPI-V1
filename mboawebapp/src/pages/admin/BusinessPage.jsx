import React from 'react';
import BusinessList from '../../components/admin/BusinessList';
// Si tu as un layout admin, importe-le ici
// import AdminLayout from './AdminLayout';

const BusinessPage = () => (
  // <AdminLayout>
    <div className="p-4">
      <BusinessList />
    </div>
  // </AdminLayout>
);

export default BusinessPage; 