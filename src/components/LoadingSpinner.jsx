import React from 'react';

export default function LoadingSpinner({ label = 'Chargement...' }) {
  return (
    <span className="loading-spinner" role="status" aria-live="polite">
      <span className="spinner-icon" aria-hidden="true" />
      {label}
    </span>
  );
}
