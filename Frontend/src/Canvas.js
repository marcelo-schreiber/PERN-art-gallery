import React, { useEffect, useState, useRef } from 'react';
import AddImage from './components/AddImage';
import Colors from './components/Colors';
import Gallery from './components/Gallery';
import './styles.css';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 250;
    canvas.height = 250;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    contextRef.current = ctx;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = color;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    // contextRef.current.closePath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    if (!(offsetX < 247 && offsetX > 5 && offsetY > 4 && offsetY < 247)) {
      endDrawing();
    }
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <>
      <div className="main">
        <h1>
          ART GALLERY <i className="fas fa-paint-brush"></i>
        </h1>
        <div className="paint">
          <canvas
            id="canv"
            style={{ border: '1px solid black' }}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseMove={draw}
            ref={canvasRef}
          />
          <Colors color={color} setColor={setColor} />
        </div>
        <AddImage canvas={canvasRef} context={contextRef} color={color} />
      </div>
      <Gallery />
    </>
  );
}

export default App;
