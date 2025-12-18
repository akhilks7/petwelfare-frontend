import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '8rem', margin: 0, fontWeight: 'bold' }}>404</h1>
      <h2 style={{ fontSize: '2rem', margin: '20px 0' }}>Oops! Page Not Found</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={goHome}
        style={{
          padding: '12px 25px',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '50px',
          border: 'none',
          backgroundColor: '#ff6b6b',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: '0.3s'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#ff4757'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#ff6b6b'}
      >
        Go to Home
      </button>
      <div style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.8 }}>
         Tip: Check the URL or go back to the homepage.
      </div>
    </div>
  );
}

export default PageNotFound;