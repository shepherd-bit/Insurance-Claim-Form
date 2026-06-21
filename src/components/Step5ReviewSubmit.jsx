// src/components/Step5ReviewSubmit.jsx
import React, { useState } from 'react';

function Step5ReviewSubmit({ formData, setCurrentStep }) {
  const [declaredTrue, setDeclaredTrue] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (declaredTrue) {
      setSubmitted(true);
      // Here you would connect to an API endpoint to register the raw record payload
    }
  };

  // Success Confirmation Screen Layout
  if (submitted) {
    return (
      <div style={styles.successScreen} className="fade-in">
        <span style={styles.successIcon}>🛡️</span>
        <h2 style={styles.title}>Claim Successfully Filed</h2>
        <p style={styles.subtitle}>
          Thank you, <strong>{formData.fullName}</strong>. Your transmission has been securely logged under tracking ID <strong>SHEP-{Math.floor(100000 + Math.random() * 900000)}</strong>.
        </p>
        <div style={styles.successCard}>
          <p>A claims adjuster is reviewing your summary. We will contact you at <strong>{formData.email || formData.phone}</strong> within 24 business hours.</p>
        </div>
        <button onClick={() => window.location.reload()} className="btn-gold" style={styles.btnHome}>
          Return to Portal
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 style={styles.title}>Review & Submit</h2>
      <p style={styles.subtitle}>Please cross-examine all data modules below for precision before issuing submission validation execution.</p>

      <div style={styles.reviewStack}>
        {/* Card 1: Policyholder Records */}
        <div style={styles.reviewCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>1. Policy & Operator Profiles</h3>
            <button type="button" onClick={() => setCurrentStep(1)} style={styles.btnEdit}>Edit</button>
          </div>
          <div style={styles.cardContent}>
            <p><strong>Claimant Name:</strong> {formData.fullName}</p>
            <p><strong>Policy ID:</strong> {formData.policyNumber}</p>
            <p><strong>Contact Info:</strong> {formData.phone || 'N/A'} | {formData.email || 'N/A'}</p>
            <p><strong>Driver Mode:</strong> {formData.driverStatus}</p>
            {formData.driverStatus === 'other' && (
              <div style={styles.nestedReview}>
                <p><strong>Operator Name:</strong> {formData.otherDriverName}</p>
                <p><strong>License ID:</strong> {formData.otherDriverLicense || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Incident Records */}
        <div style={styles.reviewCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>2. Incident Timeline</h3>
            <button type="button" onClick={() => setCurrentStep(2)} style={styles.btnEdit}>Edit</button>
          </div>
          <div style={styles.cardContent}>
            <p><strong>Incident Date/Time:</strong> {formData.incidentDate} at {formData.incidentTime || 'Unspecified'}</p>
            <p><strong>Event Location:</strong> {formData.incidentLocation}</p>
            <p><strong>Classification:</strong> {formData.incidentType}</p>
            {formData.incidentType === 'multi-vehicle' && (
              <div style={styles.nestedReview}>
                <p><strong>Third Party Name:</strong> {formData.otherPartyName}</p>
                <p><strong>Insurance Provider:</strong> {formData.otherPartyInsurance || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Damage Configuration Records */}
        <div style={styles.reviewCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>3. Damage Matrix & Injuries</h3>
            <button type="button" onClick={() => setCurrentStep(3)} style={styles.btnEdit}>Edit</button>
          </div>
          <div style={styles.cardContent}>
            <p><strong>Impact Zones Selected:</strong> {formData.damagedZones.length > 0 ? formData.damagedZones.join(', ') : 'No zones selected'}</p>
            <p><strong>Bodily Injuries Status:</strong> {formData.hasInjuries === 'yes' ? '⚠️ Yes, Injuries Reported' : 'No injuries reported'}</p>
            {formData.hasInjuries === 'yes' && <p><strong>Injury Descriptions:</strong> {formData.injuryDetails}</p>}
          </div>
        </div>

        {/* Card 4: Documentation Records */}
        <div style={styles.reviewCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>4. Verification Assets</h3>
            <button type="button" onClick={() => setCurrentStep(4)} style={styles.btnEdit}>Edit</button>
          </div>
          <div style={styles.cardContent}>
            <p><strong>Attached Documents/Photos:</strong> {formData.uploadedFiles.length} file(s) attached</p>
            {formData.uploadedFiles.length > 0 && (
              <ul style={styles.fileList}>
                {formData.uploadedFiles.map(f => <li key={f.id} style={styles.fileItem}>📄 {f.name} ({f.size})</li>)}
              </ul>
            )}
          </div>
        </div>

        {/* Mandatory Legal State Fraud Text Block and Declaration Interactivity */}
        <div style={styles.fraudBox}>
          <h4 style={styles.fraudTitle}>⚠️ State Fraud Warning</h4>
          <p style={styles.fraudText}>
            Any person who knowingly and with intent to defraud any insurance company files an application for insurance or statement of claim containing any materially false information commits a fraudulent insurance act, which is a crime and subjects such person to criminal and civil penalties.
          </p>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={declaredTrue}
              onChange={(e) => setDeclaredTrue(e.target.checked)}
              style={styles.checkbox}
            />
            <strong>I declare under penalty of perjury that the information provided is true and accurate to the best of my knowledge.</strong>
          </label>
        </div>

        {/* Final Form Trigger Execution */}
        <button
          onClick={handleSubmit}
          disabled={!declaredTrue}
          className="btn-gold"
          style={{
            ...styles.btnSubmit,
            opacity: declaredTrue ? 1 : 0.4,
            cursor: declaredTrue ? 'pointer' : 'not-allowed',
            transform: 'none'
          }}
        >
          Submit Comprehensive Claim
        </button>
      </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.6rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.95rem',
    marginBottom: '2rem',
  },
  reviewStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  reviewCard: {
    border: '1px solid var(--border-light)',
    borderRadius: '10px',
    padding: '1.25rem 1.5rem',
    backgroundColor: 'var(--bg-offwhite)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '0.5rem',
    marginBottom: '0.75rem',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '700',
  },
  btnEdit: {
    fontSize: '0.85rem',
    color: 'var(--primary-gold)',
    fontWeight: '600',
  },
  cardContent: {
    fontSize: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  nestedReview: {
    backgroundColor: '#fff',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    borderLeft: '2px solid var(--primary-gold)',
    marginTop: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  fileList: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginTop: '0.25rem',
  },
  fileItem: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  fraudBox: {
    border: '1px dashed #f2c7c7',
    backgroundColor: '#fff8f8',
    borderRadius: '10px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  fraudTitle: {
    color: 'var(--error-red)',
    fontSize: '0.95rem',
    fontWeight: '700',
  },
  fraudText: {
    fontSize: '0.85rem',
    color: 'var(--text-charcoal)',
    lineHeight: '1.5',
    textAlign: 'justify',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontSize: '0.85rem',
    color: 'var(--text-charcoal)',
    cursor: 'pointer',
    lineHeight: '1.4',
  },
  checkbox: {
    accentColor: 'var(--primary-gold)',
    width: '16px',
    height: '16px',
    marginTop: '2px',
  },
  btnSubmit: {
    width: '100%',
    padding: '1.2rem',
    fontSize: '1.1rem',
    marginTop: '1rem',
  },
  successScreen: {
    textAlign: 'center',
    padding: '3rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  successIcon: {
    fontSize: '4rem',
  },
  successCard: {
    maxWidth: '500px',
    backgroundColor: 'var(--bg-offwhite)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    fontSize: '0.95rem',
    marginTop: '1rem',
  },
  btnHome: {
    marginTop: '2rem',
  },
};

export default Step5ReviewSubmit;