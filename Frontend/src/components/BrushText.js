import React from 'react';

function BrushText({ brushSize }) {
  return (
    <p>
      <i className="fas fa-paint-brush"></i> Brush size: {Math.round(brushSize / 5)}{' '}
      (1-3)
    </p>
  );
}

export default BrushText;
