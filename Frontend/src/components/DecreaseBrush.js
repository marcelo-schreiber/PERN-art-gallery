import React from 'react';

function DecreaseBrush({ brushSize, setBrushSize }) {
  return (
    <button
      onClick={() => brushSize > 5 && setBrushSize(brushSize - 5)}
      className="minus">
      <i className="fas fa-minus-square fa-2x"></i>
    </button>
  );
}

export default DecreaseBrush;
