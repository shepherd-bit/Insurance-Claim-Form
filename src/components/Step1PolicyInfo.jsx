// src/components/Step1PolicyInfo.jsx
import React from 'react';

function Step1PolicyInfo({ formData, updateFormData, errors }) {
  return (
    <div className="fade-in">
      <h2 style={styles.title}>Policyholder & Driver Information</h2>
      <p style={styles.subtitle}>Please provide your policy authentication identity and specify who was operating the vehicle at the exact time of the incident.</p>

      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Full Name */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name of Policyholder *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            style={{
              ...styles.input,
              borderColor: errors.fullName ? 'var(--error-red)' : 'var(--border-light)'
            }}
            placeholder="John Doe"
          />
          {errors.fullName && <span style={styles.errorText}>{errors.fullName}</span>}
        </div>

        {/* Contact Matrix */}
        <div style={styles.grid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              style={styles.input}
              placeholder="(555) 000-0000"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              style={styles.input}
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Policy Identification */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Policy Number *</label>
          <input
            type="text"
            value={formData.policyNumber}
            onChange={(e) => updateFormData({ policyNumber: e.target.value })}
            style={{
              ...styles.input,
              borderColor: errors.policyNumber ? 'var(--error-red)' : 'var(--border-light)'
            }}
            placeholder="SHP-992384-X"
          />
          {errors.policyNumber && <span style={styles.errorText}>{errors.policyNumber}</span>}
        </div>

        {/* Driver Conditional Dropdown Trigger */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Who was driving the vehicle?</label>
          <select
            value={formData.driverStatus}
            onChange={(e) => updateFormData({ driverStatus: e.target.value })}
            style={styles.select}
          >
            <option value="policyholder">Policyholder (Myself)</option>
            <option value="listed">Listed Driver on Policy</option>
            <option value="other">Other (Third Party Operator)</option>
          </select>
        </div>

        {/* Conditional Field Spawning */}
        {formData.driverStatus === 'other' && (
          <div style={styles.conditionalBox} className="fade-in">
            <h4 style={styles.condTitle}>Operator Authorization Profile</h4>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Driver's Full Name *</label>
              <input
                type="text"
                value={formData.otherDriverName}
                onChange={(e) => updateFormData({ otherDriverName: e.target.value })}
                style={{
                  ...styles.input,
                  borderColor: errors.otherDriverName ? 'var(--error-red)' : 'var(--border-light)'
                }}
                placeholder="Jane Doe"
              />
              {errors.otherDriverName && <span style={styles.errorText}>{errors.otherDriverName}</span>}
            </div>

            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Driver License Number</label>
                <input
                  type="text"
                  value={formData.otherDriverLicense}
                  onChange={(e) => updateFormData({ otherDriverLicense: e.target.value })}
                  style={styles.input}
                  placeholder="DL-8823948"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Relationship to Policyholder</label>
                <input
                  type="text"
                  value={formData.otherDriverRelationship}
                  onChange={(e) => updateFormData({ otherDriverRelationship: e.target.value })}
                  style={styles.input}
                  placeholder="Spouse, Child, Friend..."
                />
              </div>
            </div>
          </div>
        )}
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-charcoal)',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    fontSize: '1rem',
    color: 'var(--text-charcoal)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  select: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    fontSize: '1rem',
    color: 'var(--text-charcoal)',
    backgroundColor: '#fff',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  errorText: {
    fontSize: '0.8rem',
    color: 'var(--error-red)',
    marginTop: '-0.25rem',
  },
  conditionalBox: {
    backgroundColor: 'var(--bg-offwhite)',
    borderLeft: '4px solid var(--primary-gold)',
    borderRadius: '0 8px 8px 0',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginTop: '0.5rem',
  },
  condTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-charcoal)',
    marginBottom: '-0.25rem',
  }
};

export default Step1PolicyInfo;