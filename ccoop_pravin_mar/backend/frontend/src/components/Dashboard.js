import React from 'react';
import StudentDashboard from './StudentDashboard';
import DropHostDashboard from './DropHostDashboard';
import CuratorDashboard from './CuratorDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const userRole = localStorage.getItem('user_role') || 'STUDENT';

  // Route to appropriate dashboard based on role
  switch (userRole) {
    case 'DROP_HOST':
      return <DropHostDashboard />;
    case 'CAMPUS_CURATOR':
      return <CuratorDashboard />;
    case 'GLOBAL_ADMIN':
      return <AdminDashboard />;
    case 'STUDENT':
    default:
      return <StudentDashboard />;
  }
}

export default Dashboard;
