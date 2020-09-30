import React, { useEffect, useState, useRef } from 'react';
import AddImage from './components/AddImage';
import Colors from './components/Colors';
import Gallery from './components/Gallery';
import { getTouchPos } from './utils/GetPosTouch';
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

    const ctx = canvas.getContext('2D');
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
    contextRef.current.closePath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const startDrawingMobile = (e) => {
    const { posx, posy } = getTouchPos(canvasRef.current, e);
    contextRef.current.strokeStyle = color;
    contextRef.current.beginPath();
    contextRef.current.moveTo(posx, posy);
    setIsDrawing(true);
  };

  const drawMobile = (e) => {
    if (!isDrawing) {
      return;
    }

    const { posx, posy } = getTouchPos(canvasRef.current, e);

    contextRef.current.lineTo(posx, posy);
    contextRef.current.stroke();
  };

  return (
    <>
      <div className="main">
        <h1>
          T1GART <i className="fas fa-paint-brush"></i>
        </h1>
        <div className="paint">
          <canvas
            id="canv"
            style={{ border: '1px solid black' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onTouchStart={startDrawingMobile}
            onTouchMove={drawMobile}
            onTouchEnd={endDrawing}
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
