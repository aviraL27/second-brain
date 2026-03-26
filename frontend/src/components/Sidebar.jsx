import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Code, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }) => {
    // Basic active state check. You can make this exact if needed.
    const isActive = location.pathname === to && location.search === '';
    
    return (
      <Link 
        to={to} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
          fontWeight: isActive ? 500 : 400,
          textDecoration: 'none',
          marginBottom: '0.25rem',
          transition: 'all 0.1s ease',
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = '#F0EEEC';
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        {label}
      </Link>
    );
  };

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      borderRight: '1px solid var(--border-color)',
      backgroundColor: '#F9F9F8',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      flexShrink: 0
    }}>
      {/* Profile Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        padding: '0.5rem', 
        marginBottom: '1.5rem',
        cursor: 'default'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: 'var(--text-secondary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          {user?.username}'s Brain
        </div>
      </div>

      {/* Main Navigation */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '1rem' }}>
          <NavItem to="/dashboard" icon={Home} label="Home" />
          <NavItem to="/dashboard?filter=note" icon={Book} label="Notes" />
          <NavItem to="/dashboard?filter=code" icon={Code} label="Code Snippets" />
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <button 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 0.75rem',
            width: '100%',
            color: 'var(--text-secondary)',
            textAlign: 'left',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EEEC'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={logout}
        >
          <LogOut size={18} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
