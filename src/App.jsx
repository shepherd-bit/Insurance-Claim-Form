// src/App.jsx
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ClaimWizard from './components/ClaimWizard';

function App() {
  const [isWizardStarted, setIsWizardStarted] = useState(false);

  return (
    <div className="app-viewport">
      {!isWizardStarted ? (
        <HomePage onBegin={() => setIsWizardStarted(true)} />
      ) : (
        // Pass the reset function down as a prop here
        <ClaimWizard onGoHome={() => setIsWizardStarted(false)} />
      )}
    </div>
  );
}

export default App;