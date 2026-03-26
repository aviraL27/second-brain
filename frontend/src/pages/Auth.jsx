import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="literature-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            A calm space for your thoughts.
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: '#FDF2F1', color: 'var(--danger-color)', borderRadius: '6px', fontSize: '0.9rem', border: '1px solid #F9DEDC' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input 
              type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'transparent' }}
            />
          )}
          <input 
            type="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'transparent' }}
          />
          <input 
            type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'transparent' }}
          />
          <button type="submit" style={{ padding: '0.75rem', backgroundColor: 'var(--text-primary)', color: '#FFFFFF', borderRadius: '4px', fontWeight: 500, marginTop: '0.5rem', transition: 'opacity 0.2s' }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
