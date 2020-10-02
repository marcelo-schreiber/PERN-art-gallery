import React from 'react';

function Colors({ color, setColor }) {
  return (
    <div className="colorpick">
      <i className="fas fa-palette"></i>
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
    </div>
  );
}

export default Colors;
