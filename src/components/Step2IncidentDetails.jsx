// src/components/Step2IncidentDetails.jsx
import React from 'react';

function Step2IncidentDetails({ formData, updateFormData, errors }) {
  return (
    <div className="fade-in">
      <h2 style={styles.title}>Incident Details</h2>
      <p style={styles.subtitle}>Specify exactly when, where, and how the event occurred to build your claim timeline.</p>

      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Date and Time Grid */}
        <div style={styles.grid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Incident *</label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]} // Blocks choosing future dates
              value={formData.incidentDate}
              onChange={(e) => updateFormData({ incidentDate: e.target.value })}
              style={{
                ...styles.input,
                borderColor: errors.incidentDate ? 'var(--error-red)' : 'var(--border-light)'
              }}
            />
            {errors.incidentDate && <span style={styles.errorText}>{errors.incidentDate}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Approximate Time</label>
            <input
              type="time"
              value={formData.incidentTime}
              onChange={(e) => updateFormData({ incidentTime: e.target.value })}
              style={styles.input}
            />
          </div>
        </div>

        {/* Location Address */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Exact Street Address or Nearest Intersection *</label>
          <input
            type="text"
            value={formData.incidentLocation}
            onChange={(e) => updateFormData({ incidentLocation: e.target.value })}
            style={{
              ...styles.input,
              borderColor: errors.incidentLocation ? 'var(--error-red)' : 'var(--border-light)'
            }}
            placeholder="e.g., 5th Ave and Broadway, New York, NY"
          />
          {errors.incidentLocation && <span style={styles.errorText}>{errors.incidentLocation}</span>}
        </div>

        {/* Core Incident Type Conditional Dropdown */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Type of Incident</label>
          <select
            value={formData.incidentType}
            onChange={(e) => updateFormData({ incidentType: e.target.value })}
            style={styles.select}
          >
            <option value="single-vehicle">Single Vehicle Accident (Tree, Guardrail, etc.)</option>
            <option value="multi-vehicle">Multi-Vehicle Crash (Involving other drivers)</option>
            <option value="vandalism">Vandalism / Theft / Break-in</option>
            <option value="weather">Weather / Hail / Tree Limb Damage</option>
          </select>
        </div>

        {/* Conditional Spawning for Multi-Vehicle Configurations */}
        {formData.incidentType === 'multi-vehicle' && (
          <div style={styles.conditionalBox} className="fade-in">
            <h4 style={styles.condTitle}>Other Party Involvement Details</h4>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Other Driver's Full Name *</label>
              <input
                type="text"
                value={formData.otherPartyName}
                onChange={(e) => updateFormData({ otherPartyName: e.target.value })}
                style={{
                  ...styles.input,
                  borderColor: errors.otherPartyName ? 'var(--error-red)' : 'var(--border-light)'
                }}
                placeholder="Third Party Driver Name"
              />
              {errors.otherPartyName && <span style={styles.errorText}>{errors.otherPartyName}</span>}
            </div>

            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Insurance Company</label>
                <input
                  type="text"
                  value={formData.otherPartyInsurance}
                  onChange={(e) => updateFormData({ otherPartyInsurance: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., State Farm"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Policy Number (If known)</label>
                <input
                  type="text"
                  value={formData.otherPartyPolicy}
                  onChange={(e) => updateFormData({ otherPartyPolicy: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., POL-99384"
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

export default Step2IncidentDetails;