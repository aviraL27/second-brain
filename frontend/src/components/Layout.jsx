import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Sidebar';

const Layout = () => {
  const { user, loading } = useAuth();

  // Show nothing while verifying local storage token on load
  if (loading) return null; 
  
  // Enforce Bouncer rules!
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-container">
      <Sidebar />
      
      {/* Main Content scrollable area */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-color)', padding: '3rem 5rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
