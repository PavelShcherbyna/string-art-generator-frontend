import React from 'react';

export default function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  const style = {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Inter',
    fontSize: '20px'
  };

  return (
    <div role="alert" style={style}>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}
