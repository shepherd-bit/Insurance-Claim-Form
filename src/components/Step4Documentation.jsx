// src/components/Step4Documentation.jsx
import React, { useState } from 'react';

function Step4Documentation({ formData, updateFormData }) {
  const [localError, setLocalError] = useState('');

  const handleFileChange = (e) => {
    setLocalError('');
    const files = Array.from(e.target.files);
    const validFiles = [];

    // Validation thresholds
    const MAX_SIZE_MB = 10;
    const ALLOWED_EXTENSIONS = ['image/jpeg', 'image/png', 'application/pdf'];

    for (let file of files) {
      // 1. Validate File Format Extensions
      if (!ALLOWED_EXTENSIONS.includes(file.type)) {
        setLocalError(`"${file.name}" rejected. Only .jpg, .png, and .pdf formats are permitted.`);
        return;
      }

      // 2. Validate File Size Boundaries
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setLocalError(`"${file.name}" exceeds the maximum limit. Maximum file size allowed is 10MB.`);
        return;
      }

      // Mock unique structural object mapping for front-end management
      validFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }

    // Merge new files into master state dictionary context
    updateFormData({
      uploadedFiles: [...formData.uploadedFiles, ...validFiles]
    });
  };

  const removeFile = (fileId) => {
    const remainingFiles = formData.uploadedFiles.filter(file => file.id !== fileId);
    updateFormData({ uploadedFiles: remainingFiles });
  };

  return (
    <div className="fade-in">
      <h2 style={styles.title}>Documentation & Evidence Upload</h2>
      <p style={styles.subtitle}>Upload photos of vehicle damages, local scene environment, third-party credentials, or formal police reports.</p>

      <div style={styles.uploadContainer}>
        {/* Decorative Native File Drop Zone Layout */}
        <div style={styles.dropZone}>
          <span style={styles.uploadIcon}>📁</span>
          <p style={styles.dropZoneText}>Drag & drop materials here, or click to browse local drives</p>
          <span style={styles.constraintsLabel}>Supported formats: .jpg, .png, .pdf (Max size per file: 10MB)</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={styles.hiddenFileInput}
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>

        {/* Validation Notification Banner */}
        {localError && (
          <div style={styles.errorAlert} className="fade-in">
            <span>⚠️</span> {localError}
          </div>
        )}

        {/* Dynamic Upload Queue File List Renderer */}
        {formData.uploadedFiles.length > 0 && (
          <div style={styles.fileListContainer}>
            <h4 style={styles.listTitle}>Uploaded Assets ({formData.uploadedFiles.length})</h4>
            <div style={styles.fileQueue}>
              {formData.uploadedFiles.map((file) => (
                <div key={file.id} style={styles.fileCard} className="fade-in">
                  <div style={styles.fileMeta}>
                    <span style={styles.fileIcon}>📄</span>
                    <div style={styles.fileDetails}>
                      <span style={styles.fileName}>{file.name}</span>
                      <span style={styles.fileSize}>{file.size}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    style={styles.btnRemove}
                    title="Delete file"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  dropZone: {
    border: '2px dashed var(--border-light)',
    borderRadius: '12px',
    padding: '3rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    backgroundColor: 'var(--bg-offwhite)',
    cursor: 'pointer',
    position: 'relative',
    transition: 'border-color 0.2s ease',
  },
  dropZoneText: {
    fontSize: '1rem',
    fontWeight: '500',
    color: 'var(--text-charcoal)',
  },
  uploadIcon: {
    fontSize: '2.5rem',
  },
  constraintsLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  hiddenFileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  errorAlert: {
    backgroundColor: '#fff8f8',
    border: '1px solid #f2c7c7',
    color: 'var(--error-red)',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  fileListContainer: {
    marginTop: '0.5rem',
  },
  listTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: 'var(--text-charcoal)',
  },
  fileQueue: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  fileCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#fff',
  },
  fileMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  fileIcon: {
    fontSize: '1.25rem',
  },
  fileDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  fileName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--text-charcoal)',
    maxWidth: '400px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  fileSize: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  btnRemove: {
    padding: '0.25rem 0.5rem',
    fontSize: '1.1rem',
    borderRadius: '6px',
    opacity: 0.7,
  },
};

export default Step4Documentation;