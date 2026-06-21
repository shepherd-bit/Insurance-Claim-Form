// src/components/Step3DamageAssessment.jsx
import React from 'react';

function Step3DamageAssessment({ formData, updateFormData }) {
  // Array of car sectors for the interactive matrix selection
  const carSectors = [
    { id: 'front-bumper', label: 'Front Bumper / Grille' },
    { id: 'hood', label: 'Hood / Engine Bay' },
    { id: 'windshield', label: 'Front Windshield' },
    { id: 'driver-front', label: 'Driver Side Front Door' },
    { id: 'driver-rear', label: 'Driver Side Rear Door' },
    { id: 'passenger-front', label: 'Passenger Side Front Door' },
    { id: 'passenger-rear', label: 'Passenger Side Rear Door' },
    { id: 'roof', label: 'Roof Panel' },
    { id: 'rear-quarter', label: 'Trunk / Rear Hatch' },
    { id: 'rear-bumper', label: 'Rear Bumper' }
  ];

  const handleSectorToggle = (sectorId) => {
    const isSelected = formData.damagedZones.includes(sectorId);
    let updatedZones = [];
    
    if (isSelected) {
      updatedZones = formData.damagedZones.filter(id => id !== sectorId);
    } else {
      updatedZones = [...formData.damagedZones, sectorId];
    }
    
    updateFormData({ damagedZones: updatedZones });
  };

  return (
    <div className="fade-in">
      <h2 style={styles.title}>Damage & Injury Assessment</h2>
      <p style={styles.subtitle}>Select all affected regions of your vehicle and report any physical injuries sustained during the incident.</p>

      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Interactive Damage Matrix Grid Selection */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Impact Locations (Select all that apply)</label>
          <div style={styles.matrixGrid}>
            {carSectors.map((sector) => {
              const active = formData.damagedZones.includes(sector.id);
              return (
                <button
                  type="button"
                  key={sector.id}
                  onClick={() => handleSectorToggle(sector.id)}
                  style={{
                    ...styles.matrixButton,
                    backgroundColor: active ? 'var(--primary-gold)' : 'var(--bg-offwhite)',
                    color: active ? 'var(--bg-white)' : 'var(--text-charcoal)',
                    borderColor: active ? 'var(--primary-gold)' : 'var(--border-light)'
                  }}
                >
                  {active ? '✓ ' : '+ '} {sector.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Injury Status Radio Toggle Configuration */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Were there any bodily injuries sustained in this incident? *</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="hasInjuries"
                value="no"
                checked={formData.hasInjuries === 'no'}
                onChange={() => updateFormData({ hasInjuries: 'no', injuryDetails: '' })}
                style={styles.radioInput}
              />
              No Injuries Reported
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="hasInjuries"
                value="yes"
                checked={formData.hasInjuries === 'yes'}
                onChange={() => updateFormData({ hasInjuries: 'yes' })}
                style={styles.radioInput}
              />
              Yes, Injuries Sustained
            </label>
          </div>
        </div>

        {/* Conditional Medical Emergency Field Spawning Layout */}
        {formData.hasInjuries === 'yes' && (
          <div style={styles.emergencyBox} className="fade-in">
            <div style={styles.alertHeader}>
              <span style={styles.alertIcon}>⚠️</span>
              <strong>Critical Priority Field Notification</strong>
            </div>
            <p style={styles.alertText}>
              Please describe the medical status, impacted occupants, or medical infrastructure dispatched (e.g., EMS, hospital transport status) to expedite medical payout processing.
            </p>
            <textarea
              value={formData.injuryDetails}
              onChange={(e) => updateFormData({ injuryDetails: e.target.value })}
              style={styles.textarea}
              placeholder="Provide a description of medical incidents here..."
              rows={4}
            />
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
    gap: '2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-charcoal)',
  },
  matrixGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  },
  matrixButton: {
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  radioGroup: {
    display: 'flex',
    gap: '2rem',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  radioInput: {
    accentColor: 'var(--primary-gold)',
    width: '18px',
    height: '18px',
  },
  emergencyBox: {
    backgroundColor: '#fff8f8',
    borderLeft: '4px solid var(--error-red)',
    borderRadius: '0 8px 8px 0',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  alertHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--error-red)',
    fontSize: '0.95rem',
  },
  alertIcon: {
    fontSize: '1.1rem',
  },
  alertText: {
    fontSize: '0.85rem',
    color: 'var(--text-charcoal)',
    lineHeight: '1.4',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #f2c7c7',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  }
};

export default Step3DamageAssessment;