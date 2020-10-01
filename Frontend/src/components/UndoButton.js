import React from 'react';

function UndoButton({ action, enabling }) {
  return (
    <button
      onClick={action}
      disabled={enabling < 1 ? true : false}
      className="rewind">
      <i className="fas fa-undo-alt"></i>
    </button>
  );
}

export default UndoButton;
