import React, { useEffect, useState, useRef } from 'react';

// components
import AddImage from './components/AddImage';
import Colors from './components/Colors';
import Gallery from './components/Gallery';
import Canvas from './components/Canvas';
import UndoButton from './components/UndoButton';
import Title from './components/Title';

// utils
import { undo } from './utils/handleUndo';

// style
import './styles.css';

function App() {
  //refs
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  //states
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);

  // ctrl + z states
  const [path, setPath] = useState([]);
  const [lastPath, setLastPath] = useState([]);

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

  const getTouchPos = (canvasDom, touchEvent) => {
    var rect = canvasDom.getBoundingClientRect();
    return {
      posx: touchEvent.touches[0].clientX - rect.left,
      posy: touchEvent.touches[0].clientY - rect.top,
    };
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    setLastPath([{ x: offsetX, y: offsetY, color: color }]);
    contextRef.current.strokeStyle = color;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawingBoth = () => {
    setIsDrawing(false);
    setPath([...path, false]);
    contextRef.current.closePath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    setLastPath([...lastPath, { x: offsetX, y: offsetY, color: color }]);
    setPath([...path, { x: offsetX, y: offsetY, color: color }]);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const startDrawingMobile = (e) => {
    const ctx = contextRef.current;
    const { posx, posy } = getTouchPos(canvasRef.current, e);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(posx, posy);
    setIsDrawing(true);
    setLastPath([{ x: posx, y: posy, color: color }]);
  };

  const drawMobile = (e) => {
    if (!isDrawing) {
      return;
    }
    const ctx = contextRef.current;
    const { posx, posy } = getTouchPos(canvasRef.current, e);

    ctx.lineTo(posx, posy);
    ctx.stroke();

    setLastPath([...lastPath, { x: posx, y: posy, color: color }]);
    setPath([...path, { x: posx, y: posy, color: color }]);
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
            <Colors color={color} setColor={setColor} />
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
          </div>
        </div>
        <AddImage canvas={canvasRef} context={contextRef} color={color} />
      </div>
      <Gallery />
    </>
  );
}

export default App;
