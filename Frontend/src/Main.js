import React, { useEffect, useState, useRef } from 'react';

// components
import AddImage from './components/AddImage';
import Colors from './components/Colors';
import Gallery from './components/Gallery';
import Canvas from './components/Canvas';
import UndoButton from './components/UndoButton';
import Title from './components/Title';

import './static/styles.css';

// utils
import { undo } from './utils/handleUndo';
import IncreaseBrush from './components/IncreaseBrush';
import DecreaseBrush from './components/DecreaseBrush';
import BrushText from './components/BrushText';

function App() {
  //refs
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // brush states
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);

  // ctrl + z states
  const [path, setPath] = useState([]);
  const [lastPath, setLastPath] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 250;
    canvas.height = 250;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.lineJoin = "round";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    contextRef.current = ctx;
  }, []);

  const getTouchPos = (canvasDom, touchEvent) => {
    var rect = canvasDom.getBoundingClientRect();
    return {
      posx: touchEvent.touches[0].clientX - rect.left,
      posy: touchEvent.touches[0].clientY - rect.top,
    };
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = contextRef.current;

    // get paths
    setIsDrawing(true);
    setPath([
      ...path,
      { x: offsetX, y: offsetY, color: color, brushSize: brushSize },
    ]);
    setLastPath([{ x: offsetX, y: offsetY, color: color, brushSize: brushSize }]);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const endDrawingBoth = () => {
    setIsDrawing(false);
    setPath([...path, false]);
    contextRef.current.closePath();
  };

  const draw = ({ nativeEvent }) => {
    const canvas = canvasRef.current;
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    if (
      offsetX > canvas.width - 6 ||
      offsetY > canvas.height - 6 ||
      offsetX < 6 ||
      offsetY < 6
    ) {
      setIsDrawing(false);
      // get paths
      setPath([...path, false]);
      contextRef.current.closePath();
      return;
    }
    // get paths
    setLastPath([
      ...lastPath,
      { x: offsetX, y: offsetY, color: color, brushSize: brushSize },
    ]);
    setPath([
      ...path,
      { x: offsetX, y: offsetY, color: color, brushSize: brushSize },
    ]);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const startDrawingMobile = (e) => {
    const ctx = contextRef.current;
    const { posx, posy } = getTouchPos(canvasRef.current, e);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    // get paths
    setPath([...path, { x: posx, y: posy, color: color, brushSize: brushSize }]);
    setLastPath([{ x: posx, y: posy, color: color, brushSize: brushSize }]);
    ctx.beginPath();
    ctx.moveTo(posx, posy);
    setIsDrawing(true);
  };

  const drawMobile = (e) => {
    if (!isDrawing) {
      return;
    }
    const ctx = contextRef.current;
    const { posx, posy } = getTouchPos(canvasRef.current, e);

    ctx.lineTo(posx, posy);
    ctx.stroke();

    setLastPath([
      ...lastPath,
      { x: posx, y: posy, color: color, brushSize: brushSize },
    ]);
    setPath([...path, { x: posx, y: posy, color: color, brushSize: brushSize }]);
  };

  return (
    <>
      <div className="main">
        <Title />
        <div className="paint">
          <Canvas
            startDrawing={startDrawing}
            draw={draw}
            endDrawing={endDrawingBoth}
            startDrawingMobile={startDrawingMobile}
            drawMobile={drawMobile}
            canvasRef={canvasRef}
          />
          <div>
            <Colors color={color} setColor={setColor} context={contextRef} />
            <UndoButton
              action={() =>
                undo(
                  path,
                  setPath,
                  lastPath,
                  setLastPath,
                  canvasRef.current,
                  contextRef.current
                )
              }
              enabling={lastPath.length}
            />
            <BrushText brushSize={brushSize} />
            <IncreaseBrush brushSize={brushSize} setBrushSize={setBrushSize} />
            <DecreaseBrush brushSize={brushSize} setBrushSize={setBrushSize} />
          </div>
        </div>
        <AddImage canvas={canvasRef} color={color} context={contextRef} />
      </div>
      <Gallery />
    </>
  );
}

export default App;
