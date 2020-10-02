import React from 'react';

function Canvas({
  startDrawing,
  draw,
  startDrawingMobile,
  drawMobile,
  endDrawing,
  canvasRef,
}) {
  return (
    <canvas
      id="canv"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onTouchStart={startDrawingMobile}
      onTouchMove={drawMobile}
      onTouchEnd={endDrawing}
      ref={canvasRef}
    />
  );
}

export default Canvas;
