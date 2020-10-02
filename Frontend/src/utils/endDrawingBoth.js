export const endDrawingBoth = (setIsDrawing, setPath, contextRef, path) => {
  setIsDrawing(false);
  setPath([...path, false]);
  contextRef.current.closePath();
};
