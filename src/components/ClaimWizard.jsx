// src/components/ClaimWizard.jsx
import React, { useState } from 'react';
import Step1PolicyInfo from './Step1PolicyInfo';
import Step2IncidentDetails from './Step2IncidentDetails';
import Step3DamageAssessment from './Step3DamageAssessment';
import Step4Documentation from './Step4Documentation';
import Step5ReviewSubmit from './Step5ReviewSubmit';

function ClaimWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Master state repository for all form modules
  const [formData, setFormData] = useState({
    // Step 1: Policy Info
    fullName: '',
    phone: '',
    email: '',
    policyNumber: '',
    driverStatus: 'policyholder', // policyholder, listed, other
    otherDriverName: '',
    otherDriverLicense: '',
    otherDriverRelationship: '',

    // Step 2: Incident Details
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentType: 'single-vehicle', // single-vehicle, multi-vehicle, vandalism, weather
    otherPartyName: '',
    otherPartyInsurance: '',
    otherPartyPolicy: '',

    // Step 3: Damage Assessment
    damagedZones: [], // Array tracking selected chassis regions
    hasInjuries: 'no', // yes, no
    injuryDetails: '',

    // Step 4: Documentation
    uploadedFiles: [], // Array tracking file meta profiles
  });

  // State mapping for dynamic input validation highlights
  const [errors, setErrors] = useState({});

  // Helper function to dynamically update master state dictionary
  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear errors inline as user corrects fields
    const updatedErrors = { ...errors };
    Object.keys(fields).forEach((key) => delete updatedErrors[key]);
    setErrors(updatedErrors);
  };

  // Basic page-validation guard rails before advancing steps
  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.policyNumber) newErrors.policyNumber = 'Policy Number is required';
      if (formData.driverStatus === 'other' && !formData.otherDriverName) {
        newErrors.otherDriverName = 'Driver name is required for third-party operators';
      }
    }
    if (currentStep === 2) {
      if (!formData.incidentDate) newErrors.incidentDate = 'Date of incident is required';
      if (!formData.incidentLocation) newErrors.incidentLocation = 'Location is required';
      if (formData.incidentType === 'multi-vehicle' && !formData.otherPartyName) {
        newErrors.otherPartyName = 'Other driver details required for multi-vehicle claims';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Evaluation array for step titles
  const stepTitles = [
    'Policyholder Info',
    'Incident Details',
    'Damage & Injuries',
    'Documentation',
    'Review & Submit'
  ];

  // Dynamic component renderer engine
  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PolicyInfo formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <Step2IncidentDetails formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <Step3DamageAssessment formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 4:
        return <Step4Documentation formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 5:
        return <Step5ReviewSubmit formData={formData} setCurrentStep={setCurrentStep} />;
      default:
        return <Step1PolicyInfo formData={formData} updateFormData={updateFormData} errors={errors} />;
    }
  };

  return (
    <div style={styles.wizardViewport}>
      {/* Persistent Wizard Header */}
      <header style={styles.header}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Shepherd Logo" style={styles.logo} />
        
        {/* Step Progression Bar UI Layout */}
        <div style={styles.progressContainer}>
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (
              <div key={title} style={styles.stepIndicator}>
                <div style={{
                  ...styles.stepCircle,
                  backgroundColor: isActive || isCompleted ? 'var(--primary-gold)' : '#e0e0e0',
                  color: isActive || isCompleted ? '#fff' : 'var(--text-muted)'
                }}>
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span style={{
                  ...styles.stepLabel,
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--text-charcoal)' : 'var(--text-muted)'
                }}>{title}</span>
                {idx < 4 && <div style={styles.stepLine} />}
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Grid: Application Form Container vs Setup Workspace Help Sidebar */}
      <div style={styles.bodyGrid}>
        <main style={styles.formCard}>
          {renderActiveStep()}

          {/* Action Trigger Navigation Footer Layout */}
          <div style={styles.actionNav}>
            {currentStep > 1 && (
              <button onClick={handleBack} style={styles.btnBack}>
                Back
              </button>
            )}
            {currentStep < 5 ? (
              <button onClick={handleNext} className="btn-gold" style={styles.btnNext}>
                Continue
              </button>
            ) : null}
          </div>
        </main>

        {/* Sticky Assist Panel */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Claim Assistance</h3>
          <p style={styles.sidebarText}>Your progress is automatically saved to your draft registry context.</p>
          <div style={styles.supportBox}>
            <strong>Need immediate help?</strong>
            <span style={styles.phoneLink}>📞 1-800-555-SHEP</span>
          </div>
          <button style={styles.btnSaveExit} onClick={() => window.location.reload()}>
            Save and Exit Draft
          </button>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  wizardViewport: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-offwhite)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'var(--bg-white)',
    borderBottom: '1px solid var(--border-light)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '32px',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
  },
  stepCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  stepLabel: {
    fontSize: '0.85rem',
  },
  stepLine: {
    width: '30px',
    height: '2px',
    backgroundColor: '#e0e0e0',
    marginLeft: '0.5rem',
  },
  bodyGrid: {
    maxWidth: '1200px',
    width: '100%',
    margin: '2rem auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
    alignItems: 'start',
  },
  formCard: {
    backgroundColor: 'var(--bg-white)',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: 'var(--shadow-premium)',
  },
  actionNav: {
    marginTop: '3rem',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnBack: {
    color: 'var(--text-muted)',
    fontWeight: '600',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
  },
  btnNext: {
    marginLeft: 'auto',
  },
  sidebar: {
    backgroundColor: 'var(--bg-white)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: 'var(--shadow-premium)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '0.5rem',
  },
  sidebarText: {
    fontSize: '0.85rem',
  },
  supportBox: {
    backgroundColor: 'var(--bg-offwhite)',
    padding: '1rem',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    fontSize: '0.85rem',
  },
  phoneLink: {
    color: 'var(--primary-gold)',
    fontWeight: '600',
    marginTop: '0.25rem',
  },
  btnSaveExit: {
    marginTop: '0.5rem',
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--error-red)',
    fontWeight: '500',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px dashed var(--error-red)',
  },
};

export default ClaimWizard;