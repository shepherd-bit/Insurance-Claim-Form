// src/components/HomePage.jsx
import React from 'react';

function HomePage({ onBegin }) {
  return (
    <div className="homepage-wrapper fade-in" style={styles.wrapper}>
      {/* 1. Luxury Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          {/* Custom Logo Area */}
          <div style={styles.logoContainer}>
            {/* 
              Your custom logo goes here! 
              You can swap this <img> src for your actual file path once ready.
            */}
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Shepherd Logo" 
              style={styles.logo} 
              onError={(e) => {
                // Fallback text if image isn't loaded yet
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span style={styles.logoFallback}>SHEPHERD</span>
          </div>

          {/* System Status Tracker */}
          <div style={styles.statusIndicator}>
            <span style={styles.statusDot}>●</span> System Status: Fully Operational
          </div>
        </div>
      </header>

      {/* 2. Hero Section Split */}
      <main style={styles.mainContainer}>
        {/* Left Column: Reassurance & Action */}
        <div style={styles.leftColumn}>
          <p style={styles.slogan}>Always watching. Always covered.</p>
          <h1 style={styles.headline}>Rest easy.<br />We’ve got it from here.</h1>
          <p style={styles.subtext}>
            We understand that accidents are overwhelming. That’s why Shepherd is already on standby. 
            Let’s get your auto claim sorted securely, step-by-step.
          </p>
          <div style={styles.metaInfo}>
            <span>⏱️ Average completion time: 10–15 minutes</span>
          </div>
          <button onClick={onBegin} className="btn-gold" style={styles.button}>
            Begin Request
          </button>
        </div>

        {/* Right Column: High-End Visual Element */}
        <div style={styles.rightColumn}>
          <div style={styles.imageFrame}>
            {/* 
              Modern luxury electric vehicle asset frame.
              Swap this src out with your image resource once available.
            */}
            <img 
              src={`${import.meta.env.BASE_URL}hero-0.jpg`} 
              alt="Luxury secure vehicle driving through scenic morning vista" 
              style={styles.heroImage}
              onError={(e) => {
                // If the file path doesn't exist yet, it displays a premium styled placeholder
                e.target.parentNode.style.background = 'linear-gradient(135deg, #ffffff 0%, #f7f5f0 100%)';
                e.target.parentNode.style.border = '1px solid #d4af37';
              }}
            />
          </div>
        </div>
      </main>

      {/* 3. Utility Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <a href="#resume" style={styles.footerLink}>
            Already started a claim? Click here to resume your draft.
          </a>
          <span style={styles.footerSeparator}>|</span>
          <span style={styles.emergencyLine}>
            Need immediate roadside assistance? <strong>Call 1-800-555-SHEP</strong>
          </span>
          <span style={styles.footerSeparator}>|</span>
          <span style={styles.encryptionBadge}>🔒 256-Bit Encrypted Secure Legal Portal</span>
        </div>
      </footer>
    </div>
  );
}

// Inline styles layout system matching the gold/white/charcoal luxury directive
const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--bg-white)',
  },
  header: {
    borderBottom: '1px solid var(--border-light)',
    backgroundColor: 'var(--bg-white)',
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
    objectFit: 'contain',
  },
  logoFallback: {
    display: 'none', // Becomes active via onError if image is missing
    fontFamily: 'serif',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'var(--primary-gold)',
    letterSpacing: '2px',
  },
  statusIndicator: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusDot: {
    color: 'var(--primary-gold)',
    fontSize: '1.1rem',
  },
  mainContainer: {
    maxWidth: '1200px',
    margin: 'auto auto',
    padding: '4rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '1 1 400px',
  },
  slogan: {
    color: 'var(--primary-gold)',
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1rem',
  },
  headline: {
    fontSize: '3.2rem',
    color: 'var(--text-charcoal)',
    marginBottom: '1.5rem',
  },
  subtext: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
  },
  metaInfo: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '2.5rem',
  },
  button: {
    padding: '1.2rem 3.5rem',
  },
  rightColumn: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 1 400px',
  },
  imageFrame: {
    width: '100%',
    aspectRatio: '4/3',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-premium)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  footer: {
    borderTop: '1px solid var(--border-light)',
    padding: '1.5rem 0',
    backgroundColor: 'var(--bg-offwhite)',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  footerLink: {
    color: 'var(--text-charcoal)',
    textDecoration: 'none',
    fontWeight: '500',
  },
  footerSeparator: {
    color: 'var(--border-light)',
  },
  emergencyLine: {
    color: 'var(--text-charcoal)',
  },
  encryptionBadge: {
    fontWeight: '500',
  },
};

export default HomePage;